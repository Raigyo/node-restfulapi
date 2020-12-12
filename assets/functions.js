exports.success = function (result){
  return {
    status: 'success',
    result: result
  }
}

exports.error = function (message){
  return {
    status: 'error',
    result: message
  }
}

// Check if the request send an error
exports.isErr = (err) => {
  return err instanceof Error;
}

// Send success or error
exports.checkAndChange = (obj) => {
  if (this.isErr(obj)) {
    return this.error(obj.message);
  } else {
    return this.success(obj);
  }
}