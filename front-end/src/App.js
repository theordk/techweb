import {useState} from 'react'
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#05253D',
    padding: '30px',
    //borderRadius: '20px'
  },
}

export default () => {
  const [user, setUser] = useState(null)
  return (
    <div className="App" css={styles.root}>
      <Header />
      {
        user ? <Main /> : <Login onUser={setUser} />
      }
      <Footer />
    </div>
  );
}
