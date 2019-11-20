import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { Container, ProductTable, Footer } from './styles';

export default function Cart() {
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <td>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTP6WHxVINA1WLM4WBZj-UKJ-CNU6mTy0SoipoNy98WFBYHr-SH"
              alt="Tênis"
            />
          </td>
          <td>
            <strong> Tênis muito massa</strong>
            <span> R$ 250,90 </span>
          </td>
          <td>
            <div>
              <button type="button">
                <MdRemoveCircleOutline size={20} color="#7159c1" />
              </button>
              <input type="number" readOnly value={1} />
              <button type="button">
                <MdAddCircleOutline size={20} color="#7159c1" />
              </button>
            </div>
          </td>
          <td>
            <strong> R$ 250,90</strong>
          </td>
          <td>
            <button type="button">
              <MdDelete size={20} color="#7159c1" />
            </button>
          </td>
        </tbody>
      </ProductTable>
      <Footer>
        <button type="button">Finalizar Pedido</button>
        <span>
          TOTAL <strong>R$ 250,90 </strong>
        </span>
      </Footer>
    </Container>
  );
}
