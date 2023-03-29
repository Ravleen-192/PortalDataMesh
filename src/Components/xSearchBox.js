import React, { useState } from 'react';
import { Icon, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 400,
  width: '40%',
  display: 'flex',
  alignItems: 'center',
  height: 64,
 
}));

const SearchInput = styled('input')(({ theme }) => ({
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  paddingLeft: '20px',
  height: 'calc(100% - 5px)',
 
}));

const XSearchBox = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
     {!open && (
        
         <IconButton onClick={toggle}
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
        
       >
         <SearchOutlined />
       </IconButton>
      )}

      {open && (
        <SearchContainer>
          <SearchInput type="text" placeholder="Search here..." autoFocus />
          <IconButton onClick={toggle}
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
        
       >
            <CancelOutlinedIcon />
          </IconButton>
        </SearchContainer>
        )}
    </React.Fragment>
  );
};

export default XSearchBox;
