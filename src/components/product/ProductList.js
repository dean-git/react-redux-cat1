import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "./connect/productActions";
import spinner from '../data/ZZ5H.gif'
import cookiejs from 'cookiejs';


class ProductList extends React.Component {
  componentDidMount() {
    const userAuth = cookiejs.get('user-auth');
    console.log(userAuth);
    this.props.dispatch(fetchProducts(userAuth));
  }

  render() {
    const { error, loading, products, user } = this.props;

    if (user) {
      console.log('user value is ' + user.authenticated);
    }

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div className="loader"><img src={spinner} alt="loading..." className="loader-img"/></div>;
    }

    return (
      <div className="container products-container">
        <div className="products-title">
            <h1>Products</h1>
        </div>
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-12 col-md-4 product-item" alt="Responsive image">
              <img className="img-fluid img-thumbnail product-image" src={product.image} alt={product.name} />
              <span className="product-description">{product.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(ProductList);
