import { $authHost, $host } from "./index";

export const createCategoryProblem = async (category_problem) => {
  const { data } = await $authHost.post("api/categoryProblem", category_problem);
  return data;
};

export const fetchAllCategoryProblem = async () => {
  const { data } = await $host.get("api/categoryProblem");
  return data;
};

export const fetchOneCategoryProblem = async (id) => {
  const { data } = await $host.get("api/categoryProblem/" + id);
  return data;
};