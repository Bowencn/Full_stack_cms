import "braft-editor/dist/index.css";
import "braft-extensions/dist/code-highlighter.css";

import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Modal, Select, message } from "antd";
import { Context } from "../utils/ContextState";
import UploadImage from "../components/UploadImage";
import BraftEditor from "braft-editor";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import axios from "axios";
// import HeaderId from "braft-extensions/dist/header-id";
// import Markdown from "braft-extensions/dist/markdown";
import { host } from "../conf";
// const options = {
//   includeEditors: ["editor-with-code-highlighter"],
// }; 
// BraftEditor.use(Markdown(options));
// BraftEditor.use(HeaderId(options));

BraftEditor.use(
  CodeHighlighter({
    includeEditors: ["editor-with-code-highlighter"],
  })
);
export default function BarsAndAppreciationnCommonComponents(props) {
  const [appreciateInfo, setAppreciateInfo] = useState({});
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );
  const [articleData, setArticleData] = useState();
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const { Option } = Select;
  const [selectOptions, setselectOptions] = useState();
 
  const [form] = Form.useForm();
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
    let isUnmounted = false;
    const GetTags = async () => {
      const res = await axios.get(`${host}searchTags`);
      let tags = [];
      res.data.forEach((item, index) => {
        tags.push(<Option key={index}>{item.name}</Option>);
      });
      if (!isUnmounted) {
        setselectOptions(tags);
      }
    };
    GetTags();
    const getAppreciateInfo = async () => {
      const res = await axios.get(`${host}searchAppreciateInfo`);
      let data = res.data[0];
      if (!isUnmounted) {
        setAppreciateInfo(data);
        form.setFieldsValue({ payName: data.payment_method_name });
      }
    };
    const setEditArticle = () => {
      const getArticle = async () => {
        let id = props.editData.location.state.record.article_id;
        const res = await axios.post(`${host}searchArticleContent`, { id: id });
        if (!isUnmounted) {
          setArticleData(articleProps);
          form.setFieldsValue({
            title: articleProps.article_title,
            tags: articleProps.article_tags.split(","),
            articleContent: BraftEditor.createEditorState(
              res.data[0].article_content_html
            ),
          });
          setEditorState(
            BraftEditor.createEditorState(res.data[0].article_content_html)
          );
        }
      };
      getArticle();
    };
    const getUserInfo = async () => {
      const res = await axios.get(`${host}searchPersonalInfo`);

      if (!isUnmounted) {
        setUserInfo(res.data[0]);
        let data = res.data[0];
        if (data) {
          form.setFieldsValue({
            name: data.name,
            autograph: data.autograph,
            imgInfo: { url: data.user_image },
          });
        }
      }
    };
    requiredBar === "支付方式" && getAppreciateInfo();
    headerName === "编辑文章" && setEditArticle();
    headerName === "个人信息" && getUserInfo();
    return () => {
      isUnmounted = true;
    };
  }, [form, headerName, articleProps, requiredBar]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    form.setFieldsValue({ articleContent: state });
  };
  const submitInfo = async () => {
    let editorData = form.getFieldsValue().articleContent;
    let uploads = form.getFieldsValue();
    console.log(uploads, selectOptions);
    if (headerName === "个人信息") {
      const res = await axios.post(`${host}addPersonalInfo`, uploads);
      res && message.success("上传成功");
    } else if (headerName === "文章赞赏设置") {
      const res = await axios.post(`${host}addAppreciateInfo`, uploads);
      res && message.success("上传成功");
    } else {
      try {
        uploads.articleContent = {
          html: editorData.toHTML(),
        };
        if (headerName === "编辑文章") {
          uploads.modifyTime = new Date().getTime();
          uploads.historyTitle = articleData.article_title;
          uploads.article_id = articleProps.article_id;
          const res = await axios.post(`${host}editArticleInfo`, uploads);
          res && message.success("上传成功");
        } else {
          uploads.tags = selectOptions[uploads.tags[0]].props.children;
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
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
  };
  const contentLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };
  const tailLayout = {
    wrapperCol: { offset: 2, span: 16 },
  };
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
    <Form
      name="bacc"
      form={form}
      {...layout}
      onValuesChange={(a, b) => {
        console.log(a, b);
      }}
    >
      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width="900px"
      >
        <div
          className="braft-output-content"
          dangerouslySetInnerHTML={{ __html: editorState.toHTML() }}
        ></div>
      </Modal>
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
      {CategoryBar && (
        <Form.Item label={CategoryBar} required={true} name="tags">
          <Select
            mode="multiple"
            placeholder="请选择标签"
            style={{ width: "100%" }}
          >
            {selectOptions}
          </Select>
        </Form.Item>
      )}
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
      {textArea && (
        <Form.Item
          label="内容"
          name="articleContent"
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
          {...contentLayout}
        >
          <div className="editor-container">
            <BraftEditor
              id="editor-with-code-highlighter"
              style={{
                border: "1px solid rgb(217,217,217)",
                borderRadius: "5px",
              }}
              value={editorState}
              onChange={handleEditorChange}
              extendControls={extendControls}
            />
          </div>
        </Form.Item>
      )}
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={submitInfo}>
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}
