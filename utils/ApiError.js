class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;

        // Creates a this.stack property on the ApiErro class instance
        // which will be used in dev environment
        Error.captureStackTrace(this);
    }
}

export default ApiError;
