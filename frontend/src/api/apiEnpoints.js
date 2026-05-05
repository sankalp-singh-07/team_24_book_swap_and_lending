import BASE_URL from "./apiConfig";

export const apiEndpoints = {
  GET_BOOKS: `${BASE_URL}/book`,
  GET_BOOK_DETAILS: (id) => `${BASE_URL}/book/${id}`,
  SEARCH_BOOKS: (query, location = "", type = "") =>
    `${BASE_URL}/book/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&type=${encodeURIComponent(type)}`,
    ADD_BOOK: `${BASE_URL}/book`,
    UPDATE_BOOK: (id) => `${BASE_URL}/book/${id}`,
    DELETE_BOOK: (id) => `${BASE_URL}/book/${id}`,
    SIGNUP: `${BASE_URL}/user/signup`,
    LOGIN: `${BASE_URL}/user/login`,
    CREATE_REQUEST: `${BASE_URL}/requests`,
    GET_MY_REQUESTS: (userId) => `${BASE_URL}/requests/user/${userId}`,
    GET_OWNER_REQUESTS: (ownerId) => `${BASE_URL}/requests/owner/${ownerId}`,
    UPDATE_REQUEST_STATUS: (requestId) => `${BASE_URL}/requests/${requestId}/status`,
    GET_NOTIFICATIONS: (userId) => `${BASE_URL}/notifications/${userId}`,
    MARK_NOTIFICATION_READ: (notificationId) => `${BASE_URL}/notifications/${notificationId}/read`,
    ADD_TO_CART: `${BASE_URL}/cart/add`,
    GET_USER_PROFILE: (userId) => `${BASE_URL}/user/${userId}`,
    GET_USER_ORDERS: (userId) => `${BASE_URL}/user/${userId}/orders`,
    GET_CART_ITEMS: (userId) => `${BASE_URL}/cart/${userId}`,
    UPDATE_CART_ITEM: (userId, itemId) => `${BASE_URL}/cart/update/${userId}/${itemId}`,
    REMOVE_FROM_CART: (userId, itemId) => `${BASE_URL}/cart/remove/${userId}/${itemId}`,
    
};
