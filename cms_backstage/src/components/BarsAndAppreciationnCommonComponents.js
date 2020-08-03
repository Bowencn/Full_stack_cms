import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Modal,
  Select,
  Divider,
  Tag,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Context } from "../utils/ContextState";
import UploadImage from "../components/UploadImage";
import BraftEditor from "braft-editor";
import axios from "axios";
import HeaderId from "braft-extensions/dist/header-id";
import "braft-editor/dist/index.css";
import "braft-extensions/dist/code-highlighter.css";
import Markdown from "braft-extensions/dist/markdown";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import {host} from '../conf'
const options = {
  includeEditors: ["editor"], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: ['editor-id-2'],  // 指定该模块对哪些BraftEditor无效
};
BraftEditor.use(Markdown(options));
BraftEditor.use(HeaderId(options));
BraftEditor.use(CodeHighlighter(options));
export default function BarsAndAppreciationnCommonComponents(props) {
  console.log(host)
  const [name] = useState("");
  const [appreciateInfo, setAppreciateInfo] = useState({});
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );
  const [articleData, setArticleData] = useState();
  const [visible, setVisible] = useState(false);

  const [userInfo, setUserInfo] = useState();
  // const { Option } = Select;
  
const selectOptions = [
  { label: "首页",value:'gold' },
  { label: "前端",value:'#f40' },
  { label: "React",value:'blue' },
  { label: "Nodejs",value:'green' },
];
  const [form] = Form.useForm();
  const controls = [
    "undo",
    "redo",
    "separator",
    "font-size",
    "line-height",
    "letter-spacing",
    "separator",
    "text-color",
    "bold",
    "italic",
    "underline",
    "strike-through",
    "separator",
    "superscript",
    "subscript",
    "remove-styles",
    "emoji",
    "separator",
    "text-indent",
    "text-align",
    "separator",
    "headings",
    "list-ul",
    "list-ol",
    "blockquote",
    "code",
    "separator",
    "link",
    "separator",
    "hr",
    "separator",
    "media",
    "separator",
    "clear",
  ];
  let index = 0;

  let articleProps =
    props.editData &&
    props.editData.location.state &&
    props.editData.location.state.record;
  const {
    headerName,
    requiredBar,
    SpareColumn,
    CategoryBar,
    textArea,
  } = useContext(Context);
  useEffect(() => {
    const getAppreciateInfo = async () => {
      const res = await axios.get(`${host}searchAppreciateInfo`);
      let data = res.data[0];
      setAppreciateInfo(data);
      form.setFieldsValue({ payName: data.payment_method_name });
    };
    const setEditArticle = () => {
      setArticleData(articleProps);
      form.setFieldsValue({
        title: articleProps.article_title,
        tags: articleProps.article_tags,
        articleContent: BraftEditor.createEditorState(
          articleProps.article_content_raw
        ),
      });
    };
    const getUserInfo = async () => {
      const res = await axios.get(`${host}searchPersonalInfo`);
      setUserInfo(res.data[0]);
      let data = res.data[0];
      if (data) {
        form.setFieldsValue({
          name: data.name,
          autograph: data.autograph,
          imgInfo: { url: data.user_image },
        });
      }
    };
    requiredBar === "支付方式" && getAppreciateInfo();
    headerName === "编辑文章" && setEditArticle();
    headerName === "个人信息" && getUserInfo();
  }, [form, headerName, articleProps, requiredBar]);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };
  const submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容,
    // const htmlContent = editorState.toHTML();
    // console.log(htmlContent);
    // 将editorState数据转换成RAW字符串
    //editorState.toRAW()方法接收一个布尔值参数，用于决定是否返回RAW JSON对象，默认是false
    // const rawString = editorState.toRAW(true);
    // console.log(rawString);
    // const result = await saveEditorContent(htmlContent)
  };
  const submitInfo = async () => {
    let editorData = form.getFieldsValue().articleContent;
    console.log(editorData.toHTML())
    let uploads = form.getFieldsValue();
    if (headerName === "个人信息") {
      const res = await axios.post(`${host}addPersonalInfo`, uploads);
      res && message.success("上传成功");
    } else if (headerName === "文章赞赏设置") {
      const res = await axios.post(`${host}addAppreciateInfo`, uploads);
      res && message.success("上传成功");
    } else {
      try {
        uploads.articleContent = {
          raw: editorData.toRAW(),
          html: editorData.toHTML(),
        };
        if (headerName === "编辑文章") {
          uploads.modifyTime = new Date().getTime();
          uploads.historyTitle = articleData.article_title;
          const res = await axios.post(`${host}editArticleInfo`, uploads);
          res && message.success("上传成功");
        } else {
          uploads.uploadTime = new Date().getTime();
          const res = await axios.post(`${host}addArticleInfo`, uploads);
          res && message.success("上传成功");
        }
      } catch (error) {
        console.log(error);
      }
      props.editData.history.goBack();
    }
    console.log(uploads);
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };
  function onNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  function addItem() {
    console.log("addItem");
    const { items, name } = this.state;
    this.setState({
      items: [...items, name || `New item ${index++}`],
      name: "",
    });
  }
  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color={value}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }
  const preview = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  const extendControls = [
    {
      key: "custom-button",
      type: "button",
      text: "预览",
      onClick: preview,
    },
  ];
  return (
    <Form name="bacc" form={form} {...layout}>
      <Modal visible={visible} onCancel={handleCancel} footer={null}>
        <div
          className="braft-output-content"
          dangerouslySetInnerHTML={{ __html: editorState.toHTML() }}
        ></div>
      </Modal>
      <Row>
        <Col>{headerName}</Col>
      </Row>
      {/* <Row>
        <Col
          xs={{ span: 20, offset: 1 }}
          md={{ span: 15, offset: 3 }}
          lg={{ span: 15, offset: 2 }}
        > */}
      {requiredBar && (
        <Form.Item
          label={requiredBar}
          rules={[
            {
              required: true,
              message: "请输入 " + requiredBar,
            },
          ]}
          name={
            requiredBar === "支付方式"
              ? "payName"
              : requiredBar === "标题"
              ? "title"
              : requiredBar === "标题/名字" && "name"
          }
        >
          <Input />
        </Form.Item>
      )}
      {SpareColumn && (
        <Form.Item label={SpareColumn} name="autograph">
          <Input />
        </Form.Item>
      )}
      {/* </Col>
      </Row> */}
      {CategoryBar && (
        // <Row>
        //   <Col
        //     xs={{ span: 20, offset: 1 }}
        //     md={{ span: 15, offset: 3 }}
        //     lg={{ span: 15, offset: 2 }}
        //   >
        <Form.Item label={CategoryBar} required={true} name="tags">
          <Select
            mode="multiple"
            tagRender={tagRender}
            // defaultValue={[{label:"首页",value:'gold'}]}
            style={{ width: "100%" }}
            options={selectOptions}
          />
          {/* <Select
            style={{ width: 240 }}
            // placeholder="custom dropdown render"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    padding: 8,
                  }}
                >
                  <Input
                    style={{ flex: "auto" }}
                    value={name}
                    onChange={onNameChange}
                  />
                  <a
                    href="#!"
                    style={{
                      flex: "none",
                      padding: "8px",
                      display: "block",
                      cursor: "pointer",
                    }}
                    onClick={addItem}
                  >
                    <PlusOutlined /> Add item
                  </a>
                </div>
              </div>
            )}
          >
            {items.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select> */}
        </Form.Item>
        //    </Col>
        // </Row>
      )}
      {/* <Row>
        <Col offset={5}> */}
      <Form.Item label="图片" name="imgInfo">
        <UploadImage
          getImgName={(data) => {
            console.log(data);

            form.setFieldsValue({ imgInfo: data });
          }}
          defaultImg={
            requiredBar === "支付方式"
              ? appreciateInfo.image_url
              : headerName === "编辑文章" && articleData
              ? articleData.article_img_url
              : headerName === "个人信息" && userInfo && userInfo.user_image
          }
        />
      </Form.Item>
      {/* </Col>
      </Row> */}
      {textArea && (
        // <Row>
        //   <Col
        //     xs={{ span: 20, offset: 1 }}
        //     md={{ span: 20, offset: 1 }}
        //     lg={{ span: 15, offset: 2 }}
        //   >
        <Form.Item
          label="内容"
          name="articleContent"
          // {...inpout}
          rules={[
            {
              required: true,
              validator: (_, value, callback) => {
                if (value.isEmpty()) {
                  callback("请输入正文内容");
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <BraftEditor
            id="editor"
            className="my-editor"
            controls={controls}
            placeholder="请输入正文内容"
            style={{
              border: "1px solid rgb(217,217,217)",
              borderRadius: "5px",
            }}
            value={editorState}
            onChange={handleEditorChange}
            onSave={submitContent}
            extendControls={extendControls}
          />
        </Form.Item>
        //   </Col>
        // </Row>
      )}
      {/* <Row>
        <Col xs={{ offset: 18 }} md={{ offset: 7 }} xl={{ offset: 6 }}> */}
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          onClick={
            submitInfo
            //   () => {
            //   form.submit();

            //   console.log(form.getFieldsValue());
            // }
          }
        >
          保存
        </Button>
      </Form.Item>
      {/* </Col>
      </Row> */}
    </Form>
  );
}
