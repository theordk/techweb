import { useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import { DesktopWindowsTwoTone } from '@material-ui/icons';
//import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";
import { useState } from "react"

export default ({
  onUser
}) => {
  
  const useStyles = (theme) => ({
    root: {
      flex: '1 1 auto',
      background: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '& > div': {
        margin: `${theme.spacing(1)}`,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      '& fieldset': {
        border: 'none',
        '& label': {
          marginBottom: theme.spacing(.5),
          display: 'block',
        },
      },
    },
  })

  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [mail, setMail] = useState("");
  const crypto = require('crypto');
  const axios = require('axios');
  const qs = require('qs');
  
  const base64URLEncode = (str) => (
    str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  )
  const sha256 = (buffer) => (
    crypto
      .createHash('sha256')
      .update(buffer)
      .digest()
  )

  var url
  var clientMail

  if (!code) {
    if (!cookies.oauth) {
    const code_verifier = base64URLEncode(crypto.randomBytes(32))
    const code_challenge = base64URLEncode(sha256(code_verifier))
    setCookie("verifier", code_verifier, {      
      path: "/"    
    })
    url = "http://127.0.0.1:5556/dex/auth?client_id=techweb&scope=openid%20email%20offline_access&response_type=code&redirect_uri=http://localhost:3000/callback"
    + "&code_challenge=" + code_challenge
    + "&code_challenge_method=S256"
    }
    else{
     const access = cookies.oauth["access_token"]
     useEffect(() => {
      const request = async () => {
        try{
         const {data:client }= await axios.get('http://127.0.0.1:5556/dex/userinfo',{
          headers: {Authorization : 'Bearer ' + access}
          }
         )
         setMail(client["email"])
        }
        catch(err){
         console.log(err)
        }
      }
    request()                
})
    }
  }
  else{
    const verifier = cookies.verifier
    useEffect(() => {
             const request = async () => {
               try{
                const {data:oauth }= await axios.post('http://127.0.0.1:5556/dex/token', qs.stringify({
                  grant_type: 'authorization_code',
                  client_id: 'techweb',
                  redirect_uri: 'http://localhost:3000/callback',
                  code_verifier: verifier,
                  code: code,
                 })
                )
                setCookie("oauth", oauth,{      
                  path: "/"    
                })
                window.location = "/"  
               }
               catch(err){
                console.log(err)
               }
             }
           request()                
      })   
  }

  const styles = useStyles(useTheme())
  return (
    
    <div css={styles.root}>
      <div>
        <fieldset>
          <p>{mail}</p>
          <a href={url} >Login with OAuth </a>
        </fieldset>
        <fieldset>
          <label htmlFor="username">username: </label>
          <input id="username" name="username" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">password:</label>
          <input id="password" name="password" type="password" />
        </fieldset>
        <fieldset>
          <input type="submit" value="login" onClick={(e) => {
            e.stopPropagation()
            onUser({ username: 'david' })
          }} />
        </fieldset>
      </div>
    </div>
  );
}
