import { makeStyles } from 'tss-react/mui';

import Header from './header';
import Footer from './footer';

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    spacer: {
      marginBottom: '7rem',
      [theme.breakpoints.down('lg')]: {
        marginBottom: '4rem',
      },
      [theme.breakpoints.down('md')]: {
        marginBottom: '4rem',
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: '3rem',
      },
    },
    main: {
      minHeight: 'calc(100vh - 6rem - 5.5rem)',
      [theme.breakpoints.down('sm')]: {
        minHeight: 'calc(100vh - 4rem - 3.2rem)',
      },
    },
  };
});

function Layout({ children }) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.spacer} />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
