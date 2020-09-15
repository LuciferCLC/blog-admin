import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal } from 'antd';

import { Mutation } from '@/components/Mutation';

const handleOk = (createTag, form, { title, handleCancel, _id }) => {
  form.validateFields(async (err, values) => {
    if (!err) {
      await createTag({
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

const TagModelComponent = (props) => {
  const {
    handleCancel,
    mutation,
    refetch,
    name,
    descript,
    ...modalProps
  } = props;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  return (
    <Mutation
      mutation={mutation}
      ItemName={/^TagsItem/}
      refetch={refetch}
      shouldDeleteCache={props.title === 'Create'}
    >
      {(createTag, loading) => {
        return (
          <Modal
            {...modalProps}
            maskClosable={false}
            onCancel={() => btnCancel(props)}
            footer={[
              <Button key="close" onClick={() => btnCancel(form, props)}>
                close
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={() => handleOk(createTag, form, props)}
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
                label="descript"
                name="descript"
                initialValue={descript}
                {...formItemLayout}
              >
                <Input placeholder="descript" />
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </Mutation>
  );
};

TagModelComponent.propTypes = {
  title: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  mutation: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  descript: PropTypes.string.isRequired
};

export const TagModal = TagModelComponent;
