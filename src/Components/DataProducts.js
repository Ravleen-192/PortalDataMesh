import React from "react";
import { useEffect, useState } from "react";
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

import clsx from 'clsx';
export const viewTypes = ["cardview", "propertiesview"]


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
    //console.log("Toggle")
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
          //console.log(docs)//HACK
        
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
      //console.log("search term changed", searchTerm)
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
    if (dpData?.length !== 0 || activeDp != -1) {
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
                      backgroundColor: "#0D9F98",
                      color: '#0D9F98',
                    }}
                    onClick={toggle}
                  >
                    <CloseIcon fontSize="small">Close</CloseIcon>
                  </IconButton>
                )}
              </SearchContainer>
              <DPCardsView checked={checked} isActive={isActive} dpList={dpList}
                dpSearchList={dpSearchList} setDpSearchList={setDpSearchList}
                activeDp={activeDp} setActiveDp={setActiveDp}
                activeView={activeView} setActiveView={setActiveView}
              /></div></>);

      case viewTypes[1]:
        //console.log("props view", activeDp)//HACK
        if (activeDp === 'ID') {
          setActiveView(viewTypes[0])
          return;
        }
        else//HACK
          return (
            <DPView dpData={dpData} dpID={activeDp} setActiveDPId={setActiveDp} setActiveView={setActiveView} viewTypes={viewTypes} setDeleteDP={null}
              showDeleteButton={false} showEditButton={false} showCloseButton={true} />
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
