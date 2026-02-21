const errorMessages = {
  request: `We encountered an unexpected error while getting data for store <store>. Please try again or select another store`
}

const errors = {
  request: {
    message: `We encountered an unexpected error while getting data for store <store>. Please try again or select another store`,
    code: 'ERR_600',
    title: 'Unable to Load Data'
  }
}


const requestError = (store="Unknown") => {
  const err = errors.request;
  const errMsg = err.message.replace("<store>",store);
  return {
    ...err,
    message: errMsg,
  };
}

const Error = {
  requestError
}

export default Error;

