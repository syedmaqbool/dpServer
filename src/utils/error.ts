
class ErrorCustom {
    status: Number;
    message: String;
}

export const createError = (status:Number,message:String)=>{
    const err = new ErrorCustom();
    err.status = status;
    err.message = message
    return err;
}
