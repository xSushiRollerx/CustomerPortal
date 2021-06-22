
import axios from "axios";

const CUSTOMER_ORDER_SERVICE_BASE_URL = 'http://localhost:8041/customer/96/order/';
//in final pull customer id from local storage
const jwtToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NiIsImV4cCI6MTYyMTAxNzI5MiwiaWF0IjoxNjIwNjU3MjkyfQ.nwvKUE8mle4asJ0tLIam_OB2ABK09Ll1EYNPEe2Etx0';
//in final pull jwt from local storage
const config = {
    headers: {
        'Authorization': jwtToken
    }
};

class CustomerOrderService {

    submitOrder(foodOrder) {
        delete foodOrder.name;

        axios.post((CUSTOMER_ORDER_SERVICE_BASE_URL), foodOrder, config).catch((err) => err);
    }


}

export default new CustomerOrderService();