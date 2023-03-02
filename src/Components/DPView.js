import '../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import DPTableView from './DPTableView';
import QualityView from './QualityView';
import Grid from '@mui/material/Grid';

import PIIImg from "../resources/datapii.svg"
import RecencyImg from "../resources/recency.svg"
import SubscriberCountImg from "../resources/subscribercount.svg"
import RatingImg from "../resources/rating.svg"
import ArchetypeImg from "../resources/archetype.png"
import SubtypeImg from "../resources/archetype-subtype.png"
import AppsImg from "../resources/apps.svg"
import CodeImg from "../resources/code.svg"
import InfrastructureImg from '../resources/infra.svg';
import AnalyticsImg from '../resources/analytics-svgrepo-com.svg';
import ToggleButton from '@mui/material/ToggleButton';

import { useState } from "react";

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

  const PropItem = (props) =>{
    return(
      <Grid className='propsitem' container spacing={0}>
        <Grid className="propsitemtitle" item lg={5} md={12} sm={12}xs={12} key={props.id}>
          <img className="img" src={props.icon}/> 
          <p className='propsitemtitletext'>{props.title}</p>
        </Grid>
        <Grid className="text" item lg={7} md={12} sm={12 }xs={12} key={props.id}>
          {props.value}
        </Grid>
      </Grid>
    );
  }  
  const PropItemRating = (props) =>{
    return(
      <Grid className='propsitem' container spacing={0}>
        <Grid className="propsitemtitle" item lg={5} md={12} sm={12}xs={12} key={props.id}>
          <img className="img" src={props.icon}/> 
          <p className='propsitemtitletext'>{props.title}</p>
        </Grid>
        <Grid className="rating" item lg={7} md={12} sm={12 }xs={12} key={props.id}>
          <Rating
                  size='small'
                  name="simple-controlled"
                  value={props.rating}              
                  readOnly
          />
        </Grid>
      </Grid>
    );
  }
  function renderTableView(dpData){
    if(dpData["Tables"].length === 0){
      return(
        <></>
      )
    } else {
      return(
        <DPTableView dpData={dpData}>
        </DPTableView>
      )
    }
  }  
  
  const [viewQualityImage, setViewQualityImage] = useState(false);

  const showQualityImage = () => {
    setViewQualityImage(true)
  };
  const hideQualityImage = () => {
    setViewQualityImage(false)
  };
  return (
    <>
      <div className="dpview">
        <div>
          <Box className="title">{dpData["Product Name"]}</Box>
          { showCloseButton &&(
              <IconButton className='dppropscloseicon' size="small" 
                                  sx={{marginRight:'5px',marginTop:'1px',backgroundColor:'rgb(226, 222, 222)',color:'rgb(25,118,210)'}}
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
          <Box className='dppropsdescription'>{dpData["Product Description"]}</Box>
          <div className='propsitems'>
            <PropItem title="PII" icon={PIIImg} value={dpData["Contains PII"]?"Yes":"No"}/>
            <PropItem title="Updated on" icon={RecencyImg} value={dpData["Last Update Date"]}/>
            <PropItem title="#Subscribers " icon={SubscriberCountImg}  value="-"/>
          </div>
          <div className='propsitems'>
            <PropItem title="Archetype" icon={ArchetypeImg} value={dpData["Archetype"]}/>
            <PropItem title="Subtype" icon={SubtypeImg} value={dpData["Subtype"].length === 0 ? "None" :dpData["Subtype"]}/>
            <PropItemRating title="Rating&nbsp; " icon={RatingImg}  rating={0}/>
          </div>
        </div>
        <div className='codeinfra'>
          <div className="card">
            <div className='code'>
              <div className='title'>
                <img className='icon' src={CodeImg} color='red'/>          
                <Typography component={'span'} variant="body2" color="text.secondary">
                  <Box sx={{fontWeight: 'bold',marginLeft:'5px' }}>Code</Box>
                </Typography>
              </div>
              <div className='links'>
                <Typography component={'span'} variant="body2" color="text.secondary">
                  <div className='link'>
                    <Box sx={{fontSize:14,fontWeight: 'bold' }}>Ref Code :</Box>
                    <Link target="_blank" sx={{fontSize:14,marginLeft:'5px'}}
                                href={dpData["LinkRefCode"]} rel="noreferrer">
                                {dpData["LinkRefCode"]}
                    </Link>
                  </div>
                  <div className='link'>
                  <Box sx={{fontSize:14,fontWeight: 'bold' }}>Readme &nbsp;&nbsp;:</Box>
                    <Link target="_blank" sx={{fontSize:14,marginLeft:'5px'}}
                                href={dpData["LinkReadme"]} rel="noreferrer">
                                {dpData["LinkReadme"]}
                    </Link>
                  </div>
                </Typography>       
              </div>     
            </div>
              <div className='code'>
                <div className='title'>
                  <img className='icon' src={InfrastructureImg} color='red'/>          
                  <Typography component={'span'} variant="body2" color="text.secondary">
                    <Box sx={{fontWeight: 'bold',marginLeft:'5px' }}>Infrastructure</Box>
                  </Typography>
                </div>
                <div className='links'>
                  <Typography component={'span'} variant="body2" color="text.secondary">
                    <div className='link'>
                      <Box sx={{fontSize:14,fontWeight: 'bold' }}>Source Types :</Box>
                      <Box sx={{fontSize:14,fontWeight: 'normal',marginLeft:'3px' }}>{dpData["Source Type"]}</Box>
                    </div>
                    <div className='link'>
                      <Box sx={{fontSize:14,fontWeight: 'bold' }}>Storage &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Box>
                      <Box sx={{fontSize:14,fontWeight: 'normal',marginLeft:'3px' }}>{dpData["Storage"]}</Box>
                    </div>
                  </Typography>       
                </div>     
              </div>
          </div>  
        </div>
        {renderTableView(dpData)}
        <QualityView>
        </QualityView>
        <div className='usecase'>
          <div className="card">
            <img className='icon' src={AppsImg} color='red'/>          
            <Typography component={'span'}  variant="body2" color="text.secondary">
              <Box sx={{fontWeight: 'bold',marginLeft:'4px' }}>Use Cases And Apps</Box>
            </Typography>            
          </div>  
        </div>
      </div>
    </>    
  );
};

export default DPView;
