import { inst } from "common/request"
import { api } from "common/api"
import { isNull } from "utils/isNull"
import { message } from "antd"

export async function getInst(url, params) {
  return inst({
    method: "get",
    url,
    params,
  })
}

export function postInst(url, params) {
  return inst({
    method: "post",
    url,
    data: params,
  })
}

export function putInst(url, params) {
  return inst({
    method: "put",
    url,
    data: params,
  })
}

export async function deleteInst(url, params) {
  return inst({
    method: "delete",
    url,
    params,
  })
}

/* 不为空 */
export function stopToApi(arr) {
  console.log("arr", arr)
  let flag = true
  for (let i = 0; i < arr.length; i++) {
    if (isNull(arr[i].data)) {
      // console.log("arr", arr[i])
      message.info(arr[i].title)
      flag = false
      break
    }
  }
  return flag
}

/* 获取七牛云token */
export async function getQiNiu() {
  const res = await postInst(api.qiNiuToken)
  if (res) {
    return res
  } else {
    return false
  }
}

/* 上传图片随机名 xggs_******** */
export function randomCount() {
  let r = Math.floor(Math.random() * 1000000000)
  let f = Math.floor(Math.random() * 1000000000)
  let d = Date.parse(new Date())
  return `img_name${d}${r}${f}`
}

/* 图片上传 - 前置钩子 */
export function beforeUpload(file) {
  const isJpgOrPng =
    file.type == "image/jpeg" ||
    file.type == "image/jpg" ||
    file.type == "image/png"
  if (!isJpgOrPng) {
    message.error("您只能上传jpg/png格式的文件")
  }
  const isLt5M = file.size / 1024 / 1024 < 20
  if (!isLt5M) {
    message.error("图片大小不能超过20M")
  }
  return isJpgOrPng && isLt5M
}

/* editor编辑器设置 */
export function setEditor(editor) {
  /* 配置菜单栏，删减菜单，调整顺序  关闭全屏 隐藏网络图片 上传地址 上传图片名称 上传额外参数 
    配置alt选项 配置超链接 一次传几张图片 配置富文本响应时间  配置onchange回调函数 自定义上传文件方法
  */
  editor.config.menus = [
    "bold",
    "head",
    "italic",
    "justify",
    "fontSize",
    "image",
    "video",
  ]
  editor.config.showFullScreen = false
  editor.config.showLinkImg = false
  editor.config.uploadImgServer = api.editorUrl
  editor.config.uploadFileName = "file[]"
  editor.config.showLinkImgAlt = false
  editor.config.showLinkImgHref = false
  editor.config.uploadImgMaxLength = 5
  editor.config.onchangeTimeout = 1000

  editor.config.uploadVideoServer = api.editorUrl
  editor.config.showLinkVideo = false
  editor.config.uploadVideoName = "file[]"
}
