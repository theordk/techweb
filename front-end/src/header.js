/** @jsx jsx */
import { jsx } from '@emotion/core'

const styles = {
    header: {
        height: '60px',
        backgroundColor: 'rgba(255,255,255,.3)',
        flexShrink: 0,
    },
}

export default () => {
    return (
        <header css={styles.header}>
            <h1>Header</h1>
        </header>
    );
}