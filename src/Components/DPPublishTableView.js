import React from "react";
import { useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
    "Name",
    "Type",
    "Description"
];

const DPPublishTableView = (props) => {
    
  const dpData = props.dpData;
  const [activeColumn, setActiveColumn] = useState(dpData["Tables"][0]["Columns"][0]['Name']);
  const  clickColumnHandler=(key) => {
      setActiveColumn(key)
  }
    
  return (
    <div className="dppublishtableview">
      <h5 className="dpcolumntitle">Attributes</h5>
      <div className="dpcolumnlist">
      <TableContainer sx={{maxHeight:'600px'}} component={Paper}>
          <Table stickyHeader aria-label="sticky table" sx={{margin:0, padding:0}} >
          <TableHead >
            <TableRow>
            {columns.map((column,index) => (
                <TableCell 
                    key={column}
                    align={"left"}
                    style={{ fontWeight:'bold',backgroundColor:'#0D9F98',paddingTop:'8px',paddingBottom:'8px', whiteSpace: 'nowrap',borderRight: "1px solid lightgray" }}
                    >
                    {column}
                </TableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dpData["Tables"][0]["Columns"].map((colitem,index) => (
            <TableRow onClick={() => {clickColumnHandler(colitem['Name'])}} key={colitem['Name']}  className={activeColumn==colitem['Name']?"itemactive":"item" }>
                <TableCell align="left" width="35%" style={{paddingTop:'5px',paddingBottom:'5px', whiteSpace: 'nowrap',borderRight: "1px solid lightgray",}} >{colitem['Name']} </TableCell>
                <TableCell align="left" width="20%" style={{paddingTop:'5px',paddingBottom:'5px', whiteSpace: 'nowrap',borderRight: "1px solid lightgray",}} >{colitem['Type']}</TableCell>
                <TableCell align="left" width="45%" style={{paddingTop:'5px',paddingBottom:'5px', whiteSpace: 'nowrap',borderRight: "1px solid lightgray",}} >{colitem['Comment']}</TableCell>
            </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
);
};

export default DPPublishTableView;

