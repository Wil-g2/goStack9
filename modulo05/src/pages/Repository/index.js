import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import Select from 'react-select';
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
    filters: [
      { value: 'all', label: 'Todas' },
      { value: 'open', label: 'Abertas' },
      { value: 'closed', label: 'Fechadas' },
    ],
    selectedValue: { value: 'all', label: 'Todas' },
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

  handleChange = async selectedValue => {
    await this.setState({ selectedValue, page: 1 }, () => this.pagination());
  };

  pagination = async () => {
    const { match } = this.props;
    const { selectedValue, page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: selectedValue.value,
        per_page: 5,
        page,
      },
    });
    this.setState({ issues: response.data });
  };

  prevPage = () => {
    const { page } = this.state;
    if (page > 1) {
      const pageNumber = page - 1;
      this.setState({ page: pageNumber });
      this.pagination();
    }
  };

  nextPage = () => {
    const { page } = this.state;
    const pageNumber = page + 1;
    this.setState({ page: pageNumber });
    this.pagination();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      page,
      filters,
      selectedValue,
    } = this.state;

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
            <Select
              options={filters}
              onChange={this.handleChange}
              value={selectedValue}
              defaultValue={filters[1]}
            />
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
            <button type="button" onClick={this.prevPage} disabled={page < 2}>
              Antirior
            </button>
            <span>Página {page}</span>
            <button type="button" onClick={this.nextPage}>
              Proximo
            </button>
          </Pagination>
        </IssueList>
      </Container>
    );
  }
}
export default Repository;
