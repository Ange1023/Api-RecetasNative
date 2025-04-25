export class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.statusCode = statusCode; // Código HTTP (ej: 400, 404, 500)
        this.details = details;      // Detalles adicionales (útil ya que estamos en desarrollo)
        this.isOperational = true;   // Marca errores controlados vs. errores críticos
        Error.captureStackTrace(this, this.constructor); // Mejor depuración
    }
    
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    const response = {
        success: false,
        message: err.message || 'Error interno del servidor',
    };

        response.stack = err.stack; // Solo en desarrollo
        response.details = err.details || null;
    

    res.status(err.statusCode).json(response);
};

export const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next); // Atrapa errores y los pasa a errorMiddleware
};

