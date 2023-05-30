import React from "react";
import { useEffect, useState,useReducer } from "react";
import { Outlet } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  styled,
} from '@mui/material';
import { makeStyles } from "@mui/styles";

import { SearchOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import { DPCardsView } from './DPCardsView'
import {default as DPCatagoriesList } from './DPCategoriesList'

import DPView from "./DPView";
import { URL_STR } from "./constants"
///////////////////
import DPPublishTableView from './DPPublishTableView';
import DPPublishPreviewTable from "./DPPublishPreviewTable"
import DPEditForm from './DPEditForm'
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { green } from '@mui/material/colors';

import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import CloudUploadIcon  from '@mui/icons-material/CloudUpload';

import Stack from '@mui/material/Stack';

///////////////////
export const viewTypes = ["cardview", "propertiesview", "editdp"]
//const viewTypes = ["editdp","viewdp","editdp"];
/////////////// Edit Delete DP
const editDataInitialValues = {
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

///////////////////

const SearchContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "0",
  border: "none",
  outline: "none",
  marginLeft: "5px",
  width: "100%",
  display: "flex",
  alignItems: "x`",
  height: 64,
}));

const SearchInput = styled("input")(({ theme }) => ({
  width: "73%",
  fontSize: "1rem",
  border: "none",
  outline: "none",
  //background:"#0D9F98",
  paddingLeft: "5px",
  height: "calc(100% - 15px)",
  borderBottom: ' 2px #B0EADE solid',
}));

const StyledBox = styled(Box)(({ theme, ellipsis }) => ({

  whiteSpace: ellipsis ? 'nowrap' : 'normal',
  overflow: ellipsis ? 'hidden' : '',
  textOverflow: ellipsis ? 'ellipsis' : '',
}));

