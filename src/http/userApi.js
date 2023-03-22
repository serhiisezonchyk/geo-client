import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createUser = async (email, password,roleId) => {
  const { data } = await $authHost.post("api/user/create", {
    email,
    password,
    roleId,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const fetchAllUsers = async () => {
  const { data } = await $authHost.get("api/user");
  return data;
};

export const deleteUser = async (productId, userId) => {
  const { data } = await $authHost.delete("api/user/" + productId, {
    params: { userId },
  });
  return data;
};