
export const successResponse = ( statusCode = 200, message = "successfully completed", payload: Record<string, any> = []) => {

    return {
        success: true,
        message,
        statusCode,
        payload
    }
}
export const errorResponse = (statusCode = 500, message="Something went wrong", payload: Record<string, any> = {}) => {

    return {
        success: false,
        statusCode,
        message,
        payload
    }
}