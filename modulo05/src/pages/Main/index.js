import React, { Component } from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepo: '',
    };
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('teste');
  };

  render() {
    const { newRepo } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt /> Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repostiório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton>
            <FaPlus color="#fff" size={14} />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
