import axios from "axios";

const USER_API_BASE_URL = 'http://localhost:8080/users';

export default class UserService {

    register(user){
        return axios.post(USER_API_BASE_URL + '/user', user)
    }

}