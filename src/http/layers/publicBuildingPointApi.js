import { $host } from "../index";
export const fetchAllPublicBuildingPoint = async () => {
  const { data } = await $host.get("api/publicBuildingPoint");
  return data;
};
export const fetchOne = async (id) => {
  const { data } = await $host.get("api/publicBuildingPoint/" + id);
  return data;
};
