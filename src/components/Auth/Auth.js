import React,{useState} from 'react';
import {Avatar,Button,Paper,Grid, Typography, Container} from '@material-ui/core'
import useStyles from './styles'
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {signin,signup} from '../../actions/auth'
import Icon from './Icon';


const initialState = {firstName:"",lastName:"",email:"",password:"",confirmPassword:""}
const Auth = () => {
  const classes= useStyles();
  const history=useHistory()
  const [showPassword,setshowPassword]=useState(false);
  const [isSignup, setisSignup] = useState(false)
  const [formData,setformData]=useState(initialState);
  const dispatch = useDispatch()
  const handleShowPassword=()=>{
    setshowPassword((prev)=>!prev)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData,history))
    }
    else{
      dispatch(signin(formData,history))

    }

  }
  const handleChange=(e)=>{
    setformData({...formData,[e.target.name]:e.target.value})

  }
  const googleSuccess = async (res)=>{
    const result = jwt_decode(res?.credential)
    const token = res?.credential
    
    
    try{
      dispatch({type:'AUTH',data:{result,token}})
      history.push('/')
    }
    catch(err){
      console.log(err)
    }

  }
  const googleFailure=()=>{
    console.log("Google Sign In was unsuccessful. Try Again ")
  }
  const switchMode=()=>{
    setisSignup((prev)=>!prev)
    setshowPassword(false)

  }

  return (
    <Container   component="main"  maxWidth='xs' >
      <Paper  className={classes.paper} elevation={3} >
        <Avatar  className={classes.avatar} >
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant ='h5'>{isSignup?'Sign Up':'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            {
              isSignup&&(
                <>
                <Input name="firstName" label='First Name' handleChange={handleChange} autoFocus half/>
                <Input name="lastName" label='Last Name' handleChange={handleChange} half/>

                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type='email'/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword} />
            {
              isSignup&& <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type='password' />
            
            }
          </Grid>
          <GoogleLogin
          render={(renderProps)=>(
            <Button className={classes.googleButton} color='primary' fullWidth  onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'   >Google Sign In </Button>
          )}
           onSuccess={googleSuccess}
           onError={googleFailure}
           cookiePolicy='single_host_origin'/>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup?'Sign Up':'Sign In'}
          
          </Button>
          <Grid container justifyContent='flex-end' >
            <Grid item >
              <Button onClick={switchMode} >
                {isSignup?"Already have an account? Sign In":"Don't have an account? Sign Up"}
              </Button>

            </Grid>

          </Grid>
        </form>
      </Paper>

    </Container>
  )
}

export default Auth