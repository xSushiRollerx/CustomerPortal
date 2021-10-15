import axios from "axios";
import jwt_decode from 'jwt-decode'

const USER_API_BASE_URL = 'http://localhost:8080/users';
const USER_API_BASE_URL_ADMIN = 'http://localhost:8080/admins';


class AdminService {

    getAllMatchingUsers(pattern){
        return axios.get(USER_API_BASE_URL_ADMIN + '/users?pattern=' + pattern);
    }

    updateUserRole(username, role){
        return axios.put(USER_API_BASE_URL_ADMIN + '/user/' + username +'/role', role);
    }

    read(){
        return axios.get(USER_API_BASE_URL + '/user/' + jwt_decode(localStorage.getItem("jwt")).sub);
    }

    readUser(username){
        return axios.get(USER_API_BASE_URL + '/user/' + username);
    }

    delete(){
        return axios.delete(USER_API_BASE_URL + '/user/' + jwt_decode(localStorage.getItem("jwt")).sub);
    }

    deleteUser(username){
        return axios.delete(USER_API_BASE_URL_ADMIN + '/user/' + username);
    }

}

export default new AdminService();
