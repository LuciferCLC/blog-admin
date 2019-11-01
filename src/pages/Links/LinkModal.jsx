import React from 'react';
import {
  Button, Form, Input, Modal
} from 'antd';

const handleOk = (
  mutationLink,
  {
    form: { validateFields },
    title,
    handleCancel,
    _id,
  }
) => {
  validateFields(async (err, values) => {
    if (!err) {
      await mutationLink({
        variables: title === 'Create' ? values : { ...values, _id },
      });
      handleCancel();
    }
  });
};

const btnCancel = ({ form: { resetFields }, handleCancel }) => {
  resetFields();
  handleCancel();
};

const LinkModelComponent = (props) => {
  const {
    form: { getFieldDecorator },
    handleCancel,
    mutation,
    refetch,
    name,
    url,
    ...modalProps
  } = props;
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };

  return (
    <Modal
      {...modalProps}
      maskClosable={false}
      onCancel={() => btnCancel(props)}
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
            initialValue: name,
            rules: [{ required: true, message: 'name is required' }],
          })(<Input placeholder="name" />)}
        </Form.Item>
        <Form.Item label="url" {...formItemLayout}>
          {getFieldDecorator('url', {
            initialValue: url,
            rules: [
              { required: true, message: 'url is required' },
              {
                pattern: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[/=?%\-&_~`@[\]':+!]*([^<>""])*$/,
                message: 'url 格式不正确',
              }
            ],
          })(<Input placeholder="url" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const LinkModal = Form.create()(LinkModelComponent);
