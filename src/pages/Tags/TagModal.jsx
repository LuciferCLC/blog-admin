import React from 'react';
import {
  Button, Form, Input, Modal
} from 'antd';

const handleOk = (
  createTag,
  {
    form: { validateFields },
    title,
    handleCancel,
    _id,
  }
) => {
  validateFields(async (err, values) => {
    if (!err) {
      await createTag({
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

const TagModelComponent = (props) => {
  const {
    form: { getFieldDecorator },
    handleCancel,
    mutation,
    refetch,
    name,
    descript,
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
        <Form.Item label="descript" {...formItemLayout}>
          {getFieldDecorator('descript', {
            initialValue: descript,
          })(<Input placeholder="descript" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const TagModal = Form.create()(TagModelComponent);
