import Head from 'next/head';
import ErrorIcon from '@mui/icons-material/Error';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';

import Layout from '../components/ui/layout';

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: '100%',
      height: '100%',
      padding: '2.4rem 25rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('xxl')]: {
        padding: '2.4rem 15rem',
      },
      [theme.breakpoints.down('xl')]: {
        padding: '4rem 9rem',
      },
      [theme.breakpoints.down('lg')]: {
        padding: '4rem 5rem',
      },
      [theme.breakpoints.down('md')]: {
        padding: '2.4rem 2rem',
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
      },
    },
    section: {
      width: '100%',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconWrapper: {
      width: '10rem',
      height: '10rem',
    },
  };
});

export default function Custom404() {
  const { classes } = useStyles();
  return (
    <Layout>
      <Head>
        <title>404 - Page not found</title>
        <meta name='description' content='E-commerce' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div className={classes.container}>
        <Typography variant='h1'>404 - Page not found</Typography>
        <div className={classes.section} id='link-shortening'>
          <ErrorIcon className={classes.iconWrapper} />
        </div>
      </div>
    </Layout>
  );
}
