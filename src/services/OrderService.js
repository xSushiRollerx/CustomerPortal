
import axios from "axios";

const ORDER_SERVICE_BASE_URL = 'http://localhost:8041/customer/96/order';
//in final pull customer id from local storage
const jwtToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NiIsImV4cCI6MTYyNDMxMzA2MCwiaWF0IjoxNjIzOTUzMDYwfQ.JOMG41sXIYNdk-7pISREEvPhlil1tcwysm_7UCTCkP0';
//in final pull jwt from local storage
const config = {
    headers: {
        'Authorization': jwtToken
    }
};

class OrderService {

    submitOrder(foodOrder) {
        delete foodOrder.name;

        return axios.post((ORDER_SERVICE_BASE_URL), foodOrder, config).catch((err) => err);
    }

    getOrders(page, pageSize, sort) {

        console.log('Order Service Run');
        return axios.get(ORDER_SERVICE_BASE_URL + 's?page=' + page + "&pageSize=" + pageSize + "&sort=" + sort, config)
            .catch((err) => err);
    }


}

export default new OrderService();