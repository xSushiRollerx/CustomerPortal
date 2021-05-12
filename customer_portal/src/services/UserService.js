import axios from "axios";
import jwt_decode from 'jwt-decode'

const USER_API_BASE_URL = 'http://localhost:8080/users';

class UserService {

    register(user){
        return axios.post(USER_API_BASE_URL + '/user', user);
    }

    update(user){
        return axios.put(USER_API_BASE_URL + '/user/' + jwt_decode(localStorage.getItem("jwt")).sub, user);
    }

    read(){
        return axios.get(USER_API_BASE_URL + '/user/' + jwt_decode(localStorage.getItem("jwt")).sub);
    }

    delete(){
        return axios.delete(USER_API_BASE_URL + '/user/' + jwt_decode(localStorage.getItem("jwt")).sub);
    }

}

export default new UserService();
