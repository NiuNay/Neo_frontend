import axios from 'axios'

const patient_list_url = 'https://neo-monitoring.herokuapp.com';

class UserService {

    getUsers(){
        return axios.get(patient_list_url);
    }

    getData(id){
        return axios.get(patient_list_url +'/' + id);
    }

    addCalibration(calibration, id) {
        return axios.post(patient_list_url +'/'+ id + '/addCalibration', calibration) ;
    }

    addDelay(delay, id) {
        return axios.post(patient_list_url +'/'+ id + '/addDelay', delay) ;
    }

    addPrickData(patient, id) {
        return axios.post(patient_list_url +'/'+ id + '/addPrickData', patient) ;
    }

    addNote(patient,id){
        return axios.post(patient_list_url +'/'+ id + '/addNote', patient) ;
    }

    getPatientById(id){
        return axios.get(patient_list_url + '/' + id);
    }

}

export default new UserService();