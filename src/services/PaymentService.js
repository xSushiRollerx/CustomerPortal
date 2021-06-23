
import axios from "axios";

const PAYMENT_SERVICE_BASE_URL = 'http://localhost:8043/payment';


class RestaurantService {

    getClientSecret() {
        const jwtToken = 'Bearer ' + localStorage.getItem('jwt');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            }
        };

        return axios.post((PAYMENT_SERVICE_BASE_URL), localStorage.getItem('orders'), config);
    }
}

export default new RestaurantService();