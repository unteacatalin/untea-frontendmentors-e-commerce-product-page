import { makeStyles } from 'tss-react/mui';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      position: 'relative',
      height: 'calc(3.5rem + 2px)',
      width: 'calc(3.5rem + 2px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      borderRadius: '50%',
      margin: 0,
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        height: 'calc(2rem + 2px)',
        width: 'calc(2rem + 2px)',
      },
      '&:hover': {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  };
});

function AccountIcon() {
  const { classes } = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.container}>
      <Image
        src='/image-avatar.png'
        alt='account avatar'
        width={matchesSM ? 32 : 56}
        height={matchesSM ? 32 : 56}
      />
    </div>
  );
}

export default AccountIcon;
