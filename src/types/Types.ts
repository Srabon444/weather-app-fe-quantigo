export type HttpHeaders = { [key: string]: string };

export enum HttpMethod {
  get = "GET",
  post = "POST",
  put = "PUT",
  patch = "PATCH",
  del = "DELETE",
}