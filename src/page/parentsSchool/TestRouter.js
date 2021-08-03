import React, { Component } from "react"
import { Button, Table, Space, Pagination } from "antd"
import MeModal from "component/memodal/MeModal"
import * as y from "utils/methods"
import { api } from "common/api"
import { isNull } from "utils/isNull"
import fmImg from "assets/fm.png"
import "styles/commonView.css"
import "styles/pageView.css"
const { Column } = Table

export default class TestRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      formData: {},
      editor: null,
      rowEditId: "",
      rowTypeId: "",
      addOrEditIsShow: false,
      medata: {
        api: api.lessonList,
        page: "TestRouter",
        addOrEditIsShow: true,
      },
      tableList: [],
      tableTotal: "",
      tablePageIndex: 1,
      tablePageSize: 10,
    }
  }

  render() {
    const { addOrEditIsShow, category, tableList, tableTotal, tablePageIndex } =
      this.state
    return (
      <div className="common_view">
        <div className="line_view">
          <NineModules
            modulesList={category}
            isReadOnly={true}
            data={this.getCurrentId}
          >
            分类
          </NineModules>
          <hr />
        </div>
        <div className="line_view clearfix">
          <Button
            type="primary float_right add_btn"
            className="button_radius"
            onClick={this.addFn}
          >
            添加
          </Button>
        </div>
        <div className="table_view">
          <Table dataSource={tableList} ellipsis={true} pagination={false}>
            <Column title="ID" dataIndex="id" key="key" align="center" />
            <Column title="名称" dataIndex="name" key="key" align="center" />
            <Column
              title="封面"
              key="key"
              align="center"
              render={(text, record) => (
                <img
                  src={record.cover ? api.fileUrl + record.cover : fmImg}
                  className="fm_size"
                ></img>
              )}
            />
            <Column
              title="操作"
              key="key"
              align="center"
              render={(text, record) => (
                <Space size="middle">
                  <a onClick={this.editFn.bind(this, record)}>编辑</a>
                  <a onClick={this.delFn.bind(this, record)}>删除</a>
                </Space>
              )}
            />
          </Table>

          <Pagination
            className="line_view"
            defaultCurrent={1}
            total={tableTotal}
            current={tablePageIndex}
            showQuickJumper
            onChange={this.PaginationChange}
          />
        </div>
        {addOrEditIsShow === true && (
          <MeModal data={this.state.medata} cancleFn={this.cancleFn}></MeModal>
        )}
      </div>
    )
  }
  componentDidMount() {
    this.init()
  }
  init = () => {
    this.getTopcate()
    this.TableList({ type: this.state.cateId })
  }
  getTopcate = () => {
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
  TableList = async (params) => {
    const res = await y.getInst(api.lessonList, params)
    // console.log("获取表格数据- res", res)
    if (!isNull(res)) {
      let arr = res.data.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        }
      })
      this.setState(
        {
          tableList: arr,
          tableTotal: res.total,
        }
        // console.log("this.state.tableList", this.state.tableList)
      )
    }
  }

  PaginationChange = (val) => {
    // console.log("当前页数 - val", val)
    this.setState({
      tablePageIndex: val,
    })

    let params = {
      page: val,
      type: this.state.cateId,
    }
    this.TableList(params)
  }
  //获取一级分类id
  getCurrentId = (data) => {
    // console.log("data参数", data)
    //设置激活状态
    let category = this.state.category
    category.forEach((item) => {
      item.active = false
      if (item.id == data) {
        item.active = true
      }
    })
    this.setState({
      category,
      cateId: data,
    })
    //获取表格列表
    this.TableList({
      type: data,
    })
  }

  //添加
  addFn = () => {
    let obj = {
      ...this.state.medata,
      id: null,
      modaltype: 1,
    }
    this.setState({
      medata: obj,
      addOrEditIsShow: true,
    })
  }
  //编辑
  editFn = async (record) => {
    let obj = {
      ...this.state.medata,
      id: record.id,
      modaltype: 2,
    }
    this.setState({
      medata: obj,
      addOrEditIsShow: true,
    })
  }

  delFn = (record) => {
    let obj = {
      ...this.state.medata,
      id: record.id,
      modaltype: 3,
    }
    this.setState({
      medata: obj,
      addOrEditIsShow: true,
    })
  }

  cancleFn = (parmas) => {
    this.setState({
      addOrEditIsShow: false,
      tablePageIndex: 1,
    })
    if (parmas.isrefresh) {
      this.TableList({ type: this.state.cateId })
    }
  }
}
