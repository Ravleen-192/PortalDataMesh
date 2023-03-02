import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { getPreviewData } from '../Data/ReadTableData';

const DPPublishPreviewTable = (props) =>{
    const dpData = props.dpData;
    const previewData = getPreviewData(dpData)

  return (
    <div className="dppublishpreviewtableview">
      <h5 className="dpcolumntitle">Preview</h5>
      <div className="dpcolumnlist">
        <TableContainer sx={{maxHeight:'600px'}} component={Paper}>
          <Table stickyHeader aria-label="sticky table" style={{width:"auto"}}>
          <TableHead >
            <TableRow>
              {
                  Object.entries(dpData["Tables"][0]["Preview"]).map((column,index) => (
                      <TableCell 
                          key={column[0]}
                          align={"left"}
                          style={{ fontWeight:'bold',backgroundColor:'#37ABC8',paddingTop:'8px',paddingBottom:'8px', whiteSpace: 'nowrap',borderRight: "1px solid lightgray" }}
                          >
                      {column[0]}
                  </TableCell>
                  ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              previewData.map((row,index)=>(
                <TableRow key={index}>
                    {   row.map((column,colindex) =>(
                        <TableCell 
                            key={index.toString()+colindex.toString()}
                            align="left" 
                            style={{paddingTop:'5px',paddingBottom:'5px', whiteSpace: 'nowrap',borderRight: "1px solid lightgray",}} >
                                {column} 
                        </TableCell>
                    ))}
                </TableRow>
              ))
            }
          </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );

}

export default DPPublishPreviewTable;