export function errorHandler(err,req,res,next){
    const responce = {
        message: err.message
    }

    if(process.env.NODE_ENVIRONMENT == "development"){
        responce.stack = err.stack
    }

    res.status(err.status || 500).json(responce)
}