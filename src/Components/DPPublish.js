import React from 'react'

import { useEffect, useState, useReducer } from "react";
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import SyncIcon from '@mui/icons-material/Sync'
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { green } from '@mui/material/colors';

import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import CloudUploadIcon  from '@mui/icons-material/CloudUpload';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DPPublishTableView from './DPPublishTableView';
import DPPublishPreviewTable from "./DPPublishPreviewTable"
import DataProductList from './DPList';
import DPCatagoriesList from './DPCategoriesList';
import DPView from './DPView';
import { URL_STR } from './constants';
const CssTextField = styled(TextField)({
  '& label': {
    color: '#5C504D',
  },
  '& label.Mui-focused': {
    color: '#5C504D',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#5C504D',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'darkgray',
    },
    '&:hover fieldset': {
      borderColor: '#5C504D',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2196F3',
    },
  },
});
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));
const publishDataInitialValues = {
  "Product Owner": '',    
  "Owner Email": '',
  "Creation Date": '',
  "Last Update Date": '',
  'Product Name':'',

  'Product Description':'',
  'Contains PII':false,
  'Encrypted':false,
  'Storage':'',
  'Source Type':'',
  'Link':'',
  'User Name':'',
  'Password':'',
  'LinkRefCode':'',
  'LinkReadme':'',

  "quality":'',
  "VersionId": '',
  "Tables":[],
  "Archetype":'',
  "Subtype":''
}
const archetypes = [
  { 'Type': ['None',''], 
    'Subtype':  [
          ['None','']
        ]
  },
  { 'Type': ['Customer Retention & Churn','Customer Retention & Churn'], 
    'Subtype':  [
          ['None','']
        ]
  },
  { 'Type': ['Pre Sales','Pre Sales'],
    'Subtype':  [
          ['None','']
        ]
  },
  { 'Type': ['Sales','Sales'],
    'Subtype':  [
          ['None','']
        ]
  },
  { 'Type': ['Subscription','Subscription'],
    'Subtype':  [
          ['None','']
        ]
  },
  { 'Type': ['Contracts','Contracts'],
    'Subtype':  [
          ['None','']
        ]
  },
  { 'Type': ['Order provisioning & status','Order provisioning & status'],
    'Subtype':  [
          ['None','']
        ]
  },
  { 'Type': ['Order fallouts','Order fallouts'],
  'Subtype':  [
        ['None','']
      ]
},{ 'Type': ['Cancellations','Cancellations'],
'Subtype':  [
      ['None','']
    ]
},
 { 'Type': ['Incidents and issues','Incidents and issues'],
  'Subtype':  [
        ['None','']
      ]
},
{ 'Type': ['KPIs and SLAs','KPIs and SLAs'],
'Subtype':  [
      ['None','']
    ]
},
 
{ 'Type': ['IVR','IVR'],
  'Subtype':  [
        ['None','']
      ]
},
{ 'Type': ['Digital (.com & mobile)','Digital (.com & mobile)'],
'Subtype':  [
      ['None','']
    ]
}, 
{ 'Type': ['Social media','Social media'],
'Subtype':  [
      ['None','']
    ]
},
{ 'Type': ['Contact center','Contact center'],
'Subtype':  [
    ['None','']
  ]
},
 { 'Type': ['Store','Store'],
'Subtype':  [
      ['None','']
    ]
},

{ 'Type': ['Billing invoices','Billing invoices'],
  'Subtype':  [
        ['None','']
      ]
},
{ 'Type': ['Payments','Payments'],
'Subtype':  [
      ['None','']
    ]
}, 
{ 'Type': ['Partner data','Partner data'],
  'Subtype':  [
        ['None','']
        
      ]
},
{ 'Type': ['Network assurance','Network assurance'],
  'Subtype':  [
      ['None','']
      
    ]
}
]
function getSubTypeCount(selectedType){
  for (let i =0;i<archetypes.length;i++){
    let atype = archetypes[i]
    if (atype['Type'][1] === selectedType){
      return atype['Subtype'].length
    }
  }
  return 0
}
function getSubTypeList(selectedType){
  for (let i =0;i<archetypes.length;i++){
    let atype = archetypes[i]
    if (atype['Type'][1] === selectedType){
      return atype['Subtype']
    }
  }
  return []    
}
function resetFields(publishData, setPublishData){
  setPublishData(publishData =>({...publishData,'Product Owner':""}))
  setPublishData(publishData =>({...publishData,'Creation Date':""}))
  setPublishData(publishData =>({...publishData,'Last Update Date':""}))
  setPublishData(publishData =>({...publishData,'Product Name':""}))
  setPublishData(publishData =>({...publishData,'Product Description':""}))
  setPublishData(publishData =>({...publishData,'Contains PII':false}))
  setPublishData(publishData =>({...publishData,'Encrypted':false}))
  setPublishData(publishData =>({...publishData,'Storage':""}))
  setPublishData(publishData =>({...publishData,'Source Type':""}))
  setPublishData(publishData =>({...publishData,'Link':""}))
  setPublishData(publishData =>({...publishData,'User Name':""}))
  setPublishData(publishData =>({...publishData,'Password':""}))
  setPublishData(publishData =>({...publishData,'LinkRefCode':""}))
  setPublishData(publishData =>({...publishData,'LinkReadme':""}))
  setPublishData(publishData =>({...publishData,'quality':""}))
  setPublishData(publishData =>({...publishData,'VersionId':""}))
  setPublishData(publishData =>({...publishData,'Tables':[]}))
  setPublishData(publishData =>({...publishData,'Archetype':""}))
  setPublishData(publishData =>({...publishData,'Subtype':""}))
}
function DPPublishForm (props){
  //inserts or updates a document in OpenSearch index
  const publishData = props.publishData
  const setPublishData = props.setPublishData
  const publishing = props.publishing
  const setPublishing = props.setPublishing
  const setJsonFileContent = props.setJsonFileContent
  const setDisableSubtype = props.setDisableSubtype
  const disableSubtype = props.disableSubtype
  const dpID = props.dpID
  const dummyForceRefresh = props.dummyForceRefresh
  const setDummyForceRefresh = props.setDummyForceRefresh
  const setFetchDPPreviewData = props.setFetchDPPreviewData
  

  const handleSubmit = e =>{
    e.preventDefault()
    const dateStr = new Date().toISOString().slice(0, 10)
    
    var finalPublishData = JSON.parse(JSON.stringify(publishData))
    finalPublishData['Creation Date'] = dateStr
    finalPublishData['Last Update Date'] = dateStr
    //console.log(finalPublishData)
    
    setPublishing(true);
    var requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        redirect: 'follow',
        body: JSON.stringify(finalPublishData)
      };
    var urlstr = ''
    if (dpID == -1){
      urlstr = URL_STR+'insert-document'
    } else{
      urlstr = URL_STR+'update-document?id='+dpID.toString()
    }
    var url = new URL(urlstr)

    console.log(url)
    fetch(url,requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setPublishing(false);
        console.log("Response from server",response)
        if (response["result"] === "created" || response["result"] === "updated"){
            setJsonFileContent(null)
            resetFields(publishData, setPublishData)
            setDummyForceRefresh(!dummyForceRefresh)
        } else{
            alert("Failed to publish data product.")
        }
      }
      )
      .catch(error=>{
        setPublishing(false);
        console.log("Error in publishing data product")
        alert("Failed to publish data product.")
      })
  }

  const handleFetchDPPreviewData = e =>{
    if( publishData['Link'] === ''){
      alert("Please enter storage URL and click again")
      return
    }
    setFetchDPPreviewData(true)
  }
  const storageLocation = [
    ['None',''],
    ['AWS S3','AWS S3'],
    ['Google Storage','Google Storage'],
    ['AZURE Blob','AZURE Blob']
  ]
  const sourceFormat = [
    ['None',''],
    ['CSV','CSV'],
    ['JSON','JSON'],
    ['Parquet','Parquet']
  ]    
  
  return(
    <>
    <form className="form" onSubmit={handleSubmit} id="publishform">
      <div className="fields">
        <CssTextField id="product-name" required value={publishData['Product Name']} className='field' size='small' label="Name"
                                                    inputProps={{maxLength: 30}}
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'Product Name':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the name for Data Product")}
                                                    onInput={e =>e.target.setCustomValidity("")}/>
        <CssTextField id="product-description"required value={publishData['Product Description']} className='field' multiline size='small' label="Description"  
                                                    inputProps={{maxLength: 100}}
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'Product Description':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the description for Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
        <div className="pii">
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="left">
                <Typography component={'span'} variant="body2" color="text.secondary">
                    <Box  sx={{fontSize:14,fontWeight: 'bold',marginRight:'5px' }}> Contains&nbsp;PII</Box>
                </Typography>
                <Typography component={'span'} variant="body2" color="text.secondary">No</Typography>
                <AntSwitch checked={publishData['Contains PII']} inputProps={{ 'aria-label': 'ant design' }} 
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'Contains PII':e.target.checked}))}/>
                <Typography component={'span'} variant="body2" color="text.secondary">Yes</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography component={'span'} variant="body2" color="text.secondary">
                  <Box  sx={{fontSize:14,fontWeight: 'bold',marginRight:'5px' }}>Encrypted</Box>
                </Typography>
                <Typography component={'span'} variant="body2" color="text.secondary">No</Typography>
                <AntSwitch checked={publishData['Encrypted']} inputProps={{ 'aria-label': 'ant design' }} 
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'Encrypted':e.target.checked}))}/>
                <Typography component={'span'} variant="body2" color="text.secondary">Yes</Typography>
              </Stack>
            </Stack>
        </div>
        <Stack className="field" direction="row" spacing={1} alignItems="center">
          <FormControl sx={{ width: '100%' }} size='small'>
            <InputLabel id="demo-simple-select-label">Storage</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="storage"
              value={publishData['Storage']}
              label="Storage"
              onChange={(e) => 
                setPublishData(publishData =>({
                ...publishData,
                'Storage':e.target.value}))
              }
              >
              {
                storageLocation.map((storage) => (
                  <MenuItem key={storage[0]} value={storage[1]} >{storage[0]}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl sx={{ width: '100%' }} size='small'>
            <InputLabel id="demo-simple-select-label2">Source Type</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label2"
              id="source-type"
              value={publishData['Source Type']}
              label="Source Type"
              onChange={(e) => setPublishData(publishData =>({
                ...publishData,
                'Source Type':e.target.value}))}
            >
              {
                sourceFormat.map((source) => (
                  <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <CssTextField id="link" required value={publishData['Link']} className='field' size='small' label="Storage URL" 
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'Link':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the URL for Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
          <Tooltip title="Extract data from this URL" placement="bottom">
            <IconButton className='button' size="small" 
                                    sx={{marginRight:'5px',marginTop:'1px',backgroundColor:'#0D9F98',color:'rgb(25,118,210)', '&:hover': {
                                      bgcolor: '#08726d'}}}
                                    onClick={() => {handleFetchDPPreviewData()}}>
              <SyncIcon fontSize='small' >Close</SyncIcon>
            </IconButton>                                    
          </Tooltip>                
        </Stack>                                                    
        <Stack direction="row" spacing={1} alignItems="center">
          <CssTextField id="user-name" required value={publishData['User Name']} name="somename" className='field' size='small' label="User Name" 
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'User Name':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the user name for Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
          <CssTextField id="password" required value={publishData['Password']} className='field' size='small' label="Password" type='password' 
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'Password':e.target.value}))}
                                                      autoComplete= 'new-password'
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the password for Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
        </Stack>
        <CssTextField id="link-ref-code" required value={publishData['LinkRefCode']} className='field' size='small' label="Reference Code URL" 
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'LinkRefCode':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the URL to reference code for  Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
        <CssTextField id="link-readme" required value={publishData['LinkReadme']} className='field' size='small' label="Readme URL" 
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'LinkReadme':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the URL to read me for Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
        <Stack direction="row" spacing={1} alignItems="center">
          <CssTextField id="owner-name" required  value={publishData['Product Owner']} name="somename" className='field' size='small' label="DP Owner Name" 
                                                    inputProps={{maxLength: 25}}
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'Product Owner':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the name of Data Product owner")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
          <CssTextField id="owner-email" disabled required value={publishData['Owner Email']} className='field' size='small' label="DP Owner Email" 
                                                    onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      'Owner Email':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the email address of Data Product Owner")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
        </Stack>
        <Stack className="field" direction="row" spacing={1} alignItems="center">
            <FormControl sx={{ width: '100%' }} size='small'>
              <InputLabel id="archetype-label">Archetype</InputLabel>
              <Select
                required
                labelId="archetype-label"
                id="archetype"
                value={publishData['Archetype']}
                label="Archetype"
                onChange={(e) => {
                  setPublishData(publishData =>({
                            ...publishData,
                            'Archetype':e.target.value}))
                  if (getSubTypeCount(e.target.value) === 1){
                    setDisableSubtype(true)
                  } else{
                    setDisableSubtype(false)
                  }
                }}
                >
                {
                  archetypes.map((archetype) => (
                    <MenuItem key={archetype['Type'][0]} value={archetype['Type'][1]} >{archetype['Type'][0]}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%' }} size='small'>
              <InputLabel id="archetype-label">Sub Type</InputLabel>
              <Select
                required
                disabled = {disableSubtype}
                labelId="archetype-subtype-label"
                id="Subtype"
                value={publishData['Subtype']}
                label="Sub Type"
                onChange={(e) => 
                  setPublishData(publishData =>({
                  ...publishData,
                  'Subtype':e.target.value}))
                }
                >
                {
                  getSubTypeList(publishData['Archetype']).map((subtype) => (
                    <MenuItem key={subtype[0]} value={subtype[1]} >{subtype[0]}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
                  
        </Stack>
      </div>
    </form>
    </>
  )                                            
}

export default function DPPublish(props) {
  
  const [jsonFileContent, setJsonFileContent] = useState(null);
  //retrieve the current user's email id
  const [ user,setUser ] = useState(null);
  console.log("rrrrrrrrrrrrrrrrrr", props)
  publishDataInitialValues["Owner Email"] =  user;
  const [publishData, setPublishData] = useState(publishDataInitialValues)
  //it was not resetting the content, when we were moving away while editing and coming back
  //hence this below piece of code... todo : need to check this
  /*const location = useLocation();
  useEffect(() => {
    if(location['pathname'] !== '/dppublish'){
      //if (getPathSameStatus() === false){  //if the nav bar menu "publish" is clicked again, do not reset the fields
        //console.log("url changed",location['pathname'],location)
        resetFields(publishData,setPublishData)
        setActiveDPId(-1)
        setViewType(viewTypes[0])
     // }
    }
  }, [location]);*/
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>> DPPUBLISH");
    console.log(props["user"]?.email);
    setUser(props["user"]?.email);
  }, [props["user"]?.email]);

  const [publishing, setPublishing] = useState(false);
  const [disableSubtype,setDisableSubtype] = useState(false);
  
  //get list of published data products for the current userfrom OpenSearch index
  const [checked, setChecked] = useState([]);
  const [isActive, setActive] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dpList, setDpList] = useState([]);
  const [error, setError] = useState({});
  const [activeDPId, setActiveDPId] = useState(-1)
  const [dpData, setDpData] = useState([]);
  const viewTypes = ["publishdp","viewdp","editdp"];
  const [viewType, setViewType] = useState(viewTypes[0])
  const [deleteDP,setDeleteDP] = useState(false)
  const [dummyForceRefresh,setDummyForceRefresh] = useState(false)
  const [fetchDPPreviewData,setFetchDPPreviewData] = useState(false)
  const [dpPreviewData,setDpPreviewData] = useState([])

  // retrieve the list of data products published by the current user
  const fetchDPList = async () =>{
    console.log("trying to retrieve latest items")
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
      };
    
    var urlstr = URL_STR+'get-my-document-list?owneremail='+publishDataInitialValues["Owner Email"]
    var url = new URL(urlstr)

    try {
      fetch(url,requestOptions)
        .then((res) => res.json())
        .then((hits) => {
          var docs = [];
          hits["hits"]["hits"].forEach(element => {
            docs.push(
              {"id":element["_id"],"name":element["fields"]["Product Name"][0] }
            )
          });
          //console.log(docs)
          setLoading(false);
          setDpList(docs)
        });
    } catch (error) {
      console.log("error",error)
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    //console.log("in useeffect fetchdplist")
    setLoading(true);
    fetchDPList();
  }, []);
  
  //retrieve the selected data product
  useEffect(()=>{
    //console.log("in activedp useeffect")
    if(activeDPId !== -1){ //-1 means nothing has been selected
      console.log("fetching document")

      //retrieve the data product
      const fetchDP = async () =>{
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
          };
        var urlstr = URL_STR+'get-document?id='+activeDPId.toString()
        var url = new URL(urlstr)

        try {
          fetch(url,requestOptions)
            .then((res) => res.json())
            .then((doc) => {
              setLoading(false);
              //console.log(doc['_source'])
              //console.log(doc)
              setDpData(doc['_source'])
            });
        } catch (error) {
          console.log("error",error)
          setLoading(false);
          setError(error);
        }
      }
      setLoading(true);
      fetchDP();
    } else{
      setViewType(viewTypes[0])
    }
  },[activeDPId])

  //when DP is fetched from server, change the view type automatically to DP view
  useEffect(()=>{ 
    //console.log("in useeffect dpdata1")
    if( dpData.length !== 0){
      //console.log("in useeffect dpdata2")
      setViewType(viewTypes[1])

      //update the read data to publishData to enable editing if needed
      /*
      publishData['Product Name'] = dpData['Product Name']
      publishData['Product Description'] = dpData['Product Description']
      publishData['Contains PII'] = dpData['Contains PII']
      publishData['Encrypted'] = dpData['Encrypted']
      publishData['Storage'] = dpData['Storage']
      publishData['Source Type'] = dpData['Source Type']
      publishData['Link'] = dpData['Link']
      publishData['User Name'] = dpData['User Name']
      publishData['Password'] = dpData['Password']
      publishData['LinkRefCode'] = dpData['LinkRefCode']
      publishData['LinkReadme'] = dpData['LinkReadme']
      publishData['Product Owner'] = dpData['Product Owner']
      publishData['Tables'] = dpData['Tables']
      publishData['Archetype'] = dpData['Archetype']
      */
      setPublishData(dpData)
      if (getSubTypeCount(dpData['Archetype']) === 1){
        setDisableSubtype(true)
      } else{
        setDisableSubtype(false)
      }
      forceUpdate();
    }
  },[dpData])
  
  //reset the field contents when view type changes to new DP publish
  useEffect(() =>{ 
    //console.log("in viewtype useeffect")
    if( viewType === viewTypes[0]){
      resetFields(publishData,setPublishData)
      setLoading(true);
      fetchDPList();
      setActiveDPId(-1)
    }
  },[viewType])

  useEffect(() => {
    //console.log("inuseeffect setviewtype")
    const close = (e) => {
        if(e.key === 'Escape'){ //go back to product card view
          setViewType(viewTypes[0])
        }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[setViewType])

  //reset the field contents when view type changes to new DP publish
  useEffect(() =>{ 
    //console.log("in dummy useeffect")

    resetFields(publishData,setPublishData)
    setLoading(true);
    fetchDPList();
    setActiveDPId(-1)

  },[dummyForceRefresh])
  
  //arrives here when we prss Delete button in dp view page
  useEffect(()=>{
    if( activeDPId !== -1){
      console.log("about to delete")
      console.log("fetching document")

      //retrieve the data product
      const deleteDP = async () =>{
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
          };
        var urlstr = URL_STR+'delete-document?id='+activeDPId.toString()
        var url = new URL(urlstr)

        try {
          fetch(url,requestOptions)
            .then((res) => res.json())
            .then((res) => {
              setLoading(false);
              setDeleteDP(false)
              console.log(res)
            });
        } catch (error) {
          console.log("error",error)
          setLoading(false);
          setError(error);
        }
      }
      resetFields(publishData,setPublishData)
      setLoading(true);
      deleteDP();
      setDummyForceRefresh(!dummyForceRefresh)
    }
  },[deleteDP])

  const handleChange = e => {
    if (e.target.files.length > 0){    //if the user has selected one file
        const file = e.target.files[0]
        const fileReader = new FileReader();
        fileReader.onload = e => {
            const result = e.target.result;
            setJsonFileContent(JSON.parse(result));  //convert to json and read the file
        };
        fileReader.readAsText(file, "UTF-8");
        e.target.value = ''
    }
  };
  const fetchDPColumnAndPreview = async () =>{
    //todo : as of now considering only aws s3 bucket..
    //expected format : bucket name / csv file name
    //e.g : mesh-bucket-airflow/order.csv
    const bucketName = publishData['Link'].split('/').slice(0,-1).join('/')
    const fileKey = publishData['Link'].split('/').pop()

    if( bucketName === '' || fileKey === ''){
      setFetchDPPreviewData(false)
      alert("Please enter valid URL and filename")
      return
    }
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
      };
    
    var urlstr = URL_STR+'extract-dp-preview?bucket='+bucketName+'&object_key='+fileKey
    var url = new URL(urlstr)
    setLoading(true)      
    try {
      fetch(url,requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setDpPreviewData(data)
          setLoading(false);
        });
    } catch (error) {
      console.log("error",error)
      setLoading(false);
    }
  }
  useEffect(()=>{
    if (fetchDPPreviewData){
      fetchDPColumnAndPreview()
      setFetchDPPreviewData(false)
    }
  },[fetchDPPreviewData])

  useEffect(()=>{
    if (dpPreviewData.length !== 0){
      setPublishData(publishData =>({...publishData,'Tables':dpPreviewData}))
    }
  },[dpPreviewData]);

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(()=>{
      if( jsonFileContent !== null){
          console.log("here")
          jsonFileContent["Owner Email"] = publishDataInitialValues["Owner Email"]
          setPublishData(jsonFileContent)

          document.getElementById("product-name").setCustomValidity("")
          document.getElementById("product-description").setCustomValidity("")
          document.getElementById("link").setCustomValidity("")
          document.getElementById("user-name").setCustomValidity("")
          document.getElementById("password").setCustomValidity("")
          document.getElementById("link-ref-code").setCustomValidity("")
          document.getElementById("link-readme").setCustomValidity("")
          document.getElementById("owner-name").setCustomValidity("")
          document.getElementById("owner-email").setCustomValidity("")
          if (getSubTypeCount(jsonFileContent['Archetype']) === 1){
            setDisableSubtype(true)
          } else{
            setDisableSubtype(false)
          }

          forceUpdate();
      }
  },[jsonFileContent]);

  const buttonSx = {
    ...(publishing && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  function renderAttributesView(dpData,setJsonFileContent){
    if(dpData["Tables"].length === 0){
      return(
        <></>
      )
    } else{
      return(
        <>
        <div className="dppublishdata">
          <DPPublishTableView dpData={dpData}>
          </DPPublishTableView>
          <DPPublishPreviewTable dpData={dpData}>
          </DPPublishPreviewTable>
        </div>
        </>
      )
    }
  }  
  function renderViewTypes(){
    if(viewType === viewTypes[0] || activeDPId === -1){  //publish view -> new data product
      
      return(
        <div className="dppublishview">
          <h4 className="title"> Publish a new data product</h4>
          <Stack direction="row" justifyContent="center" alignItems="top" marginBottom="10px">
            <Typography component={'span'} variant="body2" color="text.secondary">
              <Box sx={{fontSize:14,fontWeight: 'bold',marginRight:'5px' }}>Import from a JSON file</Box>
            </Typography>
            <input type='file' id='file' accept='.json' onChange={handleChange}/>
          </Stack>
          {/*<form>*/}
          <Stack direction="row" justifyContent="space-between" alignItems="top">
            <DPPublishForm 
              publishData={publishData} 
              setPublishData={setPublishData} 
              setJsonFileContent={setJsonFileContent}
              publishing = {publishing}
              setPublishing = {setPublishing}
              disableSubtype = {disableSubtype}
              setDisableSubtype = {setDisableSubtype}
              dpID = {-1}
              dummyForceRefresh = {dummyForceRefresh}
              setDummyForceRefresh = {setDummyForceRefresh}
              setFetchDPPreviewData = {setFetchDPPreviewData}
            />
            {renderAttributesView(publishData)}
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center" }}>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Fab
                type="submit"
                form="publishform"
                aria-label="save"
                color="primary"
                 sx={{backgroundColor:'#0D9F98',  '&:hover': {
                  bgcolor: '#08726d'}}}
               
              >
                {publishing ? <CheckIcon /> : <CloudUploadIcon />}
              </Fab>
              {publishing && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
            <Box sx={{ m: 1, position: 'relative' }}>
              <button className = "frmbtn2" type="submit" variant="contained" disabled={publishing} backgroundColor='#0D9F98' color='rgb(25,118,210)' form="publishform" >
                Publish
              </button>                
              {publishing && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Box>
        </div>
      )
    } if (viewType === viewTypes[1]){  //view DP -> view existing dp
      
      return(
        <>
        <DPView dpData={dpData} dpID={activeDPId} setActiveDPId={setActiveDPId} setViewType={setViewType} viewTypes={viewTypes} setDeleteDP={setDeleteDP}
                showDeleteButton={true} showEditButton={true} showCloseButton={true}/>
        <div className="stats">
            <h4 className="title">Statistics</h4>
        </div>
        </>
      )
    }
    else{ //viewTypes[2] //edit existing DP
      
      return(
        <div className="dppublishview">
          <div>
            {/*<h4 className='title'> Edit data product</h4>*/}
            <Box className="dppropstitletext">Edit data product</Box>
            <IconButton className='closeicon' size="small" 
                                  sx={{width:'26px',height:'26px',marginRight:'5px',marginTop:'1px',backgroundColor:'rgb(226, 222, 222)',color:'rgb(25,118,210)'}}
                                  onClick={() => {setViewType(viewTypes[0])
                                                  setActiveDPId(-1)
                                                  }}>
                <CloseIcon fontSize='small' >Close</CloseIcon>
            </IconButton>
          </div>
          <Stack direction="row" justifyContent="center" alignItems="top" marginBottom="10px">
            <Typography component={'span'} variant="body2" color="text.secondary">
              <Box sx={{fontSize:14,fontWeight: 'bold',marginRight:'5px' }}>Import from a JSON file</Box>
            </Typography>
            <input type='file' id='file' accept='.json' onChange={handleChange}/>
          </Stack>
          {/*<form>*/}
          <Stack direction="row" justifyContent="space-between" alignItems="top">
            <DPPublishForm 
              publishData={publishData} 
              setPublishData={setPublishData} 
              setJsonFileContent={setJsonFileContent}
              publishing = {publishing}
              setPublishing = {setPublishing}
              disableSubtype = {disableSubtype}
              setDisableSubtype = {setDisableSubtype}
              dpID = {activeDPId}
              dummyForceRefresh = {dummyForceRefresh}
              setDummyForceRefresh = {setDummyForceRefresh}
              setFetchDPPreviewData = {setFetchDPPreviewData}
            />
            {renderAttributesView(publishData)}
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center" }}>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Fab
                type="submit"
                form="publishform"
                aria-label="save"
                color="primary"
                sx={buttonSx}
              >
                {publishing ? <CheckIcon /> : <CloudUploadIcon />}
              </Fab>
              {publishing && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Button type="submit" variant="contained" disabled={publishing} color="primary" form="publishform" >
                Update
              </Button>                
              {publishing && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Box>
        </div>
      )
    }
  }
  return (
    <div className="dppublishpage">
      {/* loading progress bar */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" className='backdrop-progress'/>
      </Backdrop>
      <DPCatagoriesList
          checked={checked} setChecked={setChecked}
          isActive={isActive} setActive={setActive}         
        >
        </DPCatagoriesList>
      {/*
      <DataProductList dpList={dpList} activeDPId={activeDPId} setActiveDPId={setActiveDPId} loading={loading} title="My Data Products">
  </DataProductList>*/}
      {renderViewTypes()}
    </div>
  )
}

//mesh-bucket-airflow
//orders.csv
//mesh-bucket-airflow/orders.csv