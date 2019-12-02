import axios from 'axios';

const QUERY_API_URL = 'http://localhost:8080';
const QUERIES_API_URL = QUERY_API_URL + '/queries';

class QueryDataService {
  retriveAllQueries() {
    return axios.get(QUERIES_API_URL);
  }

  updateQuery(query) {
    return axios.put(QUERY_API_URL + '/update-query', {
      id: query.id,
      question: query.question,
      answer: query.answer
    });
  }

  createQuery(query) {

    return axios.post(QUERY_API_URL + '/post-query', {
      question: query.question,
      answer: query.answer
    });
  }

  deleteQuery(queryId) {
    return axios.delete(QUERY_API_URL + '/delete-query/' + queryId)
  }
}

export default new QueryDataService();