import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8085/transfer';

class ApiService {

    fetchTransfers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchTransferById(txId) {
        return axios.get(USER_API_BASE_URL + '/' + txId);
    }

    cancelTransfer(txId) {
        return axios.delete(USER_API_BASE_URL + '/' + txId);
    }

    createTransfer(user) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    executeTransfer(txId) {
        return axios.put(USER_API_BASE_URL + '/' + txId);
    }

}

export default new ApiService();