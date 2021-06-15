
import axios from "axios";

const PAYMENT_SERVICE_BASE_URL = 'http://localhost:8043/payment';
const jwtToken = 'Bearer ' + localStorage.getItem('jwt');
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtToken
    }
};

class RestaurantService {

    getClientSecret() {
        console.log("getting secret");
        return axios.post((PAYMENT_SERVICE_BASE_URL), localStorage.getItem('orders'), config);
    }
}

export default new RestaurantService();