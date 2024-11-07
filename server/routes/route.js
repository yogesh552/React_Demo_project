const express=require('express');
const route=express.Router()
const con=require('../db/connection')  


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

route.post('/emp_data', function (req, res) {
    try {
      const { page, rowsPerPage, role, designation } = req.body; // Destructure page and rowsPerPage
      console.log('designation: ', designation);
      console.log('role: ', role);
      console.log('page: ', page);
      console.log('rowsPerPage: ', rowsPerPage);
      const offset = page * rowsPerPage; // Calculate the offset for the SQL query
      
      let params1      
      
      let count1
      let countParams1      

      let qry1 =+ `SELECT * FROM employee_master`;  

      if(role){
        qry1 =+ `SELECT * FROM employee_master WHERE user_role=? LIMIT ${rowsPerPage} OFFSET ${offset}`;  
        params1=+ [role]    
      }else if(designation){
        qry1 =+ `SELECT * FROM employee_master WHERE user_designation=? LIMIT ${rowsPerPage} OFFSET ${offset}`
        params1=+ [designation]
      }else if(role && designation){
        qry1 =+ `SELECT * FROM employee_master WHERE user_designation=? LIMIT ${rowsPerPage} OFFSET ${offset}`
        params1=+ [role, designation]
      }else{
        qry1 =+ `SELECT * FROM employee_master WHERE LIMIT ${rowsPerPage} OFFSET ${offset}`
        params1=+[]
      }      

      con.query(qry1,params1, function (err, result) {
        console.log('result: ', result.length);
        if (err) {
          console.log('Error:', err);
          res.status(500).send('Error fetching data');
        } else {
          // Count the total number of records for pagination
          if(role){
            count1 =+ `SELECT COUNT(*) AS total FROM employee_master WHERE user_role=? `;  
            countParams1=+ [role]    
          }else if(designation){
            count1 =+ `SELECT COUNT(*) AS total FROM employee_master WHERE user_designation=?`
            countParams1=+ [designation]
          }else if(role && designation){
            count1 =+ `SELECT COUNT(*) AS total FROM employee_master WHERE user_designation=?`
            countParams1=+ [role, designation]
          }else{
            count1 =+ `SELECT COUNT(*) AS total FROM employee_master `
            countParams1=+[]
          }          
// 'SELECT COUNT(*) AS total FROM employee_master'

          con.query(count1,countParams1, (countErr, countResult) => {
            if (countErr) {
              console.log('Error:', countErr);
              res.status(500).send('Error fetching total count');
            } else {
              const totalRecords = countResult[0].total;
              res.send({ data1: result, totalRecords });
            }
          });
        }
      });
    } catch (err) {
      console.log('Error:', err);
      res.status(500).send('Server error');
    }
  });
  


module.exports=route