import * as React from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockOpenIcon from '@mui/icons-material/LockOpenTwoTone';
import Rating from '@mui/material/Rating';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import { ChurnAnalysisPopOver } from './PopOverBoxes';

 
const DPCard = (props) => {
  const activeDp = props.activeDp
  const setActiveDp = props.setActiveDp
	const activeView = props.activeView
  const setActiveView = props.setActiveView

  const [value, setValue] = React.useState(2);
  
  /* pop over variables */
  const [anchorElPopOver, setAnchorElPopOver] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorElPopOver(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorElPopOver(null);
  };
  const openPopOver = Boolean(anchorElPopOver);

  /* for favorite dialog */
  const [openDlg, setOpenDlg] = React.useState(false);
  function handleClickOpenDlg()  {
    setOpenDlg(true);
  };
  function handleCloseDlg()  {
    setOpenDlg(false);
  };

  /* for access dialog */
  const [openAccessDlg, setOpenAccessDlg] = React.useState(false);
  function handleClickAccessDlg()  {
    setOpenAccessDlg(true);
  };
  function handleCloseAccessDlg()  {
    setOpenAccessDlg(false);
  };

  /* for more details properties */
  function handleClickMoreDetailsDlg(id)  {
    console.log("clicked more detail ",id)
    setActiveDp(id)
  };
  
  /* render right popover dialog */
  function renderPopOver(id){
    switch(id){
      case 0:
        return <ChurnAnalysisPopOver/>
      default:
        return <ChurnAnalysisPopOver/> //todo...need to fix here

    }
  } 

  function renderMoreDetail(id){
    switch(id){
      case 0:
        return (
          <Tooltip title="More details" placement="bottom">
            <IconButton sx={{margin:0,padding:0}} aria-label="more details" 
                      onClick={()=>handleClickMoreDetailsDlg(id)}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        )
      default:
        return (
          <Tooltip title="More details" placement="bottom">
            <IconButton sx={{margin:0,padding:0}} aria-label="more details"
                      onClick={()=>handleClickMoreDetailsDlg(id)}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        )

    }
  }
  return (
    <>
      <Card sx={{ maxWidth: 200,boxShadow: "0px 0px 5px 0px" }}>
        <Paper variant="outlined" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}> 
          <img src={props.image} alt="dp background"/>
        </Paper>
        <CardContent sx={{marginTop:'0px',paddingTop:'5px',paddingBottom:'15px',minHeight:'60px',maxHeight:'60px'}}>
          <Typography component={'span'}variant="body2" color="text.secondary">
          <Box sx={{fontSize:'14px',margin:0,padding:0,fontWeight: 'bold', m: 0 }}>{props.description}</Box>
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent:'center'}}>
          <Rating sx={{margin:0,padding:0}}
              size='small'
              name="simple-controlled"
              value={props.rating}
              onChange={(event, newValue) => {
              setValue(newValue);
              }}
          />
          <Tooltip title="Add as favorite" placement="bottom">
            <IconButton sx={{margin:0,padding:0}} aria-label="add to favorites" onClick={handleClickOpenDlg}>
              <FavoriteIcon fontSize="small"  sx={{margin:0,padding:0}}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Request access" placement="bottom">
            <IconButton sx={{margin:0,padding:0}} aria-label="request access" onClick={handleClickAccessDlg}>
              <LockOpenIcon fontSize="small"  sx={{margin:0,padding:0}}/>
            </IconButton>
          </Tooltip>
          {renderMoreDetail(props.id)}
        </CardActions>
      </Card>
      <Dialog
          open={openDlg}
          onClose={handleCloseDlg}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Is this your favorite?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Set this as your favorite.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDlg}>Cancel</Button>
            <Button onClick={handleCloseDlg} autoFocus>
              Confirm
            </Button>
          </DialogActions>
      </Dialog>
      <Dialog
          open={openAccessDlg}
          onClose={handleCloseAccessDlg}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Request access"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Request is sent to the publisher
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={handleCloseAccessDlg} autoFocus>
              OK
            </Button>
          </DialogActions>
      </Dialog>
      {
        // pop over
        //todo - fill remaining things
        props.id === 0?
          <Popover
            id="mouse-over-popover" sx={{pointerEvents: 'none',}}
            open={openPopOver}
            anchorEl={anchorElPopOver}
            anchorOrigin={{vertical: 'center',horizontal: 'left',}}
            transformOrigin={{vertical: 'top',horizontal: 'left',}}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
          {renderPopOver(props.id)}
          </Popover>
        :
          <Popover
            id="mouse-over-popover"
            sx={{pointerEvents: 'none',}}
            open={openPopOver}
            anchorEl={anchorElPopOver}
            anchorOrigin={{vertical: 'center',horizontal: 'left',}}
            transformOrigin={{vertical: 'top',horizontal: 'left',}}
            onClose={handlePopoverClose}
            disableRestoreFocus
            >
            {renderPopOver(props.id)}
          </Popover>
      }
    </>

  );
}
export default DPCard;