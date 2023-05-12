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
  const responce = await $host.get("api/policy/" + id);
  return responce.data;
};

export const updatePolicy = async (policy) => {
  const responce = await $authHost.put("api/policy/" + policy.id, {
    name: policy.name,
    label: policy.label,
    description: policy.description,
  });
  return responce.data;
};

export const deletePolicy = async (id) => {
  const responce = await $authHost.delete("api/policy/" + id);
  return responce.data;
};
