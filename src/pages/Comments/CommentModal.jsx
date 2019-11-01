import React from 'react';
import {
  Button, Form, Input, Modal
} from 'antd';

const handleOk = ({
  form: { validateFields },
  handleCancel,
  _id,
  author,
}) => {
  validateFields(async (err, values) => {
    if (!err) {
      await ({
        variables: {
          _id,
          content: values.content,
          author: {
            email: author.email,
            site: author.site,
            // ...author,
            name: values.name,
          },
        },
      });
      handleCancel();
    }
  });
};

const btnCancel = ({
  form: { resetFields },
  handleCancel,
}) => {
  resetFields();
  handleCancel();
};

const CommentModelComponent = (props) => {
  const {
    form: { getFieldDecorator },
    handleCancel,
    mutation,
    content,
    author,
    ...modalProps
  } = props;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (
    <Modal
      {...modalProps}
      maskClosable={false}
      onCancel={() => btnCancel(props)}
      title="Edit"
      footer={[
        <Button key="close" onClick={() => btnCancel(props)}>
          close
        </Button>,
        <Button
          key="submit"
          type="primary"
          // loading={loading}
          onClick={() => handleOk(props)}
        >
          Submit
        </Button>
      ]}
    >
      <Form>
        <Form.Item label="name" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: author.name,
            rules: [{ required: true, message: 'name is required' }],
          })(<Input placeholder="name" />)}
        </Form.Item>
        <Form.Item label="content" {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: content,
            rules: [{ required: true, message: 'url is required' }],
          })(<Input placeholder="content" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const ComponentsModal = Form.create()(CommentModelComponent);
