

const withAsyncFetching = (Component,requests) => {
  return function AsyncComponent(props){
    return <Component data={[]} {...props} />
  }
}