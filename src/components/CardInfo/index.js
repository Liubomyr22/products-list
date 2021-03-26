import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    background: "gray",
    padding: theme.spacing(1.5),
    margin: '10%',
    maxWidth: "100%",
    height: "100%"
  },
  image: {
    maxWidth: 268,
    maxHeight: 268,
  },
  img: {
    margin: '0 auto',
    maxWidth: '100%',
  },
}));

const CardInfo = () => {

  const classes = useStyles();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Details page</h1>
      <div className={classes.root}>
        <Box style={{ width: "90%", display: "flex", justifyContent: "flex-end" }}>
          <NavLink style={{ textDecoration: "none" }} to="/">
            <Button style={{ background: "gray" }} variant="outlined" color="black" >
              Home
          </Button>
          </NavLink>
        </Box>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fLAeB1TsAYlJEPNRiOA73iWd4UOG_2-tiA&usqp=CAU" />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    Men's Watches
                </Typography>
                  <Box mt={4}></Box>
                  <Typography variant="body2" gutterBottom>
                    The Watch Shop Holdings Limited is authorised and regulated by the Financial Conduct Authority, and acts as a credit broker.
                    WatchShop is a trading name of The Watch Shop Holdings Limited.
                </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    WatchShop™ is a registered trademark © 2007 - 2021 All rights reserved
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">WatchShop.com is the UK's No. 1 </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

export default CardInfo;