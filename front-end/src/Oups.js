
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  root: {
    background: theme.palette.background.default,
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default () => {
  const styles = useStyles(useTheme())
  return (
    <main css={styles.root}>
      <div>
        An unexpected error occured, it is probably not your fault. Sorry.
      </div>
    </main>
  );
}
