
import axios from "axios";

const CUSTOMER_ORDER_SERVICE_BASE_URL = 'http://localhost:8040/customer/96/order/';
//in final pull customer id from local storage
const jwtToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NiIsImV4cCI6MTYyMDAxOTA2MSwiaWF0IjoxNjE5NjU5MDYxfQ.uXVeSnPZZjwFZqKIlDWyq2-5BdWu05AfMLnSIgh9YLs';
//in final pull jwt from local storage
const config = {
    headers: {
        'Authorization': jwtToken
    }
};

class CustomerOrderService {

    submitOrder(foodOrder) {
        return axios.post((CUSTOMER_ORDER_SERVICE_BASE_URL), {foodOrder}, config);
    }


}

export default new CustomerOrderService();