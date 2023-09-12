export function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search)
  let data: any = {}
  for (let pair of urlParams.entries()) {
    data[pair[0]] = pair[1]
  }
  return data
}
