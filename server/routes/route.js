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
      const { page, rowsPerPage } = req.body; // Destructure page and rowsPerPage
      console.log('page: ', page);
      console.log('rowsPerPage: ', rowsPerPage);
      const offset = page * rowsPerPage; // Calculate the offset for the SQL query
  
      let qry1 = `SELECT * FROM employee_master LIMIT ${rowsPerPage} OFFSET ${offset}`;
      con.query(qry1, function (err, result) {
        console.log('result: ', result.length);
        if (err) {
          console.log('Error:', err);
          res.status(500).send('Error fetching data');
        } else {
          // Count the total number of records for pagination
          con.query('SELECT COUNT(*) AS total FROM employee_master', (countErr, countResult) => {
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