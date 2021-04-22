/*
 * @Author: Song Qing
 * @Date: 2021-04-22 15:39:06
 * @LastEditTime: 2021-04-22 15:40:13
 * @LastEditor: Song Qing
 * @Description:
 * @FilePath: \app-test\src\utils\download.js
 */

export default function download(data, fileName) {
  const filename =
    fileName || data.headers['content-disposition'].replace('attachment; filename=', '')
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(new Blob([data.data]), decodeURIComponent(filename))
  } else {
    const url = window.URL.createObjectURL(new Blob([data.data]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', decodeURIComponent(filename))
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  }
}
