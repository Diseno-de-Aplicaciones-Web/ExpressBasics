export function errorsHandler (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error("Main error handler:", err.stack);
    res.sendStatus(500);
};