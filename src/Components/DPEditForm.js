import React from 'react'

import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import SyncIcon from '@mui/icons-material/Sync'
import Box from '@mui/material/Box';


import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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
{ 'Type': ['KPIs & SLAs','KPIs & SLAs'],
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
function resetFields(EditData, setEditData){
  setEditData(EditData =>({...EditData,'Product Owner':""}))
  setEditData(EditData =>({...EditData,'Creation Date':""}))
  setEditData(EditData =>({...EditData,'Last Update Date':""}))
  setEditData(EditData =>({...EditData,'Product Name':""}))
  setEditData(EditData =>({...EditData,'Product Description':""}))
  setEditData(EditData =>({...EditData,'Contains PII':false}))
  setEditData(EditData =>({...EditData,'Encrypted':false}))
  setEditData(EditData =>({...EditData,'Storage':""}))
  setEditData(EditData =>({...EditData,'Source Type':""}))
  setEditData(EditData =>({...EditData,'Link':""}))
  setEditData(EditData =>({...EditData,'User Name':""}))
  setEditData(EditData =>({...EditData,'Password':""}))
  setEditData(EditData =>({...EditData,'LinkRefCode':""}))
  setEditData(EditData =>({...EditData,'LinkReadme':""}))
  setEditData(EditData =>({...EditData,'quality':""}))
  setEditData(EditData =>({...EditData,'VersionId':""}))
  setEditData(EditData =>({...EditData,'Tables':[]}))
  setEditData(EditData =>({...EditData,'Archetype':""}))
  setEditData(EditData =>({...EditData,'Subtype':""}))
}
export default function DPEditForm (props){
  //inserts or updates a document in OpenSearch index
  console.log("EDITTTTTTTTTTTTT Form", props)
  const EditData = props.EditData
  const setEditData = props.setEditData
  const editing = props.editing
  const setEditing = props.setEditing
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
    
    var finalEditData = JSON.parse(JSON.stringify(EditData))
    finalEditData['Creation Date'] = dateStr
    finalEditData['Last Update Date'] = dateStr
    console.log("finalEditData EDDDIIITTTTT ",finalEditData)
    
    setEditing(true);
    var requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        redirect: 'follow',
        body: JSON.stringify(finalEditData)
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
        setEditing(false);
        console.log("Response from server",response)
        if (response["result"] === "created" || response["result"] === "updated"){
            setJsonFileContent(null)
            resetFields(EditData, setEditData)
            setDummyForceRefresh(!dummyForceRefresh)
        } else{
            alert("Failed to Edit data product.")
        }
      }
      )
      .catch(error=>{
        setEditing(false);
        console.log("Error in Editing data product")
        alert("Failed to Edit data product.")
      })
  }

  const handleFetchDPPreviewData = e =>{
    if( EditData['Link'] === ''){
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
    <form className="form" onSubmit={handleSubmit} id="editform">
      <div className="fields">
        <CssTextField id="product-name" required value={EditData['Product Name']} className='field' size='small' label="Name"
                                                    inputProps={{maxLength: 30}}
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
                                                      'Product Name':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the name for Data Product")}
                                                    onInput={e =>e.target.setCustomValidity("")}/>
        <CssTextField id="product-description"required value={EditData['Product Description']} className='field' multiline size='small' label="Description"  
                                                    inputProps={{maxLength: 100}}
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
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
                <AntSwitch checked={EditData['Contains PII']} inputProps={{ 'aria-label': 'ant design' }} 
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
                                                      'Contains PII':e.target.checked}))}/>
                <Typography component={'span'} variant="body2" color="text.secondary">Yes</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography component={'span'} variant="body2" color="text.secondary">
                  <Box  sx={{fontSize:14,fontWeight: 'bold',marginRight:'5px' }}>Encrypted</Box>
                </Typography>
                <Typography component={'span'} variant="body2" color="text.secondary">No</Typography>
                <AntSwitch checked={EditData['Encrypted']} inputProps={{ 'aria-label': 'ant design' }} 
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
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
              value={EditData['Storage']}
              label="Storage"
              onChange={(e) => 
                setEditData(EditData =>({
                ...EditData,
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
              value={EditData['Source Type']}
              label="Source Type"
              onChange={(e) => setEditData(EditData =>({
                ...EditData,
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
          <CssTextField id="link" required value={EditData['Link']} className='field' size='small' label="Storage URL" 
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
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
          <CssTextField id="user-name" required value={EditData['User Name']} name="somename" className='field' size='small' label="User Name" 
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
                                                      'User Name':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the user name for Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
          <CssTextField id="password" required value={EditData['Password']} className='field' size='small' label="Password" type='password' 
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
                                                      'Password':e.target.value}))}
                                                      autoComplete= 'new-password'
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the password for Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
        </Stack>
        <CssTextField id="link-ref-code" required value={EditData['LinkRefCode']} className='field' size='small' label="Reference Code URL" 
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
                                                      'LinkRefCode':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the URL to reference code for  Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
        <CssTextField id="link-readme" required value={EditData['LinkReadme']} className='field' size='small' label="Readme URL" 
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
                                                      'LinkReadme':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the URL to read me for Data Product")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
        <Stack direction="row" spacing={1} alignItems="center">
          <CssTextField id="owner-name" required  value={EditData['Product Owner']} name="somename" className='field' size='small' label="DP Owner Name" 
                                                    inputProps={{maxLength: 25}}
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
                                                      'Product Owner':e.target.value}))}
                                                    onInvalid={e => e.target.setCustomValidity("Please enter the name of Data Product owner")}
                                                    onInput={e => e.target.setCustomValidity("")}/>
          <CssTextField id="owner-email" disabled required value={EditData['Owner Email']} className='field' size='small' label="DP Owner Email" 
                                                    onChange={(e) => setEditData(EditData =>({
                                                      ...EditData,
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
                value={EditData['Archetype']}
                label="Archetype"
                onChange={(e) => {
                  setEditData(EditData =>({
                            ...EditData,
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
                value={EditData['Subtype']}
                label="Sub Type"
                onChange={(e) => 
                  setEditData(EditData =>({
                  ...EditData,
                  'Subtype':e.target.value}))
                }
                >
                {
                  getSubTypeList(EditData['Archetype']).map((subtype) => (
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