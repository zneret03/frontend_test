import axios from "axios";
import { axiosService } from "../axios-interception";

export const fetchUser = async () => {
  try {
    const response = await axiosService.get(`/users`);

    return response.data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.error;
    }
  }
};
