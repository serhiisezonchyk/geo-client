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
export const updateRole = async (role) => {
  const responce = await $authHost.put("api/role/" + role.id, {
    name: role.name,
  });
  return responce.data;
};

export const deleteRole = async (id) => {
  const responce = await $authHost.delete("api/role/" + id);
  return responce.data;
};
