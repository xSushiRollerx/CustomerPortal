
import axios from "axios";

const RESTAURANT_SERVICE_BASE_URL = 'http://localhost:8040';

const RestaurantService = {

    getRestaurant: async function (id) {
        return axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurant/" + id);
    },

    getAllRestaurants: async function(page, pageSize, priceCategories, ratings, sort, keywords) {
        try {
            if (keywords.trim() === "") {
                let response = axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurants/all/" + page + "?pageSize=" + pageSize + "&priceCategories=" + encodeURI(priceCategories)
                    + "&rating=" + ratings + "&sort=" + sort);
                return response
            } else {
                let response = axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurants/" + page + "?pageSize=" + pageSize + "&priceCategories=" + encodeURI(priceCategories)
                    + "&rating=" + ratings + "&sort=" + sort + "&keywords=" + keywords.trim().replace(/ /g, ","));
                return response;
            }
        } catch (err) {

            return { data: "Error", status: 500 };
        }
    }
}

export default RestaurantService;