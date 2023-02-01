import React, { Fragment, useState, useEffect, useContext } from 'react';
import { makeStyles } from 'tss-react/mui';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import cls from 'classnames';

import LogoHeader from '../images/logo-header';
import CartIcon from '../cart-icon/cart-icon';
import AccountIcon from '../account-icon/account-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import ProductStore from '../../store/store-context';
import IconMenu from '../images/icon-menu';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const AntTabs = styled(Tabs)({
  height: '100%',
  paddingLeft: '2rem',
  '& .MuiTabs-indicator': {
    backgroundColor: 'hsl(26, 100%, 55%)',
    paddingBottom: '3px',
    '& .MuiTabs-indicator:hover': {
      backgroundColor: 'hsl(26, 100%, 55%)',
      paddingBottom: '3px',
    },
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: ['Kumbh Sans', 'sans-serif'].join(','),
    '&:hover': {
      color: theme.palette.common.dark_grayish_blue,
      opacity: 1,
    },
    '&.Mui-selected': {
      color: theme.palette.common.very_dark_blue,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  })
);

const useStyles = makeStyles()((theme) => {
  return {
    appBarContainer: {
      backgroundColor: theme.palette.common.white,
      width: '100%',
      height: '6rem',
      padding: '2rem 25rem 0 25rem',
      [theme.breakpoints.down('xxl')]: {
        padding: '2rem 15rem 0 15rem',
      },
      [theme.breakpoints.down('xl')]: {
        padding: '2rem 9rem 0 9rem',
      },
      [theme.breakpoints.down('lg')]: {
        padding: '2rem 2.5rem 0 2.5rem',
      },
      [theme.breakpoints.down('md')]: {
        padding: '1rem 1rem 0 1rem',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0 1rem 0 1rem',
        height: '4rem',
      },
    },
    toolbarContainer: {
      width: '100%',
      height: '100%',
      borderBottom: `1px solid ${theme.palette.common.grayish_blue}`,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        minHeight: '2rem',
      },
    },
    logoContainer: {
      paddingBottom: '1.6rem',
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '0.5rem',
      },
    },
    iconWrapper: {
      paddingBottom: '1.4rem',
      position: 'absolute',
      right: '6rem',
      [theme.breakpoints.down('lg')]: {
        right: '5rem',
      },
      [theme.breakpoints.down('sm')]: {
        right: '3rem',
        padding: 0,
      },
    },
    accountWrapper: {
      paddingBottom: '1.4rem',
      position: 'absolute',
      right: 0,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        paddingBottom: '0.3rem',
      },
    },
    drawer: {
      backgroundColor: theme.palette.common.white,
      padding: '2rem 1rem',
    },
    drawerItemButton: {
      color: theme.palette.common.black,
    },
    drawerIconContainer: {
      paddingBottom: '1.4rem',
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '0.5rem',
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    listItemText: { textAlign: 'left', padding: '0.2rem 0' },
    drawerItemButtonSelected: {
      fontWeight: '700',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.common.cyan,
      borderRadius: '50px',
      '&:hover': {
        backgroundColor: theme.palette.common.cyan,
      },
    },
    drawerItemButtonLogo: {
      paddingBottom: '1rem',
    },
  };
});

function Header() {
  const { classes } = useStyles();
  const StoreCtx = useContext(ProductStore);
  const [value, setValue] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartHiddenState, setCartHiddenState] = useState(StoreCtx.cartHidden);

  const matchesMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleCartHidden = () => {
    StoreCtx.setCartHidden(!StoreCtx.cartHidden);
  };

  const tabs = (
    <AntTabs value={value} onChange={handleChange} variant='fullWidth'>
      <AntTab label='Collections' component={Link} href='/collections' />
      <AntTab label='Men' component={Link} href='/men' />
      <AntTab label='Women' component={Link} href='/women' />
      <AntTab label='About' component={Link} href='/about' />
      <AntTab label='Contact' component={Link} href='/contact' />
    </AntTabs>
  );

  const drawer = (
    <Fragment>
      <SwipeableDrawer
        anchor='left'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            component={Link}
            href='/'
            disablePadding
            className={cls(
              classes.drawerItemButton,
              classes.drawerItemButtonLogo
            )}
          >
            <LogoHeader />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            component={Link}
            href='/collections'
            disablePadding
            className={cls(
              classes.drawerItemButton,
              value === 0 && classes.drawerItemButtonSelected
            )}
          >
            <ListItemText disableTypography className={classes.listItemText}>
              Collections
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            component={Link}
            href='/men'
            disablePadding
            className={cls(
              classes.drawerItemButton,
              value === 1 && classes.drawerItemButtonSelected
            )}
          >
            <ListItemText disableTypography className={classes.listItemText}>
              Men
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            component={Link}
            href='/women'
            disablePadding
            className={cls(
              classes.drawerItemButton,
              value === 2 && classes.drawerItemButtonSelected
            )}
          >
            <ListItemText disableTypography className={classes.listItemText}>
              Women
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            component={Link}
            href='/about'
            disablePadding
            className={cls(
              classes.drawerItemButton,
              value === 3 && classes.drawerItemButtonSelected
            )}
          >
            <ListItemText disableTypography className={classes.listItemText}>
              About
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            component={Link}
            href='/contact'
            disablePadding
            className={cls(
              classes.drawerItemButton,
              value === 4 && classes.drawerItemButtonSelected
            )}
          >
            <ListItemText disableTypography className={classes.listItemText}>
              Contact
            </ListItemText>
          </ListItemButton>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <IconMenu className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    setCartHiddenState(StoreCtx.cartHidden);
  }, [StoreCtx]);

  useEffect(() => {
    if (router.pathname === '/collections' && value !== 0) {
      setValue(0);
    } else if (router.pathname === '/men' && value !== 1) {
      setValue(1);
    } else if (router.pathname === '/women' && value !== 2) {
      setValue(2);
    } else if (router.pathname === '/about' && value !== 3) {
      setValue(3);
    } else if (router.pathname === '/contact' && value !== 4) {
      setValue(4);
    } else if (router.pathname === '/' && !value) {
      setValue(false);
    }
  }, [router, value]);

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar className={classes.appBarContainer} position='fixed'>
          <Toolbar disableGutters className={classes.toolbarContainer}>
            {matchesMD && drawer}
            <Button
              component={Link}
              href='/'
              disableRipple
              className={classes.logoContainer}
              onClick={() => {
                setOpenDrawer(false);
                setValue(false);
              }}
            >
              <LogoHeader />
            </Button>
            {!matchesMD && tabs}
            <IconButton
              className={classes.iconWrapper}
              disableRipple
              onClick={toggleCartHidden}
            >
              <CartIcon />
            </IconButton>
            <IconButton className={classes.accountWrapper} disableRipple>
              <AccountIcon />
            </IconButton>
            {cartHiddenState ? null : <CartDropdown />}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Fragment>
  );
}

export default Header;
