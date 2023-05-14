import { $authHost } from "../index";
export const fetchAllPublicBuildingPolygon = async () => {
  const { data } = await $authHost.get("api/publicBuildingPolygon");
  return data;
};
export const fetchOne = async (id) => {
  const { data } = await $authHost.get("api/publicBuildingPolygon/" + id);
  return data;
};
