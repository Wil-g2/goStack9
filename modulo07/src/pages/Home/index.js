import React, { Component } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

export default class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <ProductList>
        {products.map(p => (
          <li key={p.id}>
            <img src={p.image} alt={p.title} />
            <strong> {p.title}</strong>
            <span> {p.priceFormatted} </span>

            <button type="button">
              <div>
                <MdShoppingCart color="#fff" size={16} />
              </div>
              <span> ADICIONAR AO CARRINHO </span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
