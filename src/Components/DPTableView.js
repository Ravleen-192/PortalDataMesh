import React from "react";
import { useEffect,useState } from "react";
import { Outlet  } from "react-router-dom";
import { useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import LineageImg from "../resources/lineage.png"
import PreviewImg from "../resources/preview.svg"
import PreviewTableImg from "../resources/preview-table.svg"
import AttribsImg from "../resources/attribs.svg";
import Xarrow from "react-xarrows";

import PreviewTable from "./PreviewTable";

const columns = [
    "Name",
    "Type",
    "Description"
];
  
const DPPreviewView = (props) => {  
    return(
    <div className="dppreviewlist">
      <div className="dppreviewtitle">
        <div className="text">
          <Typography component={'span'} variant="body2" color="text.secondary">
            <Box sx={{fontWeight: 'bold', marginTop:'4px',marginBottom:'4px' }}>Preview</Box>    
          </Typography>    
        </div>
      </div>
      <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table" sx={{margin:0, padding:0}} >
        <TableHead >
          <TableRow>
            <TableCell
              align={"left"}
              style={{ fontWeight:'bold',backgroundColor:'#37ABC8',padding:'5px' }}>{props["columnName"]}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props["previewItems"].map((item,index ) => (
            <TableRow key={index}  className="item" style={{height:10}}>
              <TableCell component="th" scope="row"  style={{padding:'2px'}}
                  >{item}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
    )
}

const canvasStyle = {
  position: 'relative',
  background: 'white',
  height:'300px',
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const boxStyle = {
  display:'flex',
  position: 'relative',
  border: '2px #aaa solid',
  borderRadius: '4px',
  textAlign: 'center',
  height: '30px',
  color: 'black',
  margin:'3px',
  padding:'3px',
  alignItems:'center',
  width:'auto',
  minWidth:'130px',
  justifyContent:'center'
};

const LineageBox = (props) => {
  return (
    <div ref={props.box.ref} id={props.box.id} style={boxStyle}>
      {props.box.id}
    </div>
  );
};

const DPLineageView = (props) => {  
  const box0 = { id: props['catalogName'], ref: useRef(null) };
  const box1 = { id: props['tableName'], ref: useRef(null) };
  const box2 = { id: props['columnName'], ref: useRef(null) };

  return (
    <React.Fragment>
      <div className="dppreviewlist">
        <div className="dppreviewtitle">
          <div className="text">
              <Typography component={'span'} variant="body2" color="text.secondary">
                  <Box sx={{fontWeight: 'bold', marginTop:'4px',marginBottom:'4px' }}>Lineage</Box>    
              </Typography>    
          </div>
        </div>
        <div style={canvasStyle} id="canvas">
          <LineageBox box={box0} />
          <LineageBox box={box1} />
          <LineageBox box={box2} />
          <Xarrow start={box0.id} end={box1.ref} headSize={3} color={'#37ABC8'}/>                
          <Xarrow start={box1.ref} end={box2.ref} headSize={3} color={'#37ABC8'}/>                
        </div>
      </div>
    </React.Fragment>
  );
}
const PreviewTable1 = (props) =>{
    console.log("here in render")
    return (<></>);
}
const DPTableView = (props) => {
    
  const dpData = props.dpData;
  
  const [activeColumn, setActiveColumn] = useState(dpData["Tables"][0]["Columns"][0]['Name']);
  const  clickColumnHandler=(key) => {
    setActiveColumn(key)
  }

  const [activeView, setView] = React.useState('Preview');
  const handleView = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };
  
  const [viewTablePreviewDlg, setViewTablePreviewDlg] = React.useState(false);
  const showTablePreview = () => {
    setViewTablePreviewDlg(true)
  };

  function renderView(activeview){
    switch(activeview){
      case "Preview":
        //todo: bug
        //when we continuously click on my data products on the left side without closing
        //the DP view, the active column doesn't set properly
        //so if the active column is not yet refreshed and referring to old dp
        //below code crashes
        //hence this fix
        //it needs a clean solution
        if(dpData["Tables"][0]["Preview"][activeColumn] !== undefined){
          //console.log("not undefined")
          return (
              <DPPreviewView previewItems = {dpData["Tables"][0]["Preview"][activeColumn]} columnName={activeColumn}/>
          )
        } else{
          //console.log("undefined",activeColumn)
          return (
            <DPPreviewView previewItems = {dpData["Tables"][0]["Preview"][dpData["Tables"][0]["Columns"][0]['Name']]} columnName={dpData["Tables"][0]["Columns"][0]['Name']}/>
        )
        }
      case "Lineage":
        return (
            <DPLineageView 
                catalogName = {dpData['Product Name']}
                tableName = {dpData["Tables"][0]['Name']}
                columnName={activeColumn}/>
        )
    }
  }

  return (
    <div className="dptableview">
      <div className="dpcolumnlist">
        <div className="dpcolumntitle">
          <div className="text">
              <img className="icon" src={AttribsImg}/>         
              <Typography component={'span'} variant="body2" color="text.secondary">
                <Box  sx={{fontWeight: 'bold',marginLeft:'5px'}}>Attributes</Box>    
              </Typography>  
          </div>
            <Stack className="togglebutton" direction="row" spacing={4}>
              <ToggleButtonGroup 
                  size="small"
                  value={activeView}
                  exclusive
                  onChange={handleView}
                  aria-label="text alignment"
                  sx={{margin:'2px'}}
              >
                  <ToggleButton value="Preview" aria-label="Preview Column">
                      <Tooltip title="Preview selected column" placement="bottom-start">
                          <img className="icon" src={PreviewImg}/>         
                      </Tooltip>
                  </ToggleButton>                   
                  <ToggleButton value="Lineage" aria-label="Lineage">
                      <Tooltip title="Lineage" placement="bottom-start">
                          <img className="icon" src={LineageImg}/>         
                      </Tooltip>
                  </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Stack className="togglebutton" direction="row" spacing={4}  sx={{marginRight:'10px'}}>
              <ToggleButtonGroup 
                  size="small"
                  exclusive
                  onChange={showTablePreview}
                  aria-label="text alignment"
                  sx={{margin:'2px'}}
              >
                  <ToggleButton value="PreviewTable" aria-label="Preview Column">
                      <Tooltip title="Preview all attributes" placement="bottom-start">
                          <img className="icon" src={PreviewTableImg}/>         
                      </Tooltip>
                  </ToggleButton>                   
              </ToggleButtonGroup>
            </Stack>    
        </div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table" sx={{margin:0, padding:0}} >
              <TableHead >
                <TableRow>
                {columns.map((column,index) => (
                    <TableCell 
                        key={column}
                        align={"left"}
                        style={{ fontWeight:'bold',backgroundColor:'#37ABC8',padding:'5px' }}
                        >
                        {column}
                    </TableCell>
                ))}
                </TableRow>
              </TableHead>
              <TableBody>
                  {dpData["Tables"][0]["Columns"].map((colitem,index) => (
                  <TableRow onClick={() => {clickColumnHandler(colitem['Name'])}} key={colitem['Name']}  className={activeColumn==colitem['Name']?"itemactive":"item" }>
                      <TableCell align="left" width="35%" style={{padding:'2px'}} >{colitem['Name']} </TableCell>
                      <TableCell align="left" width="20%" style={{padding:'2px'}} >{colitem['Type']}</TableCell>
                      <TableCell align="left" width="45%" style={{padding:'2px'}} >{colitem['Comment']}</TableCell>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
      </div>
        {renderView(activeView)}
        <PreviewTable openDlg={viewTablePreviewDlg} setOpenDlg={setViewTablePreviewDlg} dpData = {dpData}/>
        <Outlet />
    </div>
  );
};

export default DPTableView;

