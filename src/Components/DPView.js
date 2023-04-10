import '../Stylecss.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'

//////////////
import { Stack } from "@mui/material";
import IconLabelTabs from "./tabberdpview";

import SimpleCard from './SimpleCard'

////////////////////


const DPView = (props) => {
  const dpData = props.dpData    
  const showDeleteButton = props.showDeleteButton
  const showEditButton = props.showEditButton
  const showCloseButton = props.showCloseButton
  const setViewType = props.setViewType
  const viewTypes = props.viewTypes
  const setActiveDPId = props.setActiveDPId
  const activeDPId = props.activeDPId
  const setDeleteDP = props.setDeleteDP

 
  return (
    <>
      <div className="dpview">
       <div>
          <Box className="title">{dpData["Product Name"]}</Box>
          { showCloseButton &&(
              <IconButton className='dppropscloseicon' size="small" 
                                  sx={{marginRight:'5px',marginTop:'1px',backgroundColor:'#0D9F98',color:'rgb(25,118,210)'}}
                                  onClick={() => {setActiveDPId(-1)
                                                  
                                                  }}>
                <CloseIcon fontSize='small' >Close</CloseIcon>
              </IconButton>
            )
          }
          { showEditButton &&(
              <Button className='buttons' variant="contained" startIcon={<EditIcon />}
                                  onClick={() => {console.log('here');setViewType(viewTypes[2])}}>
                Edit
              </Button>
            )
          }
          { showDeleteButton &&(
              <Button className='buttons' variant="contained" startIcon={<DeleteIcon />}
                                  onClick={() => {setDeleteDP(true)}}>
                Delete
              </Button>
            ) 
          }
        </div>
       <div className ="dpdescriptioncard">
          <Box className='dppropsdescription'>{dpData["Product Description"]}</Box> </div> {/*ravleen*/}
         
         <Stack >
                <SimpleCard >
                  <IconLabelTabs dpData={dpData}/>
                </SimpleCard>
              </Stack>
      </div>
    </>    
  );
};

export default DPView;
