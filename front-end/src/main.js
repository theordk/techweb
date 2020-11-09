/** @jsx jsx */
import { jsx } from '@emotion/core'
import Channels from './Channels'
import Channel from './Channel'

const styles = {
main: {
    backgroundColor: '#373B44',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  
}
 
  export default () => {  
    return (
        <main css={styles.main}>
        <Channels />
        <Channel />
      </main>      
    );
} 