import { $host } from "../index";
export const fetchAllPublicBuildingPolygon = async () => {
  const { data } = await $host.get("api/publicBuildingPolygon");
  return data;
};
export const fetchOne = async (id) => {
  const { data } = await $host.get("api/publicBuildingPolygon/" + id);
  return data;
};
