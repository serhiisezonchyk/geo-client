import { $host } from "../index";
export const fetchAll = async () => {
  const { data } = await $host.get("api/userShapes");
  return data;
};
export const fetchOne = async (id) => {
  const { data } = await $host.get("api/userShapes/" + id);
  return data;
};
