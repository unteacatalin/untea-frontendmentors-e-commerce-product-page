import Head from 'next/head';
import { useState, useEffect, useContext, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';
import Image from 'next/image';
import cls from 'classnames';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Layout from '../components/ui/layout';
import ProductStore from '../store/store-context';
import ShoppingIcon from '../components/images/shopping-icon';
import IconClose from '../components/images/icon-close';
import IconPrevious from '../components/images/icon-previous';
import IconNext from '../components/images/icon-next';

const useStyles = makeStyles()((theme) => {
  return {
    productContainer: {
      width: '100%',
      height: '100%',
      padding: '2rem 25rem',
      [theme.breakpoints.down('xxl')]: {
        padding: '2rem 15rem',
      },
      [theme.breakpoints.down('xl')]: {
        padding: '2rem 9rem',
      },
      [theme.breakpoints.down('lg')]: {
        padding: '2rem 5rem',
      },
      [theme.breakpoints.down('md')]: {
        padding: '1rem 2rem',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '2rem 0',
      },
    },
    mainImageWrapper: {
      width: '31.2rem',
      height: '31.2rem',
      padding: '1.6px',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        width: '100%',
        height: 'auto',
      },
    },
    mainImage: {
      borderRadius: '20px',
      cursor: 'pointer',
      display: 'relative',
      [theme.breakpoints.down('sm')]: {
        cursor: 'default',
        borderRadius: 0,
        width: '100%',
        height: 'auto',
      },
    },
    thumbnailsContainer: {
      width: '28rem',
    },
    thumbnail: {
      borderRadius: '10px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        opacity: 0.5,
      },
    },
    thumbnailWrapper: {
      border: `4px solid ${theme.palette.common.orange}`,
      borderRadius: '15px',
      width: '98px',
      height: '98px',
      backgroundColor: theme.palette.common.white,
    },
    thumbnailWrapperMain: {
      backgroundColor: theme.palette.common.white,
      borderRadius: '15px',
    },
    selectedThumbnail: {
      opacity: 0.3,
      borderRadius: '10px',
    },
    detailsContainer: {
      padding: '4.6rem 4.1rem 4.6rem 4rem',
      marginBottom: 0,
      [theme.breakpoints.down('sm')]: {
        padding: '1rem',
      },
    },
    brand: {
      color: theme.palette.primary.main,
      fontWeight: 700,
      fontSize: '0.95rem',
    },
    description: {
      fontWeight: 400,
      color: theme.palette.common.dark_grayish_blue,
      lineHeight: '1.5rem',
      padding: '1rem 0',
    },
    discountedPrice: {
      fontSize: '1.8rem',
      fontWeight: 700,
    },
    discount: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.common.pale_orange,
      height: '1.7rem',
      width: '3rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      marginLeft: '1.5rem',
    },
    price: {
      color: theme.palette.common.grayish_blue,
      paddingBottom: '2rem',
    },
    sign: {
      color: theme.palette.common.orange,
      fontSize: '2rem',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      paddingBottom: '0.55rem',
      cursor: 'pointer',
    },
    quantity: {
      fontSize: '1.2rem',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '6rem',
      width: '20%',
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      maxWidth: '17rem',
      width: '60%',
      height: '3.5rem',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '2rem',
      boxShadow: `0 5px 5px ${theme.palette.common.pale_orange}`,
      [theme.breakpoints.down('xl')]: {
        marginLeft: '1rem',
      },
    },
    buttonText: {
      color: theme.palette.common.white,
      fontWeight: 700,
      paddingLeft: '1rem',
    },
    modalContainer: {
      width: '100%',
      height: '100%',
    },
    mainImageWrapperModal: {
      width: '39.6rem',
      height: '38.6rem',
      padding: '1rem 3rem 1rem 3rem',
      position: 'relative',
    },
    mainImageModal: {
      borderRadius: '20px',
    },
    thumbnailModal: {
      borderRadius: '10px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        opacity: 0.5,
      },
    },
    selectedThumbnailModal: {
      opacity: 0.3,
      borderRadius: '10px',
    },
    closeButtonWrapperModal: {
      width: '34rem',
      height: '18.21px',
    },
    closeButtonModal: {
      padding: 0,
      margin: 0,
      width: '17px',
      height: '18.21px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '24px',
    },
    closeIconModal: {
      width: '17px',
      height: '18.21px',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    previousButtonModal: {
      height: '3.5rem',
      width: '3.5rem',
      backgroundColor: theme.palette.common.white,
      minWidth: '3rem',
      borderRadius: '50px',
      position: 'absolute',
      bottom: '44%',
      left: '3%',
      transform: 'translate(-3%, -44%)',
      padding: 0,
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
    },
    previousButton: {
      height: '3.5rem',
      width: '3.5rem',
      backgroundColor: theme.palette.common.white,
      minWidth: '3rem',
      borderRadius: '50px',
      position: 'absolute',
      bottom: '70%',
      left: '3%',
      transform: 'translate(-3%, -70%)',
      padding: 0,
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
    },
    nextButtonModal: {
      height: '3.5rem',
      width: '3.5rem',
      backgroundColor: theme.palette.common.white,
      minWidth: '3rem',
      borderRadius: '50px',
      position: 'absolute',
      bottom: '44%',
      right: '3%',
      transform: 'translate(-3%, -44%)',
      padding: 0,
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
    },
    nextButton: {
      height: '3.5rem',
      width: '3.5rem',
      backgroundColor: theme.palette.common.white,
      minWidth: '3rem',
      borderRadius: '50px',
      position: 'absolute',
      bottom: '70%',
      right: '3%',
      transform: 'translate(-3%, -70%)',
      padding: 0,
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
    },
    name: {
      padding: '0.5rem 0 1rem 0',
    },
  };
});