const DataProducts = (props) => {
 ////////////////  Edit Delete dp
 const [editing, setEditing] = useState(false);
 const [disableSubtype,setDisableSubtype] = useState(false);
 
 //get list of edited data products for the current userfrom OpenSearch index

 
 
 
 //////////////
  const [loading, setLoading] = useState(false);
  const [dpList, setDpList] = useState([]);
  const [dpSearchList, setDpSearchList] = useState([]);
  const [error, setError] = useState({});
  const [checked, setChecked] = useState([]);
  const [isActive, setActive] = useState([]);
  const [activeDp, setActiveDPId] = useState(-1);
  const [activeView, setViewType] = useState(viewTypes[0]);	//default view is card view
  const [dpData, setDpData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [disabledCatList, setDisabledCatList] = useState(false)
  const [searchStr, setSearchStr] = useState("")
  const [open, setOpen] = useState(false);
 
  const toggle = () => {
    setOpen(!open);
    ////console.log("Toggle")
   
    setSearchTerm("")
    setSearchStr("")
    setDpSearchList([])
  };
  /////////// Edit Delete DP
  const [jsonFileContent, setJsonFileContent] = useState(null);
  //retrieve the current user's email id
  const [ user,setUser ] = useState(null);
 
  editDataInitialValues["Owner Email"] =  "askvelu@gmail.com";
  const [EditData, setEditData] = useState(editDataInitialValues)
  //it was not resetting the content, when we were moving away while editing and coming back
  //hence this below piece of code... todo : need to check this
  /*const location = useLocation();
  useEffect(() => {
    if(location['pathname'] !== '/dpedit'){
      //if (getPathSameStatus() === false){  //if the nav bar menu "edit" is clicked again, do not reset the fields
        ////console.log("url changed",location['pathname'],location)
        resetFields(EditData,setEditData)
        setActiveDPId(-1)
        setViewType(viewTypes[0])
     // }
    }
  }, [location]);
  useEffect(() => {
    //console.log(">>>>>>>>>>>>>>>> DPPUBLISH");
    //console.log(props["user"]?.email);
    setUser(props["user"]?.email);
  }, [props["user"]?.email]);
*/
  
  
  const [deleteDP,setDeleteDP] = useState(false)
  const [deleteID,setDeleteID] = useState(null)
  
  const [dummyForceRefresh,setDummyForceRefresh] = useState(false)
  const [fetchDPPreviewData,setFetchDPPreviewData] = useState(false)
  const [dpPreviewData,setDpPreviewData] = useState([])

  // retrieve the list of data products edited by the current user
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

  useEffect(() => {
    ////console.log("in useeffect fetchdplist")
    setLoading(true);
   }, []);
  
  
  //retrieve the selected data product
  useEffect(()=>{
    ////console.log("in activedp useeffect")
    if(activeDp !== -1){ //-1 means nothing has been selected
      //console.log("fetching document")

      //retrieve the data product
      const fetchDP = async () =>{
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
          };
        var urlstr = URL_STR+'get-document?id='+activeDp.toString()
        var url = new URL(urlstr)

        try {
          fetch(url,requestOptions)
            .then((res) => res.json())
            .then((doc) => {
              setLoading(false);
              ////console.log(doc['_source'])
              ////console.log(doc)
              setDpData(doc['_source'])
            });
        } catch (error) {
          //console.log("error",error)
          setLoading(false);
          setError(error);
        }
      }
      setLoading(true);
      fetchDP();
    } else{
      setViewType(viewTypes[0])
    }
  },[activeDp])

  //when DP is fetched from server, change the view type automatically to DP view
  useEffect(()=>{ 
    //console.log("in useeffect dpdata1",dpData)
    if( dpData.length !== 0){
      ////console.log("in useeffect dpdata2")
      setViewType(viewTypes[1])

      //update the read data to EditData to enable editing if needed
      /*
      EditData['Product Name'] = dpData['Product Name']
      EditData['Product Description'] = dpData['Product Description']
      EditData['Contains PII'] = dpData['Contains PII']
      EditData['Encrypted'] = dpData['Encrypted']
      EditData['Storage'] = dpData['Storage']
      EditData['Source Type'] = dpData['Source Type']
      EditData['Link'] = dpData['Link']
      EditData['User Name'] = dpData['User Name']
      EditData['Password'] = dpData['Password']
      EditData['LinkRefCode'] = dpData['LinkRefCode']
      EditData['LinkReadme'] = dpData['LinkReadme']
      EditData['Product Owner'] = dpData['Product Owner']
      EditData['Tables'] = dpData['Tables']
      EditData['Archetype'] = dpData['Archetype']
      */
      setEditData(dpData)
      if (getSubTypeCount(dpData['Archetype']) === 1){
        setDisableSubtype(true)
      } else{
        setDisableSubtype(false)
      }
      forceUpdate();
    }
  },[dpData])
  
  //reset the field contents when view type changes to new DP edit
  useEffect(() =>{ 
    //console.log("in DP activeView useeffect",activeView)
    if( activeView === viewTypes[0]){
      resetFields(EditData,setEditData)
      setLoading(true);
      fetchDPList();
      setActiveDPId(-1)
    }
  },[activeView])

  useEffect(() => {
    ////console.log("inuseeffect setviewtype")
    const close = (e) => {
        if(e.key === 'Escape'){ //go back to product card view
          setViewType(viewTypes[0])
        }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[setViewType])

  //reset the field contents when view type changes to new DP edit
  useEffect(() =>{ 
    //console.log("in dummy useeffect")
    resetFields(EditData,setEditData)
    setLoading(true);
    fetchDPList();
    setActiveDPId(-1)
  },[dummyForceRefresh])
  
  //arrives here when we prss Delete button in dp view page
  useEffect(()=>{
    if( activeDp !== -1){
      //console.log("about to delete")
      //console.log("fetching document")

      //retrieve the data product
      const deleteDP = async () =>{
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
          };
        var urlstr = URL_STR+'delete-document?id='+activeDp.toString()
        //console.log("activeDP to string", urlstr)
        var url = new URL(urlstr)

        try {
          fetch(url,requestOptions)
            .then((res) => res.json())
            .then((res) => {
              setLoading(false);
              setDeleteDP(false)
              //console.log(res)
            });
        } catch (error) {
          //console.log("error",error)
          setLoading(false);
          setError(error);
        }
      }
      resetFields(EditData,setEditData)
      setLoading(true);      
      deleteDP();
      //console.log("DELETE active DP", activeDp)
      setDeleteID(activeDp)
      setDummyForceRefresh(!dummyForceRefresh)
      //console.log("REACHED HEEEREEE RAVLEEN")
          
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
    const bucketName = EditData['Link'].split('/').slice(0,-1).join('/')
    const fileKey = EditData['Link'].split('/').pop()

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
          //console.log(data)
          setDpPreviewData(data)
          setLoading(false);
        });
    } catch (error) {
      //console.log("error",error)
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
      setEditData(EditData =>({...EditData,'Tables':dpPreviewData}))
    }
  },[dpPreviewData]);

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(()=>{
      if( jsonFileContent !== null){
          //console.log("here")
          jsonFileContent["Owner Email"] = editDataInitialValues["Owner Email"]
          setEditData(jsonFileContent)

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
    ...(editing && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  function renderAttributesView(dpData,setJsonFileContent){
    if(dpData["Tables"].length === 0){
      //console.log("renderAttributesView---------->", dpData)
      return(
        <></>
      )
    } else{
      return(
        <>
        <div className="dpeditdata">
          <DPPublishTableView dpData={dpData}>
          </DPPublishTableView>
          <DPPublishPreviewTable dpData={dpData}>
          </DPPublishPreviewTable>
        </div>
        </>
      )
    }
  }  
  ////////////////
  function clickSearch() {
    if (searchStr !== "") {
      setSearchTerm(searchStr)
      setOpen(!open)
      //setSearchStr("")
    } 
   
  }
  //get list of available data products
  const fetchDPList = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    var urlstr = URL_STR + 'get-document-list'
    var url = new URL(urlstr)

    try {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((hits) => {
          var docs = [];
          hits["hits"]["hits"].forEach(element => {
            docs.push(
              {
                "Id": element["_id"], "Name": element["fields"]["Product Name"][0],
                "Archetype": element["fields"]["Archetype"][0], "Subtype": element["fields"]["Subtype"][0]
              }
            )
          });
          //console.log("DP LIST",docs)//HACK
        
          setLoading(false);
          setDpList(docs)
        });
    } catch (error) {
      ////console.log("error", error)
      setLoading(false);
      setError(error);
      setDpList([])
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchDPList();
    ////console.log("111111111111111")
  }, []);

  //do the search
  const searchDP = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    var urlstr = URL_STR + 'search?searchstring=' + searchTerm.toString()
    var url = new URL(urlstr)

    try {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((hits) => {
          var docs = [];
          hits["hits"]["hits"].forEach(element => {
            docs.push(
              {
                "Id": element["_id"], "Name": element["fields"]["Product Name"][0],
                "Archetype": element["fields"]["Archetype"][0], "Subtype": element["fields"]["Subtype"][0]
              }
            )
          });
          ////console.log(docs)
          setLoading(false);
          setDpSearchList(docs)
          setDisabledCatList(true)
        });
    } catch (error) {
      ////console.log("error", error)
      setDpSearchList([])
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    if (searchTerm !== "") {
      ////console.log("search term changed", searchTerm)
      setLoading(true);
      searchDP();
    }
  }, [searchTerm]);

  //retrieve the selected data product
  useEffect(() => {

    if (activeDp !== -1) { //-1 means nothing has been selected

      //retrieve the data product
      ////console.log("222222222222")
      const fetchDP = async () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        var urlstr = URL_STR + '/get-document?id=' + activeDp.toString()
        var url = new URL(urlstr)

        try {
          fetch(url, requestOptions)
            .then((res) => res.json())
            .then((doc) => {
              setLoading(false);
              //console.log("activeDp",activeDp)
              //console.log(doc['_source'])
              setDpData(doc['_source'])
            });
        } catch (error) {
          ////console.log("error", error)
          ////console.log("444444444444444")
          setLoading(false);
          setError(error);
        }
      }
      setLoading(true);
      fetchDP();
    } else {
      setViewType(viewTypes[0])
    }
  }, [activeDp])

  useEffect(() => {
    if (dpData?.length !== 0 || activeDp != -1) {
      setViewType(viewTypes[1])
      //console.log("dpData",dpData)
    }
  }, [dpData]);

  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') { //go back to product card view
        setActiveDPId(-1)
        setViewType(viewTypes[0])
        ////console.log("6666666666666666")
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [setViewType])

  useEffect(() => {
    if (dpSearchList.length === 0) {
      setDisabledCatList(false)
      setSearchTerm("")
      ////console.log("777777777777")
    }
  }, [dpSearchList])
  const renderView = (activeView) => {
    ////console.log("grid view", checked,activeView)
    switch (activeView) {
      case viewTypes[0]:
        return (
          <><Divider />
            <div className="dpsearch">
              <SearchContainer>
                <SearchInput type="text" placeholder="SEARCH FOR DATA PRODUCTS" onClick={(e) => clickSearch(e.target.value)}
                  label="SEARCH FOR DATA PRODUCTS"
                  value={searchStr}
                  onChange={(e) => setSearchStr(e.target.value)}
                  onKeyDown={
                    (e) => {
                      if (e.key === "Enter" && e.target.value !== "") {
                        clickSearch()
                      }
                    }
                  } />
                {!open && (
                  <IconButton
                    className="closeicon"
                    size="small"
                    sx={{
                      width: "50px",
                      height: "50px",
                      marginLeft: "5px",
                      marginTop: "2px",
                      backgroundColor: "rgb(226, 222, 222)",
                      color: '#0D9F98',
                    }}
                    onClick={(e) => {
                      if (e.target.value !== "")
                        clickSearch()
                    }
                    }
                  >
                    <SearchOutlined />
                  </IconButton>
                )}

                {open && (
                  <IconButton
                    className="closeicon"
                    size="small"
                    sx={{
                      width: "50px",
                      height: "50px",
                      marginLeft: "5px",
                      marginTop: "2px",
                      backgroundColor: "rgb(226, 222, 222)",
                      color: '#0D9F98',
                    }}
                    onClick={toggle}
                  >
                    <CloseIcon fontSize="small">Close</CloseIcon>
                  </IconButton>
                )}
              </SearchContainer>
              <DPCardsView checked={checked} deleteID={deleteID} isActive={isActive} dpList={dpList}
                dpSearchList={dpSearchList} setDpSearchList={setDpSearchList}
                activeDp={activeDp} setActiveDPId={setActiveDPId}
                activeView={activeView} setViewType={setViewType}
              /></div></>);

      case viewTypes[1]:
       return (
            
            <DPView dpData={dpData} dpID={activeDp} setActiveDPId={setActiveDPId} setViewType={setViewType} viewTypes={viewTypes} setDeleteDP={setDeleteDP}
              showDeleteButton={true} showEditButton={true} showCloseButton={true} />
          )
      case viewTypes[2]:
        return(      
           <div>
             <div className="dpeditpage">
             <div className="dpeditview">
               {/*<h4 className='title'> Edit data product</h4>*/}
               <div>
               <Box className="dppropstitletext">Edit data product</Box>
               <IconButton className='closeicon' size="small" 
                                     sx={{width:'26px',height:'26px',alignItem:'right',marginRight:'5px',marginTop:'1px',backgroundColor:'rgb(226, 222, 222)',color:'rgb(25,118,210)'}}
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
               <DPEditForm 
                 EditData={EditData} 
                 setEditData={setEditData} 
                 setJsonFileContent={setJsonFileContent}
                 editing = {editing}
                 setEditing = {setEditing}
                 disableSubtype = {disableSubtype}
                 setDisableSubtype = {setDisableSubtype}
                 dpID = {activeDp}
                 dummyForceRefresh = {dummyForceRefresh}
                 setDummyForceRefresh = {setDummyForceRefresh}
                 setFetchDPPreviewData = {setFetchDPPreviewData}
               />
               {renderAttributesView(EditData)}
             </Stack>
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center" }}>
               <Box sx={{ m: 1, position: 'relative' }}>
                 <Fab
                   type="submit"
                   form="editform"
                   aria-label="save"
                   color="primary"
                   sx={buttonSx}
                 >
                   {editing ? <CheckIcon /> : <CloudUploadIcon />}
                 </Fab>
                 {editing && (
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
                 <Button type="submit" variant="contained" disabled={editing} color="primary" form="editform" >
                   Update
                 </Button>                
                 {editing && (
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
           </div></div>
           
         )
      default:
        //console.log("default case---->")
        return (<></>)
    }
  }
  return (
    <>
      <div className="dpcatlistpage" style={{ borderTop: ' 3px #B0EADE solid' }}>
        {/* loading progress bar */}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" className='backdrop-progress' />
        </Backdrop>

        <DPCatagoriesList
          checked={checked} setChecked={setChecked} 
          isActive={isActive} setActive={setActive}
        >
        </DPCatagoriesList>

        {checked.length > 0 ?
          <>{renderView(activeView)}</> : <div className="dpdefault"></div>}

        <Outlet />
      </div>
    </>
  );
};
export default DataProducts;
