import { $authHost, $host } from "./index";

export const createRole = async (brand) => {
  const { data } = await $authHost.post("api/role", brand);
  return data;
};

export const fetchAllRoles = async () => {
  const { data } = await $authHost.get("api/role");
  return data;
};

export const fetchOneRole = async (id) => {
  const { data } = await $authHost.get("api/role/" + id);
  return data;
};