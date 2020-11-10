/** @jsx jsx */
import { jsx } from '@emotion/core'

const styles = {
    footer: {
        height: '30px',
        backgroundColor: 'rgba(255,255,255,.3)',
        flexShrink: 0,
    },
}

export default () => {
    return (
        <footer className="App-footer" style={styles.footer}>
            Footer
        </footer>
    );
}   