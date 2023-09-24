import ApiError from "./ApiError.js";

const catch404 = (req, res, next) => {
    return next(new ApiError("Page not found", 404));
};

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal server error";

    if (process.env.NODE_ENV === "dev") {
        return res.status(statusCode).json({
            status: "failed",
            error: errorMessage,
            stack: err.stack,
        });
    }

    return res.status(statusCode).json({
        status: "failed",
        error: errorMessage,
    });
};

export { catch404, globalErrorHandler };
