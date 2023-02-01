import { useContext, useEffect, useState, useRef, Fragment } from 'react';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import Button from '@mui/material/Button';
import cls from 'classnames';

import ProductStore from '../../store/store-context';

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      position: 'absolute',
      width: '350px',
      height: '260px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.common.white,
      top: '4rem',
      right: 0,
      zIndex: 5,
      boxShadow: `3px 3px 6px 0.1px ${theme.palette.common.very_dark_blue}`,
      borderRadius: '0 0 10px 10px',
      [theme.breakpoints.down('md')]: {
        top: '5rem',
        width: '350px',
        borderRadius: '0 0 10px 10px',
      },
      [theme.breakpoints.down('sm')]: {
        top: '4.5rem',
        width: '100%',
        borderRadius: '10px 10px 10px 10px',
      },
    },
    title: {
      padding: '0.5rem 0 1rem 1rem',
      fontWeight: 700,
    },
    cartItemsContainer: {
      padding: '1rem',
    },
    cartItemWrapper: {
      height: 'calc(260px - 2rem - 3.5rem - 1.5rem - 1rem - 1.5rem)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'scroll',
    },
    lineWrapper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    description: {
      width: 'calc(100% - 48px - 1.2rem)',
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      width: '100%',
      height: '3.5rem',
      borderRadius: '10px',
      textTransform: 'none',
      color: theme.palette.common.white,
      marginTop: '1rem',
      fontWeight: 700,
      fontSize: '1rem',
    },
    image: {
      borderRadius: '5px',
    },
    deleteButton: {
      margin: 0,
      padding: 0,
      width: '19px',
      height: '19px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '19px',
    },
    emptyBasketStyles: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      fontWeight: 700,
    },
    refComp1723483: {},
  };
});

function CartDropdown() {
  const { classes } = useStyles();
  const StoreCtx = useContext(ProductStore);
  const [basket, setBasket] = useState(StoreCtx?.basket || []);
  const ref = useRef(null);

  useEffect(() => {
    setBasket(StoreCtx.basket);
  }, [StoreCtx]);

  const emptyBasket = (
    <Typography
      className={cls(classes.refComp1723483, classes.emptyBasketStyles)}
    >
      Your cart is empty.
    </Typography>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      let arrayClasses = [];
      if (event.target.className?.match) {
        arrayClasses = event.target.className?.match('refComp1723483') || [];
      }
      if (arrayClasses.length === 0) {
        StoreCtx.setCartHidden(true);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });

  const itemsInBasket = (
    <Fragment>
      <div className={cls(classes.refComp1723483, classes.cartItemsContainer)}>
        <div className={cls(classes.refComp1723483, classes.cartItemWrapper)}>
          {basket.map((item, idx) => (
            <div
              key={'cart' + idx + item.id}
              className={cls(classes.refComp1723483, classes.lineWrapper)}
            >
              <Image
                src={item.images[0].image}
                alt={item.name}
                width={48}
                height={48}
                className={cls(classes.refComp1723483, classes.image)}
              />
              <div className={cls(classes.refComp1723483, classes.description)}>
                <Typography className={classes.refComp1723483}>
                  {item.name}
                </Typography>
                <Typography className={classes.refComp1723483}>
                  {'$' +
                    parseFloat(item.discountedPrice).toFixed(2) +
                    ' x ' +
                    item.quantity +
                    ' '}
                  <b className={classes.refComp1723483}>
                    {'$' +
                      parseFloat(item.discountedPrice * item.quantity).toFixed(
                        2
                      )}
                  </b>
                </Typography>
              </div>
              <Button
                className={cls(classes.refComp1723483, classes.deleteButton)}
                disableRipple
                onClick={() => StoreCtx.removeFromBasket(item.id)}
              >
                <Image
                  src='/icons/icon-delete.svg'
                  alt='delete'
                  width={14}
                  height={16}
                  className={classes.refComp1723483}
                />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant='contained'
          disableRipple
          className={cls(classes.refComp1723483, classes.button)}
        >
          Checkout
        </Button>
      </div>
    </Fragment>
  );

  return (
    <div className={cls(classes.refComp1723483, classes.container)} ref={ref}>
      <Typography className={cls(classes.refComp1723483, classes.title)}>
        Cart
      </Typography>
      <Divider className={classes.refComp1723483} />
      {StoreCtx.totalQuantity === 0 ? emptyBasket : itemsInBasket}
    </div>
  );
}

export default CartDropdown;
