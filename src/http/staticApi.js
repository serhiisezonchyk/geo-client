import { $authHost, $host } from "./index";

export const uploadImg = async (formData) => {
  const { data } = await $authHost.post("api/static", formData);
  return data;
};

export const unloadImg = async (fileName) => {
    const { data } = await $authHost.delete("api/static/" + fileName);
    return data;
  };
  