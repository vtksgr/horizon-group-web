import api from "./axios";

export const fetchHomePosts = async () => {
  const res = await api.get("/api/posts", { params: { page: 1, limit: 3 } });
  return res.data?.data || [];
};

export const fetchHomeJobs = async () => {
  const res = await api.get("/api/jobs");
  const jobs = res.data?.data || [];
  return jobs.slice(0, 3);
};
