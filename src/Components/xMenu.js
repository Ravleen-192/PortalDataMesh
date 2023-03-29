import React,  { Fragment, useState } from 'react';
import { Menu } from '@mui/material';
import { Box, styled } from '@mui/system';

const MenuButton = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  marginRight:'10px',
  color: 'black',
  '& div:hover': {
    backgroundColor: '#0D9F98',
  },
}));

const XMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const children = React.Children.toArray(props.children);
  let { shouldCloseOnItemClick = true, horizontalPosition = 'left' } = props;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <MenuButton onClick={handleClick}>{props.menuButton}</MenuButton>
      
        <Menu
          elevation={8}
          getContentAnchorEl={null}
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: horizontalPosition,
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: horizontalPosition,
          }}
        >
          {children.map((child, index) => (
            <div onClick={shouldCloseOnItemClick ? handleClose : () => {}} key={index}>
              {child}
            </div>
          ))}
        </Menu>
     
    </Fragment>
  );
};

export default XMenu;
