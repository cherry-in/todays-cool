const catchErrors = (error, displayError) => {
    let errorMsg
    if (error.response) {
        errorMsg = error.response.data
        console.log('Error response:', errorMsg)
    } else if (error.request) {
        errorMsg = error.request
        console.log('Error request:', errorMsg)
    } else {
        errorMsg = error.message
        console.log('Error message:', errorMsg)
    }
    displayError(errorMsg)
    alert(errorMsg)
}

export default catchErrors