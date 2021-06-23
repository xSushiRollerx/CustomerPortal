
import axios from "axios";

const CUSTOMER_ORDER_SERVICE_BASE_URL = 'http://localhost:8041/customer/96/order/';


class CustomerOrderService {

    submitOrder(foodOrder) {
        delete foodOrder.name;

        const jwtToken = 'Bearer ' + localStorage.getItem('jwt');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            }
        };

        axios.post((CUSTOMER_ORDER_SERVICE_BASE_URL), foodOrder, config).catch((err) => err);
    }


}

export default new CustomerOrderService();