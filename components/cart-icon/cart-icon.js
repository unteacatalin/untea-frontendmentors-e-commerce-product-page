import { useContext, useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import ShoppingIcon from '../images/shopping-icon';
import StoreContext from '../../store/store-context';

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      position: 'relative',
      height: '2.2rem',
      width: '2.2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
    iconWrapper: {
      position: 'absolute',
      width: '1.7rem',
      height: '1.7rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textWrapper: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    },
    cartQuantityContainer: {
      backgroundColor: theme.palette.primary.main,
      width: '1.2rem',
      height: '1.2rem',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '10px',
      fontWeight: '700',
      lineHeight: '1.2rem',
      color: theme.palette.common.white,
    },
  };
});

function CartIcon() {
  const { classes } = useStyles();
  const storeCtx = useContext(StoreContext);

  const [qty, setQty] = useState(storeCtx?.totalQuantity || 0);

  useEffect(() => {
    if (storeCtx?.totalQuantity >= 0 && storeCtx.totalQuantity !== qty) {
      setQty(storeCtx.totalQuantity);
    }
  }, [storeCtx]);

  return (
    <div className={classes.container}>
      <div className={classes.iconWrapper}>
        <ShoppingIcon />
      </div>
      {qty > 0 && (
        <div className={classes.textWrapper}>
          <div className={classes.cartQuantityContainer}>{qty}</div>
        </div>
      )}
    </div>
  );
}

export default CartIcon;
