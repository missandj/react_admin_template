import React, { Component } from "react"
import {
  Space,
  Input,
  Select,
  Modal,
  Upload,
  message,
  Button,
  DatePicker,
  Radio,
} from "antd"
import { PlusOutlined, LinkOutlined } from "@ant-design/icons"
import moment from "moment"
import E from "wangeditor"
import * as y from "utils/methods"
import { api } from "common/api"
import { isNull } from "utils/isNull"
import fmImg from "assets/fm.png"
import "./css/memodal.css"

const { Option } = Select

export default class MeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {
        radioV: 1,
      },
      qiToken: "",
      editor: null,
      category: [],
    }
  }
  render() {
    const { addOrEditIsShow, page, modaltype } = this.props.data
    return (
      <div>
        <Modal
          className="addOrEditModal"
          width="50%"
          title={
            modaltype && modaltype === 1
              ? "添加"
              : modaltype === 2
              ? "编辑"
              : "删除"
          }
          okText="确认"
          cancelText="取消"
          maskClosable={false}
          visible={addOrEditIsShow}
          onOk={this.modalOk}
          onCancel={() => this.props.cancleFn({ isrefresh: false })}
        >
          {page == "TestRouter" && modaltype !== 3
            ? this.modalTestRouter()
            : ""}

          {modaltype === 3 ? this.delModal() : ""}
        </Modal>
      </div>
    )
  }

  modalTestRouter = () => {
    const { formData, qiToken, category } = this.state
    return (
      <>
        <div className="modalInputLine">
          <Space size="large">
            <span className="modalTitle_line">标题</span>
            <Input
              className="modalInput_width"
              placeholder="请输入标题"
              name="name"
              value={formData.name}
              onChange={this.formChange}
            />
          </Space>
        </div>
        <div className="modalInputLine">
          <Space size="large">
            <span className="modalTitle_line">所属分类</span>
            <Select
              notFoundContent="暂无数据"
              placeholder="请选择"
              style={{ width: 420 }}
              name="type"
              value={formData.type}
              onChange={(value, option) =>
                this.selectChange(value, option, "type")
              }
            >
              {category &&
                category.map((item, index) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
            </Select>
          </Space>
        </div>
        <div className="modalInputLine">
          <Space size="large">
            <span className="modalTitle_line">添加图片</span>
            <div className="uploadImg">
              <Upload
                className="avatar-uploader"
                showUploadList={false}
                maxCount={1}
                action={api.qiNiuUrl}
                data={{ token: qiToken, key: y.randomCount() }}
                beforeUpload={this.beforeUpload}
                onChange={(info) => {
                  this.fileUploadChange(info, "cover")
                }}
              >
                <div>
                  <img
                    src={formData.cover ? api.fileUrl + formData.cover : fmImg}
                    className="uploadingImg"
                    style={{ width: "100px" }}
                  />
                  <Button icon={<PlusOutlined />}>添加</Button>
                </div>
              </Upload>
            </div>
          </Space>
        </div>
        <div className="modalInputLine">
          <Space size="large">
            <span className="modalTitle_line">上传视频</span>
            <Upload
              action={api.qiNiuUrl}
              data={{ token: qiToken, key: y.randomCount() }}
              maxCount={1}
              showUploadList={false}
              beforeUpload={(file) => {
                const is2m = file.size / 1024 / 1024 < 500
                if (!is2m) {
                  console.log("文件不能大于500M")
                } else {
                  console.log("文件file", file)
                }
              }}
              onChange={(info) => {
                this.fileUploadChange(info, "video")
              }}
            >
              <Button icon={<PlusOutlined />}>上传</Button>
            </Upload>
            {!isNull(formData.video) && (
              <Space size="small">
                <LinkOutlined />
                {formData.video}
              </Space>
            )}
          </Space>
        </div>
        <div className="modalInputLine">
          <Space size="large">
            <span className="modalTitle_line">内容</span>
            <div id="editor"></div>
          </Space>
        </div>

        <div className="modalInputLine">
          <Space size="large">
            <span className="modalTitle_line">活动日期</span>
            <DatePicker
              className="modalInput_width"
              placeholder="请输入活动日期"
              name="activity_date"
              value={
                !isNull(formData.activity_date)
                  ? moment(formData.activity_date)
                  : false
              }
              format={"YYYY-MM-DD"}
              onChange={(date, dateString) => {
                this.setState({
                  formData: {
                    ...this.state.formData,
                    activity_date: dateString,
                  },
                })
              }}
            />
          </Space>

          <div className="modalInputLine">
            <Space size="large">
              <span className="modalTitle_line">性别</span>
              <Radio.Group
                onChange={this.formChange}
                name="radioV"
                value={formData.radioV}
              >
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
            </Space>
          </div>
        </div>
      </>
    )
  }
  delModal = () => {
    return <p>是否确认删除该内容?</p>
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    // console.log("-this.props-", this.props)
    const { modaltype, page } = this.props.data
    modaltype !== 3 && this.setEditor()
    this.handleGetQiNiu()
    modaltype === 2 && this.getEditForm()
    page == "TestRouter" && this.getClasscate()
  }

  handleGetQiNiu = async () => {
    this.setState({
      qiToken: await y.getQiNiu(),
    })
  }

  formChange = (e) => {
    const { name, type, value, checked } = e.target
    let obj = {
      [name]: type == "checkbox" ? checked : value,
    }
    this.setState({
      formData: { ...this.state.formData, ...obj },
    })
  }

  selectChange = (value, option, name) => {
    const { page, modaltype } = this.props.data
    let obj = {
      [name]: value,
    }
    this.setState({
      formData: { ...this.state.formData, ...obj },
    })
  }

  setEditor = () => {
    if (!this.state.editor) {
      this.setState(
        {
          editor: new E("#editor"),
        },
        () => {
          const { editor } = this.state
          y.setEditor(editor)
          editor.config.onchange = (content) => {
            // console.log("change 之后最新的 html", content)
            this.setState({
              formData: {
                ...this.state.formData,
                content: content,
              },
            })
          }
          //自定义文件上传方法
          editor.config.customUploadImg = (resultFiles, insertImgFn) => {
            this.uploadingImg(resultFiles, insertImgFn)
          }
          editor.create()
          editor.txt.html("")
        }
      )
    }
  }

  uploadingImg = async (resultFiles, insertImgFn) => {
    var formData = new FormData()
    for (var i = 0; i < resultFiles.length; i++) {
      formData.append("file[]", resultFiles[i])
    }
    const res = await y.postInst(api.editorUrl, formData)
    for (var j = 0; j < res.length; j++) {
      insertImgFn(res[j])
    }
  }

  beforeUpload = (file) => {
    const res = y.beforeUpload(file)
    return res
  }

  fileUploadChange = async (info, filetype) => {
    if (info.file.status === "uploading") {
      // this.setState({ loading: true })
      return
    }
    if (info.file.status === "done") {
      if (!isNull(info.fileList[0].response.key)) {
        this.setState({
          formData: {
            ...this.state.formData,
            [filetype]: info.fileList[0].response.key,
          },
          // loading: false,
        })
        message.success("上传成功")
      }
    }
    if (info.file.status === "error") {
      message.error("上传错误，请重新尝试")
      return
    }
    // console.log(`${filetype}-info文件`, info)
    // console.log("-this.state.formData-", this.state.formData)
  }

  // 不为空
  stoptoapi = (arr) => {
    const res = y.stopToApi(arr)
    return res
  }

  getClasscate = () => {
    let arr = [
      {
        id: 1,
        type: 1,
        name: "分类1",
        active: true,
      },
      {
        id: 2,
        type: 2,
        name: "分类2",
        active: false,
      },
    ]
    this.setState({
      category: [...arr],
    })
    // console.log("获取分类数据- res", res)
  }

  getEditForm = async () => {
    const { api, id, page } = this.props.data
    const res = await y.getInst(api, {
      id: id,
    })

    let editForm = {
      TestRouter: {
        // name: res.name,
        // cover: res.cover,
        // video: res.video,
        // type: res.type,
        // activity_date: res.activity_date,
      },
      Banner: {
        // name: res.name
      },
    }

    if (!isNull(res)) {
      // console.log("res", res)
      this.setState({
        formData: !isNull(page) && editForm[page],
      })

      this.state.editor.txt.html(res.content ? res.content : "")
    }
  }

  getEslintArr = () => {
    const { page } = this.props.data
    const { name, cover } = this.state.formData
    // console.log(this.state.formData, "formData")

    let eslintArr = {
      TestRouter: [{ data: name, title: "请输入标题" }],
      Banner: [{ data: cover, title: "请上传图片" }],
      Other: [],
    }

    return !isNull(page) ? eslintArr[page] : eslintArr["Other"]
  }

  getapiParams = () => {
    const { page } = this.props.data
    const { name, cover } = this.state.formData

    let paramsObj = {
      TestRouter: {
        // name,
      },
      Banner: {
        // cover,
      },
      Other: {},
    }

    return !isNull(page) ? paramsObj[page] : paramsObj["Other"]
  }

  modalOk = () => {
    const { id, modaltype } = this.props.data
    // console.log("ok")

    if (modaltype !== 3) {
      let isGo = this.stoptoapi(this.getEslintArr())
      if (!isGo) {
        return
      }
    }

    if (modaltype === 1) {
      //  新增数据
      this.addlist(this.getapiParams())
    } else if (modaltype === 2) {
      //  编辑数据
      let params = this.getapiParams()
      params.id = id
      this.editlist(params)
    } else if (modaltype === 3) {
      //  删除数据
      this.dellist({ id: id })
    }

    // console.log("-参数params-", this.getapiParams())
  }
  addlist = async (params) => {
    const res = await y.postInst(this.props.data.api, params)
    this.resetList(res, "新增成功")
  }
  editlist = async (params) => {
    const res = await y.putInst(this.props.data.api, params)
    this.resetList(res, "修改成功")
  }
  dellist = async (params) => {
    const res = await y.deleteInst(this.props.data.api, params)
    this.resetList(res, "删除成功")
  }

  //新增or编辑or删除
  resetList = (res, title) => {
    if (!isNull(res)) {
      message.success(title)
      this.props.cancleFn({ isrefresh: true })
    }
  }
}

/* api: 请求地址,
   page: 页面来源,
   addOrEditIsShow: 弹框是否显示
   id：编辑or删除当前行的id
   modaltype： 1新增   2编辑   3删除
*/
