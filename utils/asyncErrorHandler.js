// This function calls the controller that returns a promise
// if the promise is resolved then sends the response to client
// else passes the error to globalErrorHandler
export const asyncErrorHandler = (controller) => {
    return (req, res, next) => {
        const reqObject = {
            body: req.body,
            params: req.params,
            query: req.query,
            user: req.user,
        };

        controller(reqObject)
            .then((resp) => {
                // When promise resolves it sends the response with express
                res.status(resp.statusCode).json({
                    status: "success",
                    message: resp.message,
                    data: resp.data,
                });
            })
            .catch(next); // When error occurs, it pass that error to the globalErrorHandler
    };
};
