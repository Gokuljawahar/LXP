import apiClient from "../../../config/apiClient";
import { API_ENDPOINTS } from "../../../constants/apiEndpoints";

export const getCourseWiseEnrollmentCount = async () => {
  const response = await apiClient.get(API_ENDPOINTS.admin.courseWiseEnrollmentCount);
  return response.data?.data || [];
};

export const getTotalLearners = async () => {
  const response = await apiClient.get(API_ENDPOINTS.admin.totalLearners);
  return response.data?.data || 0;
};
