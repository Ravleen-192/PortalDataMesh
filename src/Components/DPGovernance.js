import React from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { TextField } from "@mui/material";
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemButton from '@mui/material/ListItemButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Avatar,
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,

} from '@mui/material';
import { Stack } from "@mui/material";
import IconLabelTabs from "./tabber";
import Breadcrumb from './Breadcrumb'
import SimpleCard from './SimpleCard'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Divider from '@mui/material/Divider';
import { SearchOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { getArchetypeList } from "../Data/ReadTableData";
import { DPCardsView } from './DPCardsView'

import DPView from "./DPView";
import { URL_STR } from "./constants"

import clsx from 'clsx';
export const viewTypes = ["cardview", "propertiesview"]
const Container = styled("div")(({ theme }) => ({
  margin: "20px",
  marginTop: "80px",
  top: "0",
  marginBottom: "30px",
  height: "calc(100% - 15px)",

}
));
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
  //background:"#87def4",
  paddingLeft: "5px",
  height: "calc(100% - 15px)",
  borderBottom: ' 2px #37ABC8 solid',
}));

const StyledBox = styled(Box)(({ theme, textTransformStyle, ellipsis }) => ({
  textTransform: textTransformStyle || 'none',
  whiteSpace: ellipsis ? 'nowrap' : 'normal',
  overflow: ellipsis ? 'hidden' : '',
  textOverflow: ellipsis ? 'ellipsis' : '',
}));
const Paragraph = ({ children, className, ellipsis, textTransform, ...props }) => {
  return (
    <StyledBox
      textTransformStyle={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || '']: true,
      })}
      component="p"
      mb={0}
      mt={0}
      fontSize="14px"
      {...props}
    >
      {children}
    </StyledBox>
  );
};
const DPCatagoriesList = (props) => {
  const checked = props.checked
  const isActive = props.isActive
  const setActive = props.setActive
  const setChecked = props.setChecked
  const setSearchTerm = props.setSearchTerm
  const archetypeList = getArchetypeList();

  const [itemsel, setitemsel] = useState('');
  const [disabled, setDisabled] = useState(true)
  const disabledCatList = props.disabledCatList
  const setDisabledCatList = props.setDisabledCatList

  const toggleActive = (i, Archetype) => {

    /* if (i === isActive)
       setActive(-1);
     else setActive(i);
     setitemsel(i);*/
    const currentIndex = isActive.indexOf(i);
    const newActive = [...isActive];

    if (currentIndex === -1) {
      newActive.push(i);
    } else {
      newActive.splice(currentIndex, 1);
    }
    const itemsel = newActive.sort(function (a, b) { return a - b; });
    //console.log("ToggleActive", itemsel)
    setActive(itemsel);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    const sortedChecked = newChecked.sort(function (a, b) { return a - b; });

    setChecked(sortedChecked);
  };


  const CustomListItem = (props) => {
    return (
      <ListItem className="items" key={props.index} >
        <ListItemButton className="dpcatlistbutton" role={undefined} onClick={handleToggle(props.index)} >
          <Checkbox sx={{ paddingRight: 1, paddingLeft: 0 }}
            edge="start"
            checked={checked.indexOf(props.index) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': props.index }}
          />
          <ListItemText sx={{ paddingLeft: 0 }} primary={props.title} />
        </ListItemButton>
      </ListItem>
    )
  };

  return (
    <div className="dpcatlist">

      {<List sx={{
        marginTop: "0px",

      }}>

        <ListItem className="items" sx={{ justifyContent: 'center', borderBottom: ' 2px #37ABC8 solid' }}  >

          <ListItemText primary={"DOMAINS & DATA PRODUCTS"} />

        </ListItem>

      </List>}

      <Table>
        <TableBody>
          {archetypeList && archetypeList.map((list, index) => {
            return (<>
              {(isActive.indexOf(index) === -1) ?
                <TableRow hover key={index} style={{ height: '20', background: '#87def4' }} onClick={() => toggleActive(index, list.Archetype)} >
                  <TableCell align="left" sx={{ padding: '8px', justifyContent: 'left' }} colSpan={2}>

                    <ExpandMoreIcon />

                  </TableCell>
                  <TableCell align="left" colSpan={30} sx={{ padding: '8px', justifyContent: 'left' }} >
                    <strong>{list.Archetype}</strong>
                  </TableCell>
                </TableRow>
                : <>
                  <TableRow hover key={index} style={
                    { background: '#87def4' }} onClick={() => toggleActive(index)} >
                    <TableCell align="left" sx={{ padding: '8px', px: 0, justifyContent: 'left' }} colSpan={2}>
                      <ExpandLessIcon />
                    </TableCell>
                    <TableCell align="left" colSpan={8} sx={{ padding: '8px', px: 0 }}>
                      <strong>{list.Archetype}</strong>
                    </TableCell>

                  </TableRow>
                  {list.children.map((item, key) => {
                    //console.log("chchcchchchch", key, item.id)
                    return (

                      <TableRow hover key={item.id} role={undefined} onClick={handleToggle(item.id)}>
                        <TableCell align="center" colSpan={2} sx={{ padding: '8px', px: 0 }}>
                          <Checkbox sx={{ paddingLeft: 2 }}
                            edge="start"
                            checked={checked.indexOf(item.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': item.id }}
                          />
                        </TableCell>
                        <TableCell align="center" colSpan={2} sx={{ padding: '8px', px: 0 }}>
                          <Avatar src={item.Subtypes[0].Icon} />
                        </TableCell>
                        <TableCell align="center" colSpan={4} sx={{ padding: '8px', px: 0, textTransform: 'capitalize' }}>
                          <Box display="flex" alignItems="left">
                            <Paragraph>{item.Archetype}</Paragraph>
                          </Box>
                        </TableCell>


                      </TableRow>
                    );
                  })}

                </>}


              <Divider />
            </>);


          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default function DPGovernance() {

  const [loading, setLoading] = useState(false);
  const [dpList, setDpList] = useState([]);
  const [dpSearchList, setDpSearchList] = useState([]);
  const [error, setError] = useState({});
  const [checked, setChecked] = useState([]);
  const [isActive, setActive] = useState([]);
  const [activeDp, setActiveDp] = useState(-1);
  const [activeView, setActiveView] = useState(viewTypes[0]);	//default view is card view
  const [dpData, setDpData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [disabledCatList, setDisabledCatList] = useState(false)
  const [searchStr, setSearchStr] = useState("")
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
    console.log("Toggle")
    setSearchTerm("")
    setSearchStr("")
    setDpSearchList([])
  };
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
          //console.log(docs)
          setLoading(false);
          setDpList(docs)
        });
    } catch (error) {
      //console.log("error", error)
      setLoading(false);
      setError(error);
      setDpList([])
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchDPList();
    //console.log("111111111111111")
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
          //console.log(docs)
          setLoading(false);
          setDpSearchList(docs)
          setDisabledCatList(true)
        });
    } catch (error) {
      //console.log("error", error)
      setDpSearchList([])
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    if (searchTerm !== "") {
      console.log("search term changed", searchTerm)
      setLoading(true);
      searchDP();
    }
  }, [searchTerm]);

  //retrieve the selected data product
  useEffect(() => {

    if (activeDp !== -1) { //-1 means nothing has been selected

      //retrieve the data product
      //console.log("222222222222")
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
              //console.log("33333333333333333333")
              //console.log(doc['_source'])
              setDpData(doc['_source'])
            });
        } catch (error) {
          //console.log("error", error)
          //console.log("444444444444444")
          setLoading(false);
          setError(error);
        }
      }
      setLoading(true);
      fetchDP();
    } else {
      setActiveView(viewTypes[0])
    }
  }, [activeDp])

  useEffect(() => {
    if (dpData.length !== 0 || activeDp != -1) {
      setActiveView(viewTypes[1])
      //console.log("55555555555555")
    }
  }, [dpData]);

  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') { //go back to product card view
        setActiveDp(-1)
        setActiveView(viewTypes[0])
        //console.log("6666666666666666")
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [setActiveView])

  useEffect(() => {
    if (dpSearchList.length === 0) {
      setDisabledCatList(false)
      setSearchTerm("")
      //console.log("777777777777")
    }
  }, [dpSearchList])
  const renderView = (activeView) => {
    //console.log("grid view", checked,activeView)

    switch (activeView) {
      case viewTypes[0]:
        {

          return (
            <div className="dpsearch">
              {/*<SearchContainer>
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
                      color: '#87def4',
                    }}
                    onClick={ (e) =>{
                      if(e.target.value !== "")
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
                      color: '#87def4',
                    }}
                    onClick={toggle}
                  >
                    <CloseIcon fontSize="small">Close</CloseIcon>
                  </IconButton>
                )}
                  </SearchContainer>*/}
              {/*    <Container>
      

      <Stack spacing={3}>
        <SimpleCard >
          <IconLabelTabs />
        </SimpleCard>
      </Stack>
                </Container>*/}

              <Stack >
                <SimpleCard >
                  <IconLabelTabs />
                </SimpleCard>
              </Stack>
            </div>);
        }

      default:
        //console.log("default case---->")
        return (<></>)
    }
  }
  return (
    <>
      <div className="dpcatlistpage">
        {/* loading progress bar */}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" className='backdrop-progress' />
        </Backdrop>

        <DPCatagoriesList
          checked={checked} setChecked={setChecked}
          isActive={isActive} setActive={setActive}
          setSearchTerm={setSearchTerm}
          disabledCatList={disabledCatList}
          setDisabledCatList={setDisabledCatList}
        >
        </DPCatagoriesList>

        {renderView(activeView)}

        <Outlet />
      </div>
    </>
  );
};

