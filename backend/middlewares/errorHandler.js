
// add this to the end of the file of backend/server.js
// demo:
// import { errHandeler } from "./middlewares/errorHandler.js";
//...other codes ....
// app.use(errHandeler);
// remember to put this at the end of the file, after all the routes and middlewares
// otherwise, it will not work as expected 

export const errHandeler = (err, req, res, next) => {
    const statusCode = res.statusCode? res.statusCode : 500;

    res.status(statusCode)
    
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};
