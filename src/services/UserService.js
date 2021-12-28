import axios from 'axios'

const patient_list_url = 'http://localhost:8080';
const patient_data_url = 'http://localhost:8080/124790';

class UserService {

    getUsers(){
        return axios.get(patient_list_url);
    }

    getData(){
        return axios.get(patient_data_url);
    }
}

export default new UserService();