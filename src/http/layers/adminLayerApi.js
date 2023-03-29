import { $host } from "../index";
export const fetchAll = async () => {
  const { data } = await $host.get("api/adminShapes");
  return data;
};
export const fetchOne = async (id) => {
  const { data } = await $host.get("api/adminShapes/" + id);
  return data;
};
