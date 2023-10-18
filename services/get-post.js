import useSWR from "swr";
import { fetcher } from "../api/configs/axiosConfig";
import { mapResponse } from "../utils/mapResponse";
import useCustomSWR from "../utils/utils";

const getPosts = () => {
  const res = useCustomSWR("http://54.169.108.176:8000/api/posts", fetcher, {
    revalidateOnFocus: true,
  });
  return mapResponse(res);
};

export default getPosts;
