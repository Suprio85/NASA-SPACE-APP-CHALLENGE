class apiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { apiResponse }

//this is used to wrap the API response in a standard format
//see the user controller to see how it is used