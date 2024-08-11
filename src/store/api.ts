import axios, { AxiosHeaders } from "axios";
// import { getCookie, setCookie } from 'typescript-cookie'
import { useRouter } from "next/navigation";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export const useApi = () => {
  const router = useRouter();
  const api = axios.create({
    baseURL:'https://blackbase-api.optico.dev/clients',
    // baseURL: '/'
  });

  api.interceptors.response.use(
    (response: any) => response, // Pass through successful responses
    async (error: any) => {
      // window.alert(error?.response?.data.message);
      console.log('status code', error?.response?.status);
      console.log(error?.response?.data.message);
      if (error.response?.status === 401) {
        router.push("/auth/login");
      } 
      return Promise.reject(error);
    }
  );

  const getHeaders = (privateAccess: boolean, secured?: boolean) => {
    const headers: AxiosHeaders = new AxiosHeaders();
    headers.setContentType("multipart/form-data");
    return headers;
  };

  const makeFormData = (obj: any) => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
    return formData;
  };

  const setTokens = (token: string, refershToken: string) => {
    sessionStorage.setItem("nj_token", token);
    sessionStorage.setItem("nj_refreshToken", refershToken);
  };

  const $get = async (path: string) => {
    try {
      const { data } = await api.get(path, {
        headers: getHeaders(false),
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      // console.log(err.message);
      return err?.response;
    }
  };

  const $post = async (
    path: string,
    body: any,
    privateAccess = true,
    secured = false
  ) => {
    const formData = makeFormData(body);
    try {
      const { data } = await api.post(path, formData);

      return data;
    } catch (err: any) {
      if (err.status) console.log(err);
      // console.log(err?.response);
      return err?.response;
      // window.alert(err?.response?.data.detail)
    }
  };

  const $put = async (path: string, body: any) => {
    try {
      const { data } = await api.put(path, body, {
        headers: getHeaders(true),
      });
      return data;
    } catch (err: any) {
      // console.log(err.respo);
      return err?.response;
    }
  };

  const $patch = async (path: string, body: any) => {
    try {
      const { data } = await api.patch(path, body, {
        headers: getHeaders(true),
      });
      return data;
    } catch (err: any) {
      return err?.response;
    }
  };

  const $delete = async (path: string, body?: any) => {
    try {
      const { data } = await api.delete(path, {
        headers: getHeaders(true),
        data: body,
      });
      return data;
    } catch (err: any) {
      // console.log(err.message);
      return err?.response;
    }
  };

  const $response = (q: { res: string; data?: any }) => {
    // console.log(q);
    const success = q?.res?.toLowerCase() === "success".toLowerCase();
    return { success, data: q.data };
  };

  const objToArray = (data: any): any[] => {
    // console.log(typeof data);
    if (typeof data !== "object") return data;
    const formatedData: any[] = [];
    Object.keys(data).map((item, i) => {
      const operation = Object.keys(data[item]).map((key, i) => ({
        id: key,
        date: item,
        ...data[item][key],
      }));
      formatedData.push(...operation);
    });
    return formatedData;
  };

  return {
    getHeaders,
    setTokens,
    $post,
    $get,
    $put,
    $patch,
    $delete,
    objToArray,
    $response,
  };
};
