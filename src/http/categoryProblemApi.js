import { $authHost, $host } from "./index";

export const createCategoryProblem = async (category_problem) => {
  const responce = await $authHost.post("api/categoryProblem", {
    name: category_problem.name,
  });
  return responce.data;
};

export const updateCategoryProblem = async (category_problem) => {
  const responce = await $authHost.put(
    "api/categoryProblem/" + category_problem.id,
    {
      name: category_problem.name,
    }
  );
  return responce.data;
};

export const deleteCategoryProblem = async (id) => {
  const responce = await $authHost.delete("api/categoryProblem/" + id);
  return responce.data;
};

export const fetchAllCategoryProblem = async () => {
  const { data } = await $host.get("api/categoryProblem");
  return data;
};

export const fetchOneCategoryProblem = async (id) => {
  const responce = await $host.get("api/categoryProblem/" + id);
  return responce.data;
};
