/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core'

const styles = {
    messages: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
      '& ul': {
        'margin': 0,
        'padding': 0,
        'textIndent': 0,
        'listStyleType': 0,
      },
    },
    message: {
      margin: '.2rem',
      padding: '.2rem',
      // backgroundColor: '#66728E',
      ':hover': {
        backgroundColor: 'rgba(255,255,255,.2)',
      },
    },
  }

const Messages = (
    {messages},
    {channel = {
        name: 'Fake channel'
    }}
    ) => {
    return (
        <div css={styles.messages}>
                <h1>Messages for {channel.name}</h1>
                <ul>
                    {messages.map((message, i) => (
                        <li key={i} css={styles.message}>
                            <p>
                                <span>{message.author}</span>
                                {' '}
                                <span>{message.creation}</span>
                            </p>
                            <div>
                                {
                                    message.content
                                    .split(/(\n +\n)/)
                                    .filter(el => el.trim())
                                    .map(el => <div
                                        dangerouslySetInnerHTML={{
                                          __html: el
                                        }}></div>)                                   
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

export default Messages;

