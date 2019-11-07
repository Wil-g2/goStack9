import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import api from '../../services/api';
import Container from '../../components/Container';
import { Loading } from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const [rep, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);
    this.setState({
      repositories: rep.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;
    console.log(issues, repository);
    if (loading) {
      return (
        <Loading>
          <ReactLoading type="spin" color="#fff" height={100} width={100} />
        </Loading>
      );
    }
    return (
      <Container>
        <div>
          <h1>Repositories</h1>
          <strong />
          <Link to="/">Voltar</Link>
        </div>
      </Container>
    );
  }
}
export default Repository;