function ProductDetails(props) {
  const StoreCtx = useContext(ProductStore);
  const theme = useTheme();
  const product = props.product;
  const { classes } = useStyles();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImageModal, setSelectedImageModal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [qty, setQty] = useState(1);
  const [closeIconColor, setCloseIconColor] = useState(
    theme.palette.common.white
  );
  const [previousIconColor, setPreviousIconColor] = useState(
    theme.palette.common.black
  );
  const [nextIconColor, setNextIconColor] = useState(
    theme.palette.common.white
  );
  const matchesMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  let leftImgIdx =
    product.images.length < 4
      ? 0
      : selectedImage < 3
      ? 0
      : selectedImage > product.images.length - 4
      ? product.images.length - 4
      : selectedImage - 1;
  let rightImgIdx =
    product.images.length < 4
      ? product.images.length - 1
      : selectedImage > product.images.length - 4
      ? product.images.length - 1
      : selectedImage < 3
      ? 3
      : selectedImage + 1;

  function handleClick(index) {
    setSelectedImage(index);
  }

  function handleAddToCart() {
    StoreCtx.addToBasket({ ...product, quantity: qty });
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (selectedImageModal === 0) {
      setPreviousIconColor(theme.palette.common.grayish_blue);
    } else {
      setPreviousIconColor(theme.palette.common.black);
    }
    if (selectedImageModal === 3) {
      setNextIconColor(theme.palette.common.grayish_blue);
    } else {
      setNextIconColor(theme.palette.common.black);
    }
  }, [selectedImageModal]);

  useEffect(() => {
    if (selectedImage === 0) {
      setPreviousIconColor(theme.palette.common.grayish_blue);
    } else {
      setPreviousIconColor(theme.palette.common.black);
    }
    if (selectedImage === 3) {
      setNextIconColor(theme.palette.common.grayish_blue);
    } else {
      setNextIconColor(theme.palette.common.black);
    }
  }, [selectedImage]);

  return (
    <Layout>
      <Head>
        <title>E-commerce product page</title>
        <meta name='description' content='E-commerce product page' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Grid item container className={classes.productContainer} xs={12}>
        <Grid
          item
          container
          lg={6}
          md={12}
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Grid
            item
            container
            className={classes.mainImageWrapper}
            justifyContent='center'
            alignItems='center'
          >
            <Image
              src={product?.images[selectedImage]?.image}
              alt={product?.name}
              width={matchesSM ? 416 : 448}
              height={matchesSM ? 416 : 448}
              className={classes.mainImage}
              onClick={matchesSM ? undefined : handleOpenModal}
            />
            {matchesSM ? (
              <Fragment>
                <Button
                  className={classes.previousButton}
                  onMouseEnter={() =>
                    setPreviousIconColor(
                      selectedImage === 0
                        ? theme.palette.common.grayish_blue
                        : theme.palette.primary.main
                    )
                  }
                  onMouseLeave={() =>
                    setPreviousIconColor(
                      selectedImage === 0
                        ? theme.palette.common.grayish_blue
                        : theme.palette.common.black
                    )
                  }
                  onClick={() =>
                    setSelectedImage(selectedImage > 1 ? selectedImage - 1 : 0)
                  }
                  disableRipple
                >
                  <IconPrevious
                    color={previousIconColor}
                    height={24}
                    width={25.71}
                  />
                </Button>
                <Button
                  className={classes.nextButton}
                  onMouseEnter={() =>
                    setNextIconColor(
                      selectedImage === 3
                        ? theme.palette.common.grayish_blue
                        : theme.palette.primary.main
                    )
                  }
                  onMouseLeave={() =>
                    setNextIconColor(
                      selectedImage === 3
                        ? theme.palette.common.grayish_blue
                        : theme.palette.common.black
                    )
                  }
                  onClick={() =>
                    setSelectedImage(selectedImage < 3 ? selectedImage + 1 : 3)
                  }
                  disableRipple
                >
                  <IconNext color={nextIconColor} height={24} width={25.71} />
                </Button>
              </Fragment>
            ) : undefined}
          </Grid>
          {matchesSM ? undefined : (
            <Grid
              item
              container
              justifyContent='space-between'
              alignItems='center'
              className={classes.thumbnailsContainer}
            >
              {product.images
                .slice(leftImgIdx, rightImgIdx + 1)
                .map((img, idx) => (
                  <div
                    key={idx}
                    className={
                      selectedImage === idx
                        ? classes.thumbnailWrapper
                        : classes.thumbnailWrapperMain
                    }
                  >
                    <Image
                      src={img.thumbnail}
                      alt={product?.name}
                      width={94}
                      height={94}
                      className={cls(
                        classes.thumbnail,
                        selectedImage === idx && classes.selectedThumbnail
                      )}
                      onClick={() => handleClick(idx)}
                    />
                  </div>
                ))}
            </Grid>
          )}
        </Grid>
        <Grid
          item
          container
          lg={6}
          md={12}
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          className={classes.detailsContainer}
        >
          <Grid item container>
            <Typography className={classes.brand}>{product.brand}</Typography>
          </Grid>
          <Grid item container>
            <Typography variant='h2' className={classes.name}>
              {product.name}
            </Typography>
          </Grid>
          <Grid item container>
            <Typography variant='h5' className={classes.description}>
              {product.description}
            </Typography>
          </Grid>
          <Grid item container>
            <Grid item container alignItems='center'>
              <Typography className={classes.discountedPrice}>
                ${parseFloat(product.discountedPrice).toFixed(2)}
              </Typography>
              <Typography variant='h5' className={classes.discount}>
                {product.discount * 100}%
              </Typography>
            </Grid>
            <Typography variant='h5' className={classes.price}>
              <del>${parseFloat(product.price).toFixed(2)}</del>
            </Typography>
          </Grid>
          <Grid
            item
            container
            flexDirection='row'
            alignItems='center'
            justifyContent='flex-end'
          >
            <Typography
              className={classes.sign}
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            >
              -
            </Typography>
            <Typography className={classes.quantity}>{qty}</Typography>
            <Typography
              className={classes.sign}
              onClick={() => setQty(qty < 99 ? qty + 1 : 99)}
            >
              +
            </Typography>
            <Button
              variant='contained'
              disableRipple
              className={classes.button}
              onClick={handleAddToCart}
            >
              <ShoppingIcon color={theme.palette.common.white} />
              <Typography className={classes.buttonText} textTransform='none'>
                Add to cart
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* M O D A L */}

      {matchesSM ? undefined : (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Grid
            className={classes.modalContainer}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Grid
              item
              container
              justifyContent='flex-end'
              alignItems='center'
              className={classes.closeButtonWrapperModal}
            >
              <Button
                className={classes.closeButtonModal}
                onMouseEnter={() =>
                  setCloseIconColor(theme.palette.primary.main)
                }
                onMouseLeave={() =>
                  setCloseIconColor(theme.palette.common.white)
                }
                onClick={handleCloseModal}
                disableRipple
              >
                <IconClose
                  className={classes.closeIconModal}
                  color={closeIconColor}
                />
              </Button>
            </Grid>
            <Grid
              item
              container
              className={classes.mainImageWrapperModal}
              justifyContent='center'
              alignItems='center'
            >
              <Image
                src={product?.images[selectedImageModal]?.image}
                alt={product?.name}
                width={matchesSM ? 416 : 544}
                height={matchesSM ? 416 : 544}
                className={classes.mainImageModal}
              />
              <Button
                className={classes.previousButtonModal}
                onMouseEnter={() =>
                  setPreviousIconColor(
                    selectedImageModal === 0
                      ? theme.palette.common.grayish_blue
                      : theme.palette.primary.main
                  )
                }
                onMouseLeave={() =>
                  setPreviousIconColor(
                    selectedImageModal === 0
                      ? theme.palette.common.grayish_blue
                      : theme.palette.common.black
                  )
                }
                onClick={() =>
                  setSelectedImageModal(
                    selectedImageModal > 1 ? selectedImageModal - 1 : 0
                  )
                }
                disableRipple
              >
                <IconPrevious
                  color={previousIconColor}
                  height={24}
                  width={25.71}
                />
              </Button>
              <Button
                className={classes.nextButtonModal}
                onMouseEnter={() =>
                  setNextIconColor(
                    selectedImageModal === 3
                      ? theme.palette.common.grayish_blue
                      : theme.palette.primary.main
                  )
                }
                onMouseLeave={() =>
                  setNextIconColor(
                    selectedImageModal === 3
                      ? theme.palette.common.grayish_blue
                      : theme.palette.common.black
                  )
                }
                onClick={() =>
                  setSelectedImageModal(
                    selectedImageModal < 3 ? selectedImageModal + 1 : 3
                  )
                }
                disableRipple
              >
                <IconNext color={nextIconColor} height={24} width={25.71} />
              </Button>
            </Grid>
            <Grid
              item
              container
              justifyContent='space-between'
              alignItems='center'
              className={classes.thumbnailsContainer}
            >
              {product.images
                .slice(leftImgIdx, rightImgIdx + 1)
                .map((img, idx) => (
                  <div
                    key={idx}
                    className={
                      selectedImageModal === idx
                        ? classes.thumbnailWrapper
                        : classes.thumbnailWrapperMain
                    }
                  >
                    <Image
                      src={img.thumbnail}
                      alt={product?.name}
                      width={94}
                      height={94}
                      className={cls(
                        classes.thumbnailModal,
                        selectedImageModal === idx &&
                          classes.selectedThumbnailModal
                      )}
                      onClick={() => handleClick(idx)}
                    />
                  </div>
                ))}
            </Grid>
          </Grid>
        </Modal>
      )}
    </Layout>
  );
}

export default ProductDetails;

export async function getServerSideProps(context) {
  try {
    const { params, req } = context;

    const filteredProduct = await fetch(
      `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}://${
        req.headers.host
      }/api/filterProduct`,
      {
        method: 'POST',
        body: JSON.stringify({
          id: params?.pid,
        }),
        header: {
          'Content-Type': 'application/json',
        },
      }
    );
    const product = await filteredProduct.json();

    if (JSON.stringify(product) !== '{}' && !product.error) {
      return {
        props: { product },
      };
    } else {
      console.error(product?.error);
      return { notFound: true };
    }
  } catch (error) {
    console.error(error.message);
    return { notFound: true };
  }
}
