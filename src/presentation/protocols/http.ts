export interface HttpRequest {
  body?: any;
  header?: any;
  params?: any;
}

export interface HttpResponse {
  body: any;
  statusCode: any;
}
