import React from "react";
import {  useState } from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { makeStyles } from "@mui/styles";
import { getArchetypeList } from "../Data/ReadTableData";
import {navigations} from '../navigations'

export const viewTypes = ["cardview", "propertiesview"]

const FilterCtrl = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  border: '1px #B0EADE',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
  '&:hover': {
    backgroundColor: "#0a7772"
  }
}));

const FilterInput = styled('input')(({ theme }) => ({
  width: '80%',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  paddingLeft: '20px',
  marginBottom: '2px',
  height: '40px',
  alignItems: 'left',
  background: "transparent",
  color: '#ece3e3',
  '&::placeholder': { color: "#ece3e3" },
  '&:hover': {
    backgroundColor: "#0a7772"
  }
}));

const DPCatagoriesList = (props) => {
  const checked = props.checked
  const isActive = props.isActive
  const setActive = props.setActive
  const navigate = useNavigate();
  const [isnavActive, setnavActive] = useState(-1);
  const [isDP, setisDP]= useState('false');
  const setChecked = props.setChecked
  const archetypeList = getArchetypeList();
  const [navitemsel, setnavitemsel] = useState(-1);
  const [query, setquery] = useState("");
  
const toggleActive = (i, Archetype) => {
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
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    setquery(value);
    if(value.length>0)
      setisDP('true');
    //console.log(value);
  };
  const togglenavActive= (i) => {
    if (i === isnavActive){
      //console.log("HEEEEREEEE",isnavActive)
      setnavActive(-1);    
      setnavitemsel(-1);  
    }
    else {
      //console.log("HEEEEREEEE222222222222",isnavActive)
      setnavActive(i);
      setnavitemsel(i);
      setisDP('false');      
    }
 }
  
  const handlenavToggle = (value, i) => () => {
   console.log("NAVIGATE", value.path)
    togglenavActive(i);
    if(value.type==='leaf')
     navigate(value.path)
      
   if(value.type==='sub' && i === isnavActive){
      setisDP('false');
    }
    else if(value.type==='sub'&& i !== isnavActive)
     {
     navigate(value.path)
     setisDP('true');
    }
    
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
  
 return (
    <div className="dpcatlist" >

      <FilterCtrl sx={{ marginLeft: "15px" }}>
        <FilterListIcon sx={{ color: "#ece3e3" }} />
        <FilterInput type="text" placeholder="Filter navigator" autoFocus onChange={(event) => handleSearch(event)} />
      </FilterCtrl>

      <Table>
        <TableBody style={{ width: '100%' }}>
        {navigations?.map((list, nindex) => {
          //console.log("children ",list.name,list?.children?.filter(DataSource => DataSource.name.toLowerCase().includes(query)).length>0)
          
          //console.log("name ",list.name,(list.name.toLowerCase().includes(query)))
            return (<>
              {(nindex !== navitemsel) && ((list.name.toLowerCase().includes(query)) || (list?.children?.filter(DataSource => DataSource.name.toLowerCase().includes(query)).length>0 ))?
                
                  <TableRow key={nindex} sx={{
                  width: '100%', backgroundColor: '#0D9F98', border: 'none',
                  '&:hover': {
                    backgroundColor: "#0a7772"
                  }
                }} style={{ height: '20', }} onClick={handlenavToggle(list,nindex )} >
                  <TableCell align="left" sx={{ color: '#ece3e3', padding: '8px', justifyContent: 'left' }} colSpan={2}>
                  {(list.type!=='leaf')?<ArrowRightIcon />:null}
                  </TableCell>
                  <TableCell align="left" colSpan={30} sx={{ color: '#ece3e3', padding: '8px', justifyContent: 'left', textOverflow: 'hidden' }} >
                    <Typography sx={{textAlign:'left'}}>
                      <strong>{list.name}</strong>
                    </Typography>

                  </TableCell>
                </TableRow>
                : <>
                  { (list?.name?.toLowerCase().includes(query))|| (list?.children?.filter(DataSource => DataSource.name.toLowerCase().includes(query)).length>0)?
                    <TableRow key={nindex} sx={{
                      width: '100%', backgroundColor: '#0D9F98', border: 'none',
                      '&:hover': {
                        backgroundColor: "#0a7772"
                      }
                    }} style={{ height: '20', }} onClick={handlenavToggle(list, nindex)}>
                      <TableCell align="left" sx={{ color: '#ece3e3', padding: '8px', px: 0, justifyContent: 'left' }} colSpan={2}>
                      {(list.type!=='leaf')?<ArrowDropDownIcon />:null} 
                      </TableCell>
                      <TableCell align="left" colSpan={8} sx={{ color: '#ece3e3', padding: '8px', px: 0, textOverflow: 'hidden' }}>
                        <Typography sx={{textAlign:'left'}}>
                          <strong>{list.name}</strong>
                        </Typography>
                      </TableCell>

                  </TableRow>:null}
                 
                  {list?.children?.filter(DataSource => DataSource.name.toLowerCase().includes(query)).map((itemnav, key) => {
                     return (
                      <>
                        <TableRow key={itemnav.id} sx={{
                          width: '100%',
                          backgroundColor: checked.indexOf(itemnav.id) !== -1 ? "#0a8e87" : "#B0EADE",

                          '&:hover': {
                            backgroundColor:checked.indexOf(itemnav.id) !== -1 ? "#0a8e87" : "#80e6d2"
                          }
                        }} style={{ height: '20', }} role={undefined} onClick={handlenavToggle(itemnav, -1)}>
                          <TableCell align="center" colSpan={2} sx={{ padding: '8px', px: 1 }}>

                          </TableCell>

                          <TableCell align="center" colSpan={4} sx={{ padding: '8px', px: 1, textTransform: 'capitalize', textOverflow: 'hidden' }}>
                            <Box display="flex" alignItems="left">
                              <Typography sx={{textAlign:'left'}}>
                                {itemnav.name}
                              </Typography>
                            </Box>
                          </TableCell>


                        </TableRow>

                      </>
                    );
                  })}

                </>}


              {/*} <Divider />*/}
            </>);


          })}
          {(isDP==='true') && archetypeList?.map((listarch, index) => {
                    
                    return (<>
                      {(isActive.indexOf(index) === -1) && (listarch.Archetype.toLowerCase().includes(query)||(listarch.children.filter(DataSource => DataSource.Archetype.toLowerCase().includes(query))).length>0)?
                        <TableRow key={index} sx={{
                          width: '100%', backgroundColor: '#0D9F98', border: 'none',
                          '&:hover': {
                            backgroundColor: "#0a7772"
                          }
                        }} style={{ height: '20', }} onClick={() => toggleActive(index, listarch.Archetype)} >
                          <TableCell align="left" sx={{ color: '#ece3e3', padding: '8px', justifyContent: 'left' }} colSpan={2}>
                            <ArrowRightIcon />
                          </TableCell>
                          <TableCell align="left" colSpan={30} sx={{ color: '#ece3e3', padding: '8px', justifyContent: 'left', textOverflow: 'hidden' }} >
                            <Typography sx={{textAlign:'left'}}>
                              <strong>{listarch.Archetype}</strong>
                            </Typography>

                          </TableCell>
                        </TableRow>
                        : <>
                          {((listarch.Archetype.toLowerCase().includes(query))|| ((listarch.children.filter(DataSource => DataSource.Archetype.toLowerCase().includes(query))).length>0))?
                            <TableRow key={index} sx={{
                              width: '100%', backgroundColor: '#0D9F98', border: 'none',
                              '&:hover': {
                                backgroundColor: "#0a7772"
                              }
                            }} style={{ height: '20', }} onClick={() => toggleActive(index)} >
                            <TableCell align="left" sx={{ color: '#ece3e3', padding: '8px', px: 0, justifyContent: 'left' }} colSpan={2}>
                              <ArrowDropDownIcon />
                            </TableCell>
                            <TableCell align="left" colSpan={8} sx={{ color: '#ece3e3', padding: '8px', px: 0, textOverflow: 'hidden' }}>
                              <Typography sx={{textAlign:'left'}}>
                                <strong>{listarch.Archetype}</strong>
                              </Typography>
                            </TableCell>

                          </TableRow>:null}

                          {listarch.children.filter(DataSource => DataSource.Archetype.toLowerCase().includes(query)).map((item, key) => {
                           
                            return (
                              <>
                                <TableRow key={item.id} sx={{
                                  width: '100%',
                                  backgroundColor: checked.indexOf(item.id) !== -1 ? "#0a8e87" : "#B0EADE",

                                  '&:hover': {
                                    backgroundColor:checked.indexOf(item.id) !== -1 ? "#0a8e87" : "#80e6d2"
                                  }
                                }} style={{ height: '20', }} role={undefined} onClick={handleToggle(item.id)}>
                                  <TableCell align="center" colSpan={2} sx={{ padding: '8px', px: 1 }}>

                                  </TableCell>

                                  <TableCell align="center" colSpan={4} sx={{ padding: '8px', px: 1, textTransform: 'capitalize', textOverflow: 'hidden' }}>
                                    <Box display="flex" alignItems="left">
                                      <Typography  sx={{textAlign:'left'}}>
                                        {item.Archetype}
                                      </Typography>
                                      
                                    </Box>
                                  </TableCell>


                                </TableRow>

                              </>
                            );
                  })}

                </>}


              {/*} <Divider />*/}
            </>);


          })}
        </TableBody>
      </Table>
    </div>
  );
}
export default DPCatagoriesList;
