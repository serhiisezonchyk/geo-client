import { $authHost, $host } from "./index";

export const createRolePolicy = async (rolepolicy) => {
  const { data } = await $authHost.post("api/rolepolicy", rolepolicy);
  return data;
};

export const fetchAllRolePolicy = async () => {
  const { data } = await $authHost.get("api/rolepolicy");
  return data;
};

export const fetchOneRolePolicy = async (id) => {
  const { data } = await $authHost.get("api/rolepolicy/" + id);
  return data;
};

export const updateRolePolicy = async (id, rolepolicy) => {
    const { data } = await $authHost.put("api/rolepolicy/" + id, rolepolicy);
    return data;
  };
  
  export const deleteRolePolicy = async (id) => {
    const { data } = await $authHost.delete("api/rolepolicy/" + id);
    return data;
  };