export const sortFn = (data, sortField) => {
    let sortedData = [...data]
    console.log("sortFn fired")
    console.log(sortedData)
    console.log(sortField)
    if (sortField !== null) {
        sortedData.sort((a, b) => {
            console.log(a[sortField])
            console.log(b[sortField])
          if (a[sortField] < b[sortField]) {
            return -1;
          }
          if (a[sortField] > b[sortField]) {
            return 1;
          }
          return 0;
        });
      }
      console.log(sortedData)
      return sortedData
}