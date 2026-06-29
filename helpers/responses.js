

const errorResponse = (res , stausCode = 200,message,data)=>{
return res.status(stausCode).json({
    staus: stausCode, success= false, error: message,data
})
}
const successResponse = (res , stausCode = 200,message,data)=>{
return res.status(stausCode).json({
    staus: stausCode, success= true, error: message,data
})
}




module.exports = {errorResponse, successResponse}
