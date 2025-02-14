import axios from "axios";
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);
const GetResumes = (user_email) =>
  axiosClient.get("/user-resumes?filters[user_email][$eq]=" + user_email);
const UpdateResume = (id, data) => axiosClient.put("/user-resumes/" + id, data);
const GetResumeById = (id) =>
  axiosClient.get("/user-resumes/" + id + "?populate=*");
const DeleteResumeById = (id) => axiosClient.delete("/user-resumes/" + id);

export default {
  GetResumes,
  UpdateResume,
  GetResumeById,
  CreateNewResume,
  DeleteResumeById,
};
