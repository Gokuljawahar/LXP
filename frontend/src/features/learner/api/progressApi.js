import apiClient from "../../../config/apiClient";
import { API_ENDPOINTS } from "../../../constants/apiEndpoints";
import { watchTimeToSeconds } from "../helpers/progressHelpers";

export const getLearnerMaterialWatchTime = async ({ learnerId, materialId }) => {
  if (!learnerId || !materialId) {
    return 0;
  }

  const response = await apiClient.get(API_ENDPOINTS.learner.watchTime, {
    params: {
      LearnerId: learnerId,
      MaterialId: materialId,
    },
  });

  const watchTime = response.data?.data?.watchTime;
  return watchTimeToSeconds(watchTime);
};
