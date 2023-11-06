import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = useCallback(() => setAnchorEl(null));
  const handleLogout = useCallback(() => {
    handleClose()
    props.actions.logout();
  });
  const changeLocationCallback = useCallback((path) => {
    handleClose()
    props.actions.changeNewLocation(path)
  });

  const addNew = () => changeLocationCallback('/new')
  const changeToDashboard = () => changeLocationCallback('/dashboard')

  return (
    <div style={{ position: 'realtive', float: 'right' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Logged as: {props.name}</MenuItem>
        <MenuItem onClick={addNew}>Add new appointment</MenuItem>
        <MenuItem onClick={changeToDashboard}>Dashboard</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default BasicMenu
