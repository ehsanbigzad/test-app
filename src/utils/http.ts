import axios, {type AxiosError, AxiosRequestConfig} from 'axios';

/**
 * Create axios instance
 */
const http = axios.create({
  baseURL: 'https://test-api-mf85.onrender.com',
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});

/**
 * Axios request interceptor
 */
http.interceptors.request.use(async request => {
  if (!request.headers) {
    request.headers = {};
  }

  return request;
});

/**
 * Add a response interceptor
 */
http.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Create a http get request
 */
export async function getHttp<T = any>(
  endpoint: string,
  params?: Object,
  config?: AxiosRequestConfig<any> | undefined,
): Promise<T> {
  try {
    const response = await http.get<T>(endpoint, {params, ...config});
    return response.data;
  } catch (error: any) {
    throw new HttpError(error);
  }
}

/**
 * Create a http post request
 */
export async function postHttp<T = any>(
  endpoint: string,
  data?: Object,
  config?: AxiosRequestConfig<any> | undefined,
): Promise<T> {
  try {
    const response = await http.post<T>(endpoint, data, config);
    return response.data;
  } catch (error: any) {
    throw new HttpError(error);
  }
}

/**
 * Create a http put request
 */
export async function putHttp<T = any>(
  endpoint: string,
  data?: Object,
  config?: AxiosRequestConfig<any> | undefined,
): Promise<T> {
  try {
    const response = await http.put<T>(endpoint, data, config);
    return response.data;
  } catch (error: any) {
    throw new HttpError(error);
  }
}

/**
 * Create a http patch request
 */
export async function patchHttp<T = any>(
  endpoint: string,
  data?: Object,
  config?: AxiosRequestConfig<any> | undefined,
): Promise<T> {
  try {
    const response = await http.patch<T>(endpoint, data, config);
    return response.data;
  } catch (error: any) {
    throw new HttpError(error);
  }
}

/**
 * Create a http delete request
 */
export async function deleteHttp<T = any>(
  endpoint: string,
  params?: Object,
  config?: AxiosRequestConfig<any> | undefined,
): Promise<T> {
  try {
    const response = await http.delete<T>(endpoint, {params, ...config});
    return response.data;
  } catch (error: any) {
    throw new HttpError(error);
  }
}

/**
 * HttpError
 */
export class HttpError {
  private error: AxiosError;

  constructor(error: AxiosError) {
    this.error = error;
  }

  public get getError() {
    return this.error;
  }

  public get isValidation() {
    return this.error.response?.status === 422;
  }

  public get getOriginal() {
    return this.error.response?.data;
  }
}

export default http;
