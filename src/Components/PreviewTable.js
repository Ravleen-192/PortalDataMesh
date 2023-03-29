import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import { getPreviewData } from '../Data/ReadTableData';

const PreviewTable = (props) =>{

  const dpData = props.dpData
  const previewData = getPreviewData(dpData)
  const handleClose = () => {
      props.setOpenDlg(false);
  };

  return (
    <Dialog
      fullWidth={true}
      fullScreen={false}
      maxWidth={'xl'}
      open={props.openDlg}
      onClose={handleClose}
    >
    <DialogTitle>Preview of all attributes</DialogTitle>
    <DialogContent className='previewTableDialog' >
      <DialogContentText component={'span'}>
        <TableContainer sx={{maxHeight:'600px'}} component={Paper}>
          <Table stickyHeader aria-label="sticky table" style={{width:"auto"}}>
          <TableHead >
            <TableRow>
              {
                Object.entries(dpData["Tables"][0]["Preview"]).map((column,index) => (
                  <TableCell 
                        key={column[0]}
                        align={"left"}
                        style={{ fontWeight:'bold',backgroundColor:'#0D9F98',paddingTop:'8px',paddingBottom:'8px', whiteSpace: 'nowrap',borderRight: "1px solid lightgray" }}
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
                  {   
                    row.map((column,colindex) =>(
                      <TableCell 
                          key={index.toString()+colindex.toString()}
                          align="center" 
                          style={{paddingTop:'5px',paddingBottom:'5px', whiteSpace: 'nowrap',borderRight: "1px solid lightgray",}} 
                      >
                        {column} 
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
          </Table>
        </TableContainer>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Close</Button>
    </DialogActions>
    </Dialog>
    
  );

}

export default PreviewTable;