import axios from "axios";
import jwt from 'jwt-decode'

const USER_API_BASE_URL = 'http://localhost:8080/users';

class UserService {

    register(user){
        return axios.post(USER_API_BASE_URL + '/user', user);
    }

    update(user){
        return axios.put(USER_API_BASE_URL + '/user/' + user.username, user);
    }

    read(){
        return axios.get(USER_API_BASE_URL + '/user/' + JSON.parse(jwt(localStorage.getItem("jwt").username)));
    }

    delete(){
        return axios.get(USER_API_BASE_URL + '/user/' + JSON.parse(jwt(localStorage.getItem("jwt")).username),{
            headers: {
                'Authorization': localStorage.getItem("jwt")
            }
        })
    }

}

export default new UserService();