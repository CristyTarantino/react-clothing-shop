import React, { useState } from 'react'

export const ProductsContext = React.createContext({
  products: [],
  toggleFavorite: (id) => {}
});

export default ({children}) => {
  const [productList, setProductList] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }
  ]);

  const toggleFav = productId => {
    setProductList(currentProductList => {

      const prodIndex = currentProductList.findIndex(
        p => p.id === productId
      );
      const newFavStatus = !currentProductList[prodIndex].isFavorite;
      const updatedProductList = [...currentProductList];
      updatedProductList[prodIndex] = {
        ...currentProductList[prodIndex],
        isFavorite: newFavStatus
      };

      return updatedProductList;
    })
  };

  return <ProductsContext.Provider value={{products: productList, toggleFavorite: toggleFav}}>
    {children}
  </ProductsContext.Provider>
};