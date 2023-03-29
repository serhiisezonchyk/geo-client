import { $host } from "../index";

export const createProblemInfoPoint = async (category_problem) => {
  const { data } = await $host.post("api/problemInfoPoint", category_problem);
  return data;
};

export const fetchAllProblemInfoPoint = async () => {
    const { data } = await $host.get("api/problemInfoPoint");
    return data;
  };

export const fetchAllProblemInfoPointByCategories = async (categoryProblemId) => {
  const { data } = await $host.get("api/problemInfoPoint/categories", {
    params: { categoryProblemId},
  });
  return data;
};

export const fetchOneProblemInfoPoint = async (id) => {
  const { data } = await $host.get("api/problemInfoPoint/" + id);
  return data;
};
