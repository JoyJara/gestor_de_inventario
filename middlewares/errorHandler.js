module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    // En dev: ver stack en consola
    if (req.app.get('env') === 'development') {
        console.error(err.stack);
    }
    res.status(status).json({
        error: {
            message: err.message,
            // incluir stack solo en desarrollo:
            ...(req.app.get('env') === 'development' && { stack: err.stack }),
        }
    });
};
