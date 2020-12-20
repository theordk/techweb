import { useContext } from 'react'
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Context from './Context'
// Layout
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';
import InstagramIcon from '@material-ui/icons/Instagram';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import GroupIcon from '@material-ui/icons/Group';
import CopyrightIcon from '@material-ui/icons/Copyright';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  footer: {
    background: theme.palette.primary.main,
    flexShrink: 0,
    overflow: "hidden",
    borderTop: "1px solid #3A5B7B"
  },
  paper: {
    padding: theme.spacing(0.5),
    background: theme.palette.primary.main,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    color: "white",
    fontWeight: "fontWeightBold"
  },
  wrapIcon: {
    verticalAlign: 'top',
    display: 'inline-flex',
    marginRight: 8,
    alignItems: "center",
    fontSize: "default"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5
  },
  elements: {
    marginTop: 5,
    fontSize: 10
  },
  copy: {
    fontSize: "small",
    verticalAlign: 'top',
    display: 'inline-flex',
    marginRight: 8,
    alignItems: "center",
  },
  dividerColor: {
    background: theme.palette.secondary.dark,
  }
}));

export default () => {
  const classes = useStyles();
  /* const oauth = useContext(Context) */
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  if (oauth) {
    return (
      <footer className={classes.footer}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography style={{ fontSize: 10 }}>
              <CopyrightIcon className={classes.copy}></CopyrightIcon>
                Copyright 2020 - Web Application on React
              </Typography>
          </Paper>
        </Grid>
      </footer>
    );
  } else {
    return (
      <footer className={classes.footer}>
        <div className={classes.root}>
          <Grid container spacing={1} direction="row" alignItems="center">
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <Typography className={classes.title}>
                  <GroupIcon className={classes.wrapIcon}></GroupIcon>
                  Team
                </Typography>
                <Divider classes={{ root: classes.dividerColor }} variant="middle"></Divider>
                <Typography className={classes.elements}>Victor Quidet | Théophile Tarbé</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <Typography className={classes.title}>
                  <PhoneIcon className={classes.wrapIcon}></PhoneIcon>
                  Contact Us
                </Typography>
                <Divider classes={{ root: classes.dividerColor }} variant="middle"></Divider>
                <Typography className={classes.elements}>+33 981507172</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <Typography className={classes.title}>
                  <ContactSupportIcon className={classes.wrapIcon}></ContactSupportIcon>
                  Email Us
                </Typography>
                <Divider classes={{ root: classes.dividerColor }} variant="middle"></Divider>
                <Typography className={classes.elements}>rdk@webtech.com</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <Typography className={classes.title}>
                  <LanguageIcon className={classes.wrapIcon}></LanguageIcon>
                  Follow Us
                </Typography>
                <Divider classes={{ root: classes.dividerColor }} variant="middle"></Divider>
                <Typography className={classes.elements}>
                  <FacebookIcon style={{ fontSize: "small" }}></FacebookIcon>
                  <InstagramIcon style={{ fontSize: "small" }}></InstagramIcon>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography style={{ fontSize: 10 }}>
                <CopyrightIcon className={classes.copy}></CopyrightIcon>
                Copyright 2020 - Web Application on React
              </Typography>
            </Paper>
          </Grid>
        </div>
      </footer>
    );
  }
}

