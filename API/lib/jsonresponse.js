/* A function that returns a JSON object. */
exports.jsonResponse = function(statuscode,body){
    return {
        statuscode, 
        body: body
    }
}
