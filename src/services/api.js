import axios from "axios";

export const getProducts = () =>
  axios.get("https://fakestoreapi.com/products");

export const getUsers = () =>
  axios.get("https://jsonplaceholder.typicode.com/users");
