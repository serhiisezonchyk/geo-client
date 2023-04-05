import {
  addProblemInfoPointLayer,
  removeProblemInfoPointLayer,
} from "../components/layers/ProblemInfoPointLayer";

import {
  addPublicBuildingPointLayer,
  removePublicBuildingPointLayer,
} from "../components/layers/PublicBuildingPoint";
import { fetchAllPublicBuildingPoint } from "../http/layers/publicBuildingPointApi";

import {
  addPublicBuildingPolygonLayer,
  removePublicBuildingPolygonLayer,
} from "../components/layers/PublicBuildingPolygon";
import { fetchAllPublicBuildingPolygon } from "../http/layers/publicBuildingPolygonApi";

import { fetchAllProblemInfoPointByCategories } from "../http/layers/problemInfoPointLayerApi";

export const switchLayers = (
  policyName,
  categoryId,
  checked,
  fetchAndHandleLayer,
  map
) => {
  switch (policyName) {
    case "public_building_point":
      fetchAndHandleLayer(
        fetchAllPublicBuildingPoint,
        addPublicBuildingPointLayer,
        removePublicBuildingPointLayer,
        policyName,
        map,
        checked
      );
      break;

    case "public_building_polygon":
      fetchAndHandleLayer(
        fetchAllPublicBuildingPolygon,
        addPublicBuildingPolygonLayer,
        removePublicBuildingPolygonLayer,
        policyName,
        map,
        checked
      );
      break;

    default:
      if (checked) {
        fetchAllProblemInfoPointByCategories({
          categoryProblemId: categoryId,
        }).then((data) => {
          if (map !== null) addProblemInfoPointLayer(map, data);
        });
      } else {
        removeProblemInfoPointLayer(map, categoryId);
      }
      break;
  }
};
