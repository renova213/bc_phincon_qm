export default interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
