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
      error: null,
    };
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newRepo, repositories } = this.state;
      const res = await axios.get(`/repos/${newRepo}`);

      const data = {
        name: res.data.full_name,
      };

      if (newRepo === '') throw 'Informe o repositório do Github.';

      const hasRepo = repositories.find(r => r.name === newRepo);

      if (hasRepo) throw 'Existe repositórios duplicados.';

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
      localStorage.setItem('repositories', JSON.stringify(repositories));
    } catch (error) {
      alert(error);
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
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
    const { newRepo, repositories, loading, error } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt /> Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
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
