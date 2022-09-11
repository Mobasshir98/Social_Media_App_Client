import React from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";
import mydiarylogo from "../../images/mydiarylogo.png";
import {googleLogout } from '@react-oauth/google';
import mydiarytext from '../../images/mydiarytext.png'
import { Link, useHistory, useLocation} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory()
  const location = useLocation();
  const dispatch = useDispatch()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  
const logOut=()=>{
  googleLogout()
  dispatch({type:'LOGOUT'});
  history.push('/')
  setUser(null)
}
  useEffect(()=>{
    // const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])
  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to='/' className={classes.brandContainer}>
        <img src={mydiarytext} alt="icon" height='45px' />
        <img className={classes.image} src={mydiarylogo} alt="icon" height="45px" />
      </Link>
      <Toolbar className={classes.toolbar} >
        {user?(
            <div className={classes.profile} >
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture} >
                    {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant='h6'>
                    {user.result.name}
                </Typography>
                <Button variant="contained" className={classes.logout} onClick={logOut} color="secondary" >
                    Logout
                </Button>

            </div>
        ):(
            <Button component={Link} to="/auth" 
            variant="contained" color="primary"  >
                Sign In
            </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
