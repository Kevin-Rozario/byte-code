class ApiResponse {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.data = data;
    this.success = true;
    this.message = message;
  }
}
export default ApiResponse;
