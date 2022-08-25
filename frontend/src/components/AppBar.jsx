import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar } from "@mui/material";

// import LogoSvg from '../static/logo.svg';
// import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';

export const AppBar = ({ pages }) => {
  // eslint-disable-next-line
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const[editopen, setEditopen] = React.useState(false);

  const handleClickEdit = () => {
    setEditopen(true);
    setAnchorEl(null);
  };

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setEditopen(false);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEditopen(false);
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) {
      navigate(path);
    }
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  const buttons = [
    <Button key="one">Name</Button>,
    <Button textAlign='right' key="two">Email</Button>,
    <Button key="three">Password</Button>,
  ];

  // const buttonsData = [
  //   <Button textAlign='right' key="one">{JSON.parse(window.localStorage.user).name}</Button>,
  //   <Button textAlign='right' key="two">{JSON.parse(window.localStorage.user).email}</Button>,
  //   <Button textAlign='right' key="three">***********</Button>,
  // ];

  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar sx={{ background:"#3a34d2", marginRight: "20px" }} variant="rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="none" viewBox="0 0 95 71">
                <rect width="16.811" height="68.926" x="0.664" y="7.769" fill="#fff" stroke="#fff" rx="8.406" transform="rotate(-25 .664 7.77)"></rect>
                <rect width="16.811" height="68.926" x="28.665" y="7.769" fill="#ff0000" stroke="#ff0000" rx="8.406" transform="rotate(-25 28.665 7.77)"></rect>
                <rect width="16.811" height="16.81" x="78.769" y="0.664" fill="#ff8c00" stroke="#ff8c00" rx="8.405" transform="rotate(25 78.77 .664)"></rect>
              </svg>
          </Avatar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            
            Sigma APIs Service
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Sigma Voice API Service
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages?.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleCloseNavMenu(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
            {!!user && (
              <div>
                {/* <Button
                  key={"logout"}
                  onClick={logout}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {"logout"}
                </Button> */}
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  > 
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Sigma Account</Typography>
                          <em>{JSON.parse(window.localStorage.user).name}</em>.<br />  
                          <em>{JSON.parse(window.localStorage.user).email}</em>
                        </React.Fragment>
                      }
                    >
                      <AccountCircle />
                    </HtmlTooltip>
                  </IconButton>
                    <Dialog open={Boolean(anchorEl)} onClose={handleClose} style={{padding: '3em'}}>
                      <DialogTitle textAlign='center'>Profile Info</DialogTitle>
                      {/* <AccountCircle /> */}
                      <hr/>
                      <Box
                        sx={{
                          display: 'flex',
                          '& > *': {
                            // m: 0,
                          },
                          textAlign: 'inherit',
                          p:3
                        }}
                      >
                      <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                        variant="contained"
                        
                      >
                        {buttons}
                      </ButtonGroup>
                      <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                      >
                        <Button textAlign='right' key="one">{JSON.parse(window.localStorage.user).name}</Button>
                        <Button textAlign='right' key="two">{JSON.parse(window.localStorage.user).email}</Button>
                        <Button textAlign='right' key="three">***********</Button>
                      </ButtonGroup>
                      </Box>
                      <hr/>
                      <DialogActions>
                      <Chip variant="outlined" label='Logout' color="info" onClick={logout}  />
                      <Chip variant="outlined" label='Cancel' color="info" onClick={handleClose}  />
                      <Chip variant="outlined" label='Edit Profile' color="info" onClick={handleClickEdit}  />
                        {/* <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClickEdit}>Edit Profile</Button> */}
                      </DialogActions>
                    </Dialog>
                    {/* Edit Dialog Page */}
                    <Dialog open={editopen} onClose={handleClose}>
                      <DialogTitle textAlign='center'>Upadte Profile</DialogTitle>
                      <hr />
                      <Box
                        sx={{
                          display: 'flex',
                          '& > *': {
                            // m: 0,
                          },
                          textAlign: 'inherit',
                          p:3
                        }}
                      >
                        <ButtonGroup
                          orientation="vertical"
                          aria-label="vertical outlined button group"
                          variant="contained"
                        > {buttons} </ButtonGroup>
                        <ButtonGroup
                          orientation="vertical"
                          aria-label="vertical contained button group"
                        > 
                          <Button textAlign='right' key="one">{JSON.parse(window.localStorage.user).name}</Button>
                          <Button textAlign='right' key="two">{JSON.parse(window.localStorage.user).email}</Button>
                          <Button textAlign='right' key="three">***********</Button>
                        </ButtonGroup>
                      </Box>
                      <hr />
                      <DialogActions>
                      <Chip variant="outlined" label='Back' color="info" onClick={handleMenu} />
                      <Chip variant="outlined" label='cancel' color="info" onClick={handleClose} />
                      <Chip variant="outlined" label='Update Profile' color="info" onClick={handleClickEdit} />
                        {/* <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClickEdit}>Update Profile</Button> */}
                      </DialogActions>
                    </Dialog>
              </div>
            )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
