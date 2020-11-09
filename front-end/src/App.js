import {useState} from 'react';
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
import Header from './header'
import Footer from './footer'
import Main from './main'

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  }, 
}

export default () => {
  return (
    <div className="App" css={styles.root}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
