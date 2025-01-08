// let jsdate
// if (initialValues) {
//   jsdate = new Date(initialValues.datetime)
// }
export const makeInitialDate = (datetime) => {
  const jsInitialDate = new Date(datetime)
  return jsInitialDate
}

//시간 offset 잡는 부분도 나중에 만들어줘야 됨.
