
import axios from "axios";

const RESTAURANT_SERVICE_BASE_URL = 'http://localhost:8040';

class RestaurantService {

    getRestaurant(id) {
        return axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurant/" + id);
    }

    getAllRestaurants(page, pageSize, priceCategories, ratings, sort, keywords) {

        console.log("execution: " + keywords.trim().replace(/ /g, ","));
        if (keywords.trim() === "") {
            return axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurants/all/" + page + "?pageSize=" + pageSize + "&priceCategories=" + encodeURI(priceCategories)
                + "&rating=" + ratings + "&sort=" + sort);
        } else {
            return axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurants/" + page + "?pageSize=" + pageSize + "&priceCategories=" + encodeURI(priceCategories)
                + "&rating=" + ratings + "&sort=" + sort + "&keywords=" + keywords.trim().replace(/ /g, ","));
        }
    }
}

export default new RestaurantService();