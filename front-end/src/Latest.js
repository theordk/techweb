import { useContext, useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
import Context from './Context'
import axios from 'axios';

function Bail() {
    const {
        oauth
      } = useContext(Context)
    const [channelsNames2, setChannelsNames2] = useState([])
    const [channelsIds2, setChannelsIds2] = useState([])
    const [lastMessageContent2, setLastMessageContent2] = useState([])
    const [lastMessageAuthor2, setLastMessageAuthor2] = useState([])


useEffect( async () => {

    
  
    
    const createLatest = async () => {

      const channelsNames = []
    const channelsIds = []
  const lastMessageContent = []
    const lastMessageAuthor = []
      
      const { data: channels } = await axios.get('http://localhost:3001/channels', {
          headers: {
              'Authorization': `Bearer ${oauth.access_token}`
          },
          params: {
              user: `${oauth.email}`
          },
      })
      channels.forEach(element => {
          channelsNames.push(element.name)
          channelsIds.push(element.id)
      });

      channelsIds.forEach(async (element) => {
          const { data: message } = await axios.request(`http://localhost:3001/channels/${element}/messages`)
          if (message.length === 0) {
              lastMessageContent.push(" - No messages yet")
              lastMessageAuthor.push("Nobody talked yet")
          }
          message.forEach((el, i, message) => {
              if (i === message.length - 1) {
                  if (el.content.length >= 47) lastMessageContent.push(" - " + el.content.substring(0, 47) + "...")
                  else lastMessageContent.push(" - " + el.content)
                  let auth = el.author.split('@')[0]
                  if (auth.legnth >= 16) lastMessageAuthor.push(auth.substring(0, 13) + "...")
                  else lastMessageAuthor.push(auth)
              }
          })
      })
      setChannelsNames2(channelsNames)
      setChannelsIds2(channelsIds)
      setLastMessageAuthor2(lastMessageAuthor)
      setLastMessageContent2(lastMessageContent)
  }
 createLatest();}, []);
 return (<p>{channelsNames2}</p>)
}


export default Bail
    