import React from 'react';
import {TextField,InputAdornment,Box,AppBar,Toolbar,IconButton,Typography,Menu,Container,Avatar,Button,Tooltip,MenuItem} from '@mui/material';
import Badge from '@mui/material/Badge';

import SearchIcon from '@mui/icons-material/Search';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../react-redux/hooks/reduxHooks'
import { verifyLogout } from '../../react-redux/slices/actions/userActions';
import { deepPurple } from '@mui/material/colors';

const pages = ['Products'];
const loginRegister = ["Login","Register"]
const settings = ['Profile', 'Logout']


function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const {user} = useAppSelector(state=>state)
  const {cartItems} = useAppSelector(state=>state.cart)
  const {profile} = useAppSelector(state=>state.profile)

const dispatch = useAppDispatch()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  


  return (
    <AppBar position="static" sx={{position:"sticky"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => navigate("/")}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)} 
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {user?.decodedData?.role === "SuperAdmin" ? <>
                
              </> : pages.map((page) => (
                <MenuItem key={page} onClick={() => { handleCloseNavMenu(); navigate(`/${page.toLowerCase()}`); }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => navigate("/")}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(`/${page.toLowerCase()}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              sx={{ mr: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            /> */}
            {user?.isLogin ?
            <>

            {user.decodedData.role==="Customer" && <Tooltip title="Cart">
              <IconButton onClick={() => navigate("/cart")} size="large" aria-label="show 4 new mails" color="inherit">

              <Badge badgeContent={cartItems?.products?.length} color="error">
                <ShoppingCartIcon   />
</Badge>
              </IconButton>
            </Tooltip>}
             <Tooltip title="Open Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {profile?.profilePic ? <Avatar
              alt={profile?.username}
              src={profile?.profilePic}
              sx={{ width: 50, height: 50,}}
            /> : <Avatar sx={{ bgcolor: deepPurple[500], width: 50, height: 50 }}>
              {profile?.username?.charAt(0)?.toUpperCase()}
            </Avatar>}              </IconButton>
            </Tooltip>
            </> : <>
              {loginRegister.map((ele)=>(
                <MenuItem key={ele} onClick={() => {navigate(`/${ele.toLowerCase()}`) }}>
                <Typography textAlign="center">{ele}</Typography>
              </MenuItem>
              ))}
            </>}

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => { 
                  handleCloseUserMenu();
                  if(setting==="Logout"){
                    dispatch(verifyLogout())
                  } else{
                    navigate(`/${setting.toLowerCase()}`); 
                  }

                  }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header
