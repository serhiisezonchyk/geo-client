import { $authHost, $host } from "./index";

export const createPolicy = async (policy) => {
  const { data } = await $authHost.post("api/policy", policy);
  return data;
};

export const fetchAllPolicies = async () => {
  const { data } = await $authHost.get("api/policy");
  return data;
};

export const fetchOneRole = async (id) => {
  const { data } = await $authHost.get("api/policy/" + id);
  return data;
};

export const updatePolicy = async (id, policy) => {
    const { data } = await $authHost.put("api/policy/" + id, policy);
    return data;
  };
  
  export const deletePolicy = async (id) => {
    const { data } = await $authHost.delete("api/policy/" + id);
    return data;
  };