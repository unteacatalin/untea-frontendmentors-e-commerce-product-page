import { createContext, useState, useEffect } from 'react';

const ProductStore = createContext({
  basket: [],
  totalQuantity: 0,
  addToBasket: (newProduct) => {},
  removeFromBasket: (newProduct) => {},
});

export function ProductStoreProvider(props) {
  const [basketState, setBasketState] = useState([]);
  const [totalQuantityState, setTotalQuantityState] = useState(0);
  const [cartHidden, setCartHidden] = useState(true);

  useEffect(() => {
    const totalQty = basketState.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );
    setTotalQuantityState(totalQty);
  }, [basketState]);

  function addProduct(productData) {
    setBasketState((prevProductData) => {
      const existingProduct = prevProductData.find(
        (product) => product.id === productData.id
      );
      const otherProducts = prevProductData.filter(
        (product) => product.id !== productData.id
      );
      if (existingProduct) {
        return [
          ...otherProducts,
          {
            ...existingProduct,
            quantity: existingProduct.quantity + parseInt(productData.quantity),
          },
        ];
      } else {
        return [...otherProducts, { ...productData }];
      }
    });
  }

  function removeProduct(id) {
    setBasketState((prevProductData) => {
      const existingProduct = prevProductData.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        return prevProductData.filter((product) => product.id !== id);
      }
    });
  }

  const context = {
    basket: basketState,
    totalQuantity: totalQuantityState,
    cartHidden,
    addToBasket: addProduct,
    removeFromBasket: removeProduct,
    setCartHidden,
  };

  return (
    <ProductStore.Provider value={context}>
      {props.children}
    </ProductStore.Provider>
  );
}

export default ProductStore;
