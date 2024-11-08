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
    const { page, rowsPerPage, role, designation } = req.body;
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