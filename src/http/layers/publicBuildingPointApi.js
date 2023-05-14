import { $authHost } from "../index";
export const fetchAllPublicBuildingPoint = async () => {
  const { data } = await $authHost.get("api/publicBuildingPoint");
  return data;
};
export const fetchOne = async (id) => {
  const { data } = await $authHost.get("api/publicBuildingPoint/" + id);
  return data;
};
