class appError extends Error {
  constructor(){
    super();
  }
  create(message, statusCode, stack){
    this.message = message;
    this.statusCode = statusCode;
    return this;
  }
}

export default appError;