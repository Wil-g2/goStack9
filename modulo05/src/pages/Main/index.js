import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import axios from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, ListRepo } from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
    };
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const res = await axios.get(`/repos/${newRepo}`);
    const data = {
      name: res.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
    localStorage.setItem('repositories', JSON.stringify(repositories));
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (repositories !== prevState.repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  render() {
    const { newRepo, repositories, loading } = this.state;
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
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <ListRepo>
          {repositories.map(r => (
            <li key={r.name}>
              <span>{r.name}</span>
              <Link to={`/repository/${encodeURIComponent(r.name)}`}>
                detalhes
              </Link>
            </li>
          ))}
        </ListRepo>
      </Container>
    );
  }
}
