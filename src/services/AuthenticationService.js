import axios from "axios";

const AUTH_API_URL = 'http://localhost:8080/authenticate';

class AuthenticationService {

    login(authrequest){
        return axios.post(AUTH_API_URL, authrequest)
    }
}

export default new AuthenticationService();