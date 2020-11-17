import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/* const styles = {
  footer: {
    height: '30px',
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
} */

const useStyles = makeStyles({
  titleStyles: {
    color: "white",
    fontSize: "15px",
    fontStyle: "oblique"
  }
});

export default () => {
  const classes = useStyles();
  return (
    <Typography  className={classes.titleStyles} align="center">
    MyChat is a ReactApp created by Quidux and Tarbux ©2020
  </Typography> 
  );
}
