import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import api from '../../services/api';
import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssueFilter, Pagination } from './styles';

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
    filterIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const [rep, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: rep.data,
      issues: issues.data,
      loading: false,
    });
  }

  filterList = event => {
    const { issues } = this.state;
    const filter = issues.filter(issue => {
      return issue.state === event.target.value;
    });

    console.log(filter);
  };

  pagination = page => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    if (!page === undefined || !page === null) {
      api.get(`/repos/${repoName}/issues?page=${page}`, {
        params: {
          per_page: 5,
        },
      });
    }
  };

  render() {
    const { repository, issues, loading, filters } = this.state;
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
        <Owner>
          <Link to="/">Voltar</Link>
          <img src={repository.owner.avatar_url} alt="repository.owner.login" />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <IssueFilter>
            <select id="filter" onChange={this.filterList}>
              <option value="all">Todas</option>
              <option value="open">Aberta</option>
              <option value="closed">Fechada</option>
            </select>
          </IssueFilter>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <Pagination>
            <button>Antirior</button>
            <button>Proximo</button>
          </Pagination>
        </IssueList>
      </Container>
    );
  }
}
export default Repository;
