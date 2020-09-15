import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal } from 'antd';

import { Mutation } from '@/components/Mutation';

const handleOk = (mutationLink, form, { title, handleCancel, _id }) => {
  form.validateFields(async (err, values) => {
    if (!err) {
      await mutationLink({
        variables: title === 'Create' ? values : { ...values, _id }
      });
      handleCancel();
    }
  });
};

const btnCancel = (form, { handleCancel }) => {
  form.resetFields();
  handleCancel();
};

const LinkModelComponent = (props) => {
  const { handleCancel, mutation, refetch, name, url, ...modalProps } = props;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 }
  };

  return (
    <Mutation
      mutation={mutation}
      ItemName={/^LinksItem/}
      refetch={refetch}
      shouldDeleteCache={props.title === 'Create'}
    >
      {(createLink, loading) => {
        return (
          <Modal
            {...modalProps}
            maskClosable={false}
            onCancel={() => btnCancel(form, props)}
            footer={[
              <Button key="close" onClick={() => btnCancel(props)}>
                close
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={() => handleOk(createLink, form, props)}
              >
                Submit
              </Button>
            ]}
          >
            <Form>
              <Form.Item
                label="name"
                name="name"
                initialValue={name}
                rules={[{ required: true, message: 'name is required' }]}
                {...formItemLayout}
              >
                <Input placeholder="name" />
              </Form.Item>
              <Form.Item
                label="url"
                name="url"
                initialValue={url}
                rules={[
                  { required: true, message: 'url is required' },
                  {
                    pattern: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[/=?%\-&_~`@[\]':+!]*([^<>""])*$/,
                    message: 'url 格式不正确'
                  }
                ]}
                {...formItemLayout}
              >
                <Input placeholder="url" />
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </Mutation>
  );
};

LinkModelComponent.propTypes = {
  title: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  mutation: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export const LinkModal = LinkModelComponent;
