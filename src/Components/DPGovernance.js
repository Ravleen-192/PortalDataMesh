import React from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
 
  Box,
  styled,
  

} from '@mui/material';
import { Stack } from "@mui/material";
import IconLabelTabs from "./tabber";

import SimpleCard from './SimpleCard'

import DPCatagoriesList from './DPCategoriesList';


import { URL_STR } from "./constants"

import clsx from 'clsx';
export const viewTypes = ["cardview", "propertiesview"]


const StyledBox = styled(Box)(({ theme, textTransformStyle, ellipsis }) => ({
  textTransform: textTransformStyle || 'none',
  whiteSpace: ellipsis ? 'nowrap' : 'normal',
  overflow: ellipsis ? 'hidden' : '',
  textOverflow: ellipsis ? 'ellipsis' : '',
}));


export default function DPGovernance() {

  const [loading, setLoading] = useState(false);
  const [dpList, setDpList] = useState([]);
  const [dpSearchList, setDpSearchList] = useState([]);
  const [error, setError] = useState({});
  const [checked, setChecked] = useState([]);
  const [isActive, setActive] = useState([]);
  const [activeDp, setActiveDPId] = useState(-1);
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
        setActiveDPId(-1)
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
        >
        </DPCatagoriesList>

        {renderView(activeView)}

        <Outlet />
      </div>
    </>
  );
};

