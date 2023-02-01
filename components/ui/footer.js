import Link from 'next/link';

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: '100%',
      padding: '1rem 25rem',
      [theme.breakpoints.down('xxl')]: {
        padding: '1rem 15rem',
      },
      [theme.breakpoints.down('xl')]: {
        padding: '1rem 9rem',
      },
      [theme.breakpoints.down('lg')]: {
        padding: '1rem 2.5rem',
      },
      [theme.breakpoints.down('md')]: {
        padding: '1rem',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '1rem',
      },
    },
    footerWrapper: {
      width: '100%',
      display: 'flex',
      borderTop: `1px solid ${theme.palette.common.black}`,
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.common.black,
      fontSize: '1rem',
      padding: '1rem 0 0 0',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
        padding: '0.5rem 0 0 0',
      },
    },
    link: {
      color: theme.palette.primary.main,
    },
  };
});

function Footer() {
  const { classes } = useStyles();

  return (
    <footer className={classes.container}>
      <div className={classes.footerWrapper}>
        Challenge by&nbsp;
        <Link
          href='https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29/hub'
          target='_blank'
          className={classes.link}
        >
          Frontend Mentor
        </Link>
        . Coded by&nbsp;
        <Link
          href='https://untea-rocmu-it.herokuapp.com/'
          target='_blank'
          className={classes.link}
        >
          Catalin Marius Untea
        </Link>
        .
      </div>
    </footer>
  );
}

export default Footer;
