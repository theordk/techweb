/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core'
import Messages from './Messages'

const styles = {
    form: {
        borderTop: '2px solid #373B44',
        padding: '.5rem',
        display: 'flex',
    },
    content: {
        flex: '1 1 auto',
        marginRight: '.5rem'
    },
    send: {
        backgroundColor: '#D6DDEC',
        padding: '.2rem .5rem',
        border: 'none',
        ':hover': {
            backgroundColor: '#2A4B99',
            cursor: 'pointer',
            color: '#fff',
        },
    },
}

const { DateTime } = require("luxon");
var showdown = require('showdown');

var now = DateTime.local();
var converter = new showdown.Converter();

const MessagesSend = params => {
    const MessageForm = ({
        addMessage
    }) => {
        const onSubmit = (e) => {
            e.preventDefault()
            const data = new FormData(e.target)
            addMessage({
                content: converter.makeHtml(data.get('content')),
                author: 'david',
                creation: now.toLocaleString(DateTime.DATETIME_MED),
            })
            e.target.elements.content.value = ''
        }
        return (
            <form css={styles.form} onSubmit={onSubmit}>
                <input type="input" name="content" css={styles.content} />
                <input type="submit" value="Send" css={styles.send} />
            </form>
        )
    }
    const addMessage = (message) => {
        params.setMessages([
            ...params.messages,
            message
        ])
    }
    return (
        <MessageForm addMessage={addMessage} />
    );
}

export default MessagesSend;