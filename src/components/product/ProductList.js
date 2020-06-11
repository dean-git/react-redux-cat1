import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "./connect/productActions";

class ProductList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { error, loading, products } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container products-container">
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-12 col-md-4 product-item" alt="Responsive image">
              <img className="img-fluid img-thumbnail product-image" src={product.image} />
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
