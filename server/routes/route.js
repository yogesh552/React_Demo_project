const express=require('express');
const route=express.Router()
const con=require('../db/connection')  
const jwt = require('jsonwebtoken')
const jwtSecreatKey= "jfkl#djivociu$"

route.post('/login',async function (req, res) {
  try{
    let userId=req.body.userId  ;
    console.log('userId: ', userId);
    let userPassword=req.body.userPassword ;
    console.log('userPassword: ', userPassword);

    if(!userId || !userPassword){
      return  res.status(500).json({success:false, message:"User ID and password are required"})      
    }
    

    let qry=`SELECT user_id, user_password, user_name FROM employee_master WHERE user_id = ?`
    con.query(qry,[userId],function(error,result){
      if(error){
        return res.status(500).json({ success:false, message:error})
      }
      console.log('result:', result)
    
      if(!result || result.length===0){
        console.log("dddddd")
        return res.status(401).json({ success:false,  message:'Credentials not match'})
      }else{

        if(userId==result[0].user_id && userPassword==result[0].user_password){
          const token =jwt.sign({userId},jwtSecreatKey,{expiresIn:'1h'})
          return res.status(200).json({ success:true, token:token, message:'Login Successful'})
        }
        else{
          return res.status(401).json({ success:false,  message:'Credentials not match'})
        }
      }

    })

  }
  catch(error){
    console.log('Error', error)
    res.status(500).json({ error:error, message:"Internal serval error"})
  }
})

// route.post('/emp_data',function(req,res){
//     try{
//         let qry1=`SELECT * From employee_master`
//         con.query(qry1,function(err,result){
//             console.log('result:', result)
//             res.send({data1:result})
//         })
//     }
//     catch(err){
//         console.log('Error:', err)
//     }
// })

// route.post('/emp_data', function (req, res) {
//   try {
//     const { page, rowsPerPage, role, designation } = req.body;
//     const offset = page * rowsPerPage;

//     let qry1 = `SELECT * FROM employee_master`;
//     let params1 = [];
    
//     // Build the query based on provided filters
//     if (role && designation) {
//       qry1 += ` WHERE user_role = ? AND user_designation = ?`;
//       params1 = [role, designation];
//     } else if (role) {
//       qry1 += ` WHERE user_role = ?`;
//       params1 = [role];
//     } else if (designation) {
//       qry1 += ` WHERE user_designation = ?`;
//       params1 = [designation];
//     }
    
//     // Add pagination parameters
//     qry1 += ` LIMIT ? OFFSET ?`;
//     params1.push(rowsPerPage, offset);

//     con.query(qry1, params1, function (err, result) {
//       if (err) {
//         console.log('Error:', err);
//         return res.status(500).send('Error fetching data');
//       }
      
//       // Count query to get the total number of records
//       let count1 = `SELECT COUNT(*) AS total FROM employee_master`;
//       let countParams1 = [];
      
//       if (role && designation) {
//         count1 += ` WHERE user_role = ? AND user_designation = ?`;
//         countParams1 = [role, designation];
//       } else if (role) {
//         count1 += ` WHERE user_role = ?`;
//         countParams1 = [role];
//       } else if (designation) {
//         count1 += ` WHERE user_designation = ?`;
//         countParams1 = [designation];
//       }
      
//       con.query(count1, countParams1, (countErr, countResult) => {
//         if (countErr) {
//           console.log('Error:', countErr);
//           return res.status(500).send('Error fetching total count');
//         }
        
//         const totalRecords = countResult[0].total;
//         res.send({ data1: result, totalRecords });
//       });
//     });
//   } catch (err) {
//     console.log('Error:', err);
//     res.status(500).send('Server error');
//   }
// });

route.post('/emp_data', function (req, res) {
  try {
    const { page, rowsPerPage, role, designation, searchText } = req.body;
    const offset = page * rowsPerPage;

    let qry1 = `SELECT * FROM employee_master`;
    let params1 = [];
    
    // Build the query based on provided filters
    if (role && designation) {
      qry1 += ` WHERE user_role = ? AND user_designation = ?`;
      params1 = [role, designation];
    } else if (role) {
      qry1 += ` WHERE user_role = ?`;
      params1 = [role];
    } else if (designation) {
      qry1 += ` WHERE user_designation = ?`;
      params1 = [designation];
    } else if (searchText) {
      qry1 += ` WHERE user_id = ?`;
      params1 = [searchText];
      console.log('searchText: ', searchText);
    }
    
    // Add pagination parameters
    qry1 += ` LIMIT ? OFFSET ?`;
    params1.push(rowsPerPage, offset);

    con.query(qry1, params1, function (err, result) {
      if (err) {
        console.log('Error:', err);
        return res.status(500).send('Error fetching data');
      }
      
      // Count query to get the total number of records
      let count1 = `SELECT COUNT(*) AS total FROM employee_master`;
      let countParams1 = [];
      
      if (role && designation) {
        count1 += ` WHERE user_role = ? AND user_designation = ?`;
        countParams1 = [role, designation];
      } else if (role) {
        count1 += ` WHERE user_role = ?`;
        countParams1 = [role];
      } else if (designation) {
        count1 += ` WHERE user_designation = ?`;
        countParams1 = [designation];
      } else if (searchText) {
        count1 += ` WHERE user_id = ?`;
        countParams1 = [searchText];
      }
      
      con.query(count1, countParams1, (countErr, countResult) => {
        if (countErr) {
          console.log('Error:', countErr);
          return res.status(500).send('Error fetching total count');
        }
        
        const totalRecords = countResult[0].total;
        res.send({ data1: result, totalRecords });
      });
    });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).send('Server error');
  }
});


module.exports=route