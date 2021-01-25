import axios from "axios";

const API_URL = 'https://garbo-sds2.herokuapp.com';
//http://192.168.1.10:8080

export function fetchOrders(){
    return axios(`${API_URL}/orders`)
}

export function confirmDelivery(orderId: number) {
    return axios.put(`${API_URL}/orders/${orderId}/delivered`)
}