const uploadFiles = (url, file, cb) => {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  var formData
  formData = new FormData()
  formData.append('file', file)

  xhr.onreadystatechange = function (res) {
    if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
      var resText = JSON.parse(xhr.responseText)
      typeof cb == "function" && cb(resText)
    } else if (xhr.status != 200 && xhr.responseText) {
      if (xhr.status == 403) {
      }
      return xhr.responseText
    }
  }
  xhr.send(formData)
}
export default uploadFiles