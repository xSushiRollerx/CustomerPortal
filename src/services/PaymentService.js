
import axios from "axios";

const PAYMENT_SERVICE_BASE_URL = 'http://localhost:8043/payment';
const jwtToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NiIsImV4cCI6MTYyMzc3ODU3MywiaWF0IjoxNjIzNDE4NTczfQ.v939q-BUHDRxg8LWXm15DCFQCcnS2d8rDaK_gpI9GEI';
//in final pull jwt from local storage
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