import axios from 'axios'

const patient_list_url = 'http://localhost:8080';
const EMPLOYEE_API_BASE_URL = 'http://localhost:8080';
const patient_data_url = 'http://localhost:8080/124790';


class UserService {

    getUsers(){
        return axios.get(patient_list_url);
    }

    getData(){
        return axios.get(patient_data_url);
    }


getEmployees(){
    return axios.get(EMPLOYEE_API_BASE_URL);
}

addPrickData(selectedPatient){
    return axios.post(EMPLOYEE_API_BASE_URL +'/'+ selectedPatient);
}

addNote(employee,id){
    return axios.post(EMPLOYEE_API_BASE_URL +'/'+ id + '/addNote', employee) ;
}

getEmployeeById(employeeId){
    return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
}

updateEmployee(employee, employeeId){
    return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
}

deleteEmployee(employeeId){
    return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
}
}

export default new UserService();