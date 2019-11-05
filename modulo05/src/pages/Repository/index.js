import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from '../../services/api';
import { Container } from './styles';

class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: '',
    };
  }

  componentDidMount() {
    this.getRepos();
  }

  getRepos = async () => {
    const { repository } = this.props.match.params;
    const res = await axios.get(`/repos/${decodeURIComponent(repository)}`);
    const { data } = res;
    console.log(data);
    this.setState({ repositories: data });
  };

  render() {
    const { repositories } = this.state;
    return (
      <Container>
        <div>
          <h1>Repositories</h1>
          <strong>{repositories.id}</strong>
          <Link to="/">Voltar</Link>
        </div>
      </Container>
    );
  }
}
export default Repository;
