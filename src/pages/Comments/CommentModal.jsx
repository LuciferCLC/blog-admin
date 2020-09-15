import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal } from 'antd';

import { Mutation } from '@/components/Mutation';

const handleOk = (
  mutationComments,
  { form: { validateFields }, handleCancel, _id, author }
) => {
  validateFields(async (err, values) => {
    if (!err) {
      await mutationComments({
        variables: {
          _id,
          content: values.content,
          author: {
            email: author.email,
            site: author.site,
            // ...author,
            name: values.name
          }
        }
      });
      handleCancel();
    }
  });
};

const btnCancel = ({ form: { resetFields }, handleCancel }) => {
  resetFields();
  handleCancel();
};

const CommentModelComponent = (props) => {
  const { handleCancel, mutation, content, author, ...modalProps } = props;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  return (
    <Mutation
      mutation={mutation}
      ItemName={/^CommentsItem/}
      shouldDeleteCache={false}
    >
      {(mutationComments, loading) => {
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
                loading={loading}
                onClick={() => handleOk(mutationComments, props)}
              >
                Submit
              </Button>
            ]}
          >
            <Form>
              <Form.Item
                label="name"
                name="name"
                initialValue={author.name}
                rules={[{ required: true, message: 'name is required' }]}
                {...formItemLayout}
              >
                <Input placeholder="name" />
              </Form.Item>
              <Form.Item
                label="content"
                name="content"
                initialValue={content}
                rules={[{ required: true, message: 'url is required' }]}
                {...formItemLayout}
              >
                <Input placeholder="content" />
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </Mutation>
  );
};

CommentModelComponent.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  mutation: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export const ComponentsModal = CommentModelComponent;
