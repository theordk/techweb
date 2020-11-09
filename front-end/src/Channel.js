/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core'
import Messages from './Messages'
import MessagesSend from './MessagesSend'

const styles = {
    channel: {
        height: '100%',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      },
    }



export default () => {

    const [messages, setMessages] = useState([{
        author: 'david',
        creation: 1602844139200,
        content: `
        ## 4 - Support message contents in Markdown - Level hard
        
        `,
    }])

    return (
        <div css={styles.channel}>
            <Messages messages={messages} />
            <MessagesSend setMessages={setMessages} messages={messages} />
        </div>
    );
}

