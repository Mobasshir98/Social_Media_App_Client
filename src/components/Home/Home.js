import React ,{useState,useEffect } from 'react'
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from '../posts/Posts';
// import { useHistory,useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import useStyles from "../../styles"
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";


const Home = () => {
const dispatch = useDispatch();
const classes=useStyles()
  const [currentId, setcurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
        <Container maxWidth="xl" >
          <Grid
            className={classes.gridContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={6}  md={9}>
              <Posts setcurrentId={setcurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} >

              <Form currentId={currentId} setcurrentId={setcurrentId} />
             
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home