// import '../css/demo2.css'
// import Table from 'react-bootstrap/Table'
// import axios from 'axios'
// import { useState, useEffect } from 'react';
// import {Link} from 'react-router-dom'
// import TablePagination from "@mui/material/TablePagination";

// // import DataTable from 'datatables.net-react';
// // import DT from 'datatables.net-dt'

// // DataTable.use(DT)
// function Demo2(){
//     const [empData, setEmpData]=useState([])

//     useEffect(()=>{
//         axios.post('http://localhost:4000/emp_data')
//         .then(res=>{
//             console.log('res: ', res.data.data1);
            
//             setEmpData(res.data.data1)
//         })
//         .catch(err=>{
//             console.log('Error fetching data:', err)
//         })
//     },[])

//     return(
//         <>
//         <div>
//         <Table bordered>
//             <thead>
//                 <tr>
//                     <th>User ID</th>
//                     <th>Name</th>
//                     <th>Role</th>
//                     <th>Designation</th>
//                     <th>Create Date</th>
//                     <th>Last Login Date</th>
//                 </tr>
//             </thead>
//                 <tbody>
//                     {empData.map((data1,index)=>(
//                         <tr key={index}>
//                             <td>{data1.user_id}</td>
//                             <td>{data1.user_name}</td>
//                             <td>{data1.user_role}</td>
//                             <td>{data1.user_designation}</td>
//                             <td>{data1.user_create_date}</td>
//                             <td>{data1.last_login_date}</td>
//                         </tr>    
//                     ))}            
//                 </tbody>            
//         </Table>

//         <TablePagination
//             component="div"
//             count={totalTemplates} // Total number of templates for pagination
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 25]} // Rows per page options
//           />


//         <Link to="/">
//             <button>Back</button>
//         </Link>

//     </div>

        
//          {/* <div>
//          <DataTable data={empData} className='display'>
//              <thead>
//                  <tr>
//                      <th>User ID</th>
//                      <th>Name</th>
//                      <th>Role</th>
//                      <th>Designation</th>
//                      <th>Create Date</th>
//                      <th>Last Login Date</th>
//                  </tr>
//              </thead>
        
//          </DataTable >
//      </div> */}

//     </>
//     )
// }


// export default Demo2

////////////////////////////////////////////////////////////////////////////////////////

// import '../css/demo2.css';
// import Table from 'react-bootstrap/Table';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import TablePagination from '@mui/material/TablePagination';

// function Demo2() {
//   const [empData, setEmpData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

//   useEffect(() => {
//     axios
//       .post('http://localhost:4000/emp_data')
//       .then((res) => {
//         console.log('res: ', res.data.data1);
//         setEmpData(res.data.data1);
//       })
//       .catch((err) => {
//         console.log('Error fetching data:', err);
//       });
//   }, []);

//   // Handle page change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   // Slice the data for the current page
//   const paginatedData = empData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <>
//       <div>
//         <Table bordered>
//           <thead>
//             <tr>
//               <th>User ID</th>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Designation</th>
//               <th>Create Date</th>
//               <th>Last Login Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((data1, index) => (
//               <tr key={index}>
//                 <td>{data1.user_id}</td>
//                 <td>{data1.user_name}</td>
//                 <td>{data1.user_role}</td>
//                 <td>{data1.user_designation}</td>
//                 <td>{data1.user_create_date}</td>
//                 <td>{data1.last_login_date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         <TablePagination
//           component="div"
//           count={empData.length} // Total number of records
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
//         />

//         <Link to="/">
//           <button>Back</button>
//         </Link>
//       </div>
//     </>
//   );
// }

// export default Demo2;


/////////////////////////////////////////////////////////////////////////////////////

import '../css/demo2.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';

function Demo2() {
  const [empData, setEmpData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records

  const [roleSelector, setRoleSelector]=useState("")
  const [designationSelector, setDesignationSelector]=useState("")

  // Function to fetch data from the server
  const fetchData = (page, rowsPerPage) => {
    let role=roleSelector
    console.log('role: ', role);
    let designation=designationSelector
    console.log('designation: ', designation);

    axios
      .post('http://localhost:4000/emp_data', { page, rowsPerPage, role, designation })
      .then((res) => {
        console.log('res: ', res.data.data1);
        setEmpData(res.data.data1);
        setTotalRecords(res.data.totalRecords); // Set total number of records from the response
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  };

  // Fetch data when the component mounts or when page/rowsPerPage changes
  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, roleSelector, designationSelector]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log('newPage', newPage)
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <>
      <div>

        <div className='filter-container'>
          <div>
            <label htmlFor="role">Role</label>
            <select id="role" value={roleSelector} onChange={(e) => setRoleSelector(e.target.value)}>
              <option value="">All</option>
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>
          <div>
            <label htmlFor="designation">Designation</label>
            <select id="designation" value={designationSelector} onChange={(e) => setDesignationSelector(e.target.value)}>
              <option value="">All</option>
              <option value="CEO">CEO</option>
              <option value="Sales Head">Sales Head</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
            </select>
          </div>
        </div>

        <Table bordered>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Designation</th>
              <th>Create Date</th>
              <th>Last Login Date</th>
            </tr>
          </thead>
          <tbody>
            {empData.map((data1, index) => (
              <tr key={index}>
                <td>{data1.user_id}</td>
                <td>{data1.user_name}</td>
                <td>{data1.user_role}</td>
                <td>{data1.user_designation}</td>
                <td>{data1.user_create_date}</td>
                <td>{data1.last_login_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <TablePagination
          component="div"
          count={totalRecords} // Total number of records
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        />

        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
    </>
  );
}

export default Demo2;
