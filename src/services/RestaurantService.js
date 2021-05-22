
import axios from "axios";

const RESTAURANT_SERVICE_BASE_URL = 'http://localhost:8040';
//in final pull customer id from local storage
const jwtToken = /**localStorage.get('jwt') **/'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NiIsImV4cCI6MTYyMTcyNTcwNSwiaWF0IjoxNjIxMzY1NzA1fQ.L3dwZBkgfjKCoqGFDuw_JQg1uVrIRcRvGTClUEYlNHE';
//in final pull jwt from local storage
const config = {
    headers: {
        'Authorization': jwtToken
    }
};

class RestaurantService {

    getRestaurant(id) {
        return axios.get((RESTAURANT_SERVICE_BASE_URL) + "/" + id, config);
    }

    getAllRestaurants(page, pageSize) {
        // example url http://localhost:8040/restaurants/all/2?active=1&pageSize=10&priceCategories=1%2C2%2C3%2C4&rating=0&sort=default
        return axios.get((RESTAURANT_SERVICE_BASE_URL) + "/restaurants/all/" + page + "?pageSize=" + pageSize);
    }
}

export default new RestaurantService();