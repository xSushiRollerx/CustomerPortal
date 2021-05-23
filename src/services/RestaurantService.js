
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

    getAllRestaurants(page, pageSize, priceCategories, ratings, sort, keywords) {
        console.log(encodeURI(keywords.trim().replace(" ", ", ")));
        if (keywords.trim() === "") {
            return axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurants/all/" + page + "?pageSize=" + pageSize + "&priceCategories=" + encodeURI(priceCategories)
                + "&rating=" + ratings + "&sort=" + sort);
        } else {
            console.log("in relevance instead");
            return axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurants/" + page + "?pageSize=" + pageSize + "&priceCategories=" + encodeURI(priceCategories)
                + "&rating=" + ratings + "&sort=" + sort + "&keywords=" + encodeURI(keywords.trim().replace(" ", ", ")));
        }
    }
}

export default new RestaurantService();