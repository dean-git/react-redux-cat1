import productData from '../../data/productData.json';
import productDataDefault from '../../data/productDataDefault.json';

function mockGetAllProducts(auth) {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          products: productData
        }),
      1000
    );
  });
}

function mockGetDefaultProducts(auth) {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          products: productDataDefault
        }),
      1000
    );
  });
}

export function fetchProducts(auth) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return auth ? mockGetAllProducts(auth)
      .then(json => {
        dispatch(fetchProductsSuccess(json.products));
        return json.products;
      }) :
      mockGetDefaultProducts(auth)
      .then(json => {
        dispatch(fetchProductsSuccess(json.products));
        return json.products;
      })
      .catch(error =>
        dispatch(fetchProductsFailure(error))
      );
  };
}

export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS =
  "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE =
  "FETCH_PRODUCTS_FAILURE";

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});
