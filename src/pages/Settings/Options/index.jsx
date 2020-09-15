import React from 'react';
import { Button, Form, Input, Spin, message } from 'antd';

import { Query } from '@/components/Query';
import { Mutation } from '@/components/Mutation';

import { GET_OPTIONS } from './index.query';
import { UPDATE_OPTIONS } from './index.mutation';

import styles from './index.module.scss';

const { TextArea } = Input;

const submit = (mutation, { form: { validateFields }, _id }) => {
  validateFields(async (err, values) => {
    if (!err) {
      await mutation({
        variables: { ...values, _id }
      });

      message.success('success');
    }
  });
};

const OptionsComponent = (props) => {
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };
  return (
    <div className={styles.view}>
      <Query query={GET_OPTIONS}>
        {({ data, loading }) => {
          const options = (data && data.getOptions) || {};

          return (
            <Spin spinning={loading}>
              <Form>
                <Form.Item
                  label="标题"
                  name="title"
                  initialValue={options.title}
                  rules={[
                    { required: true, message: 'Please input your title!' }
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="副标题"
                  name="sub_title"
                  initialValue={options.sub_title}
                  rules={[
                    { required: true, message: 'Please input sub_title!' }
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="关键词"
                  name="keyword"
                  initialValue={options.keyword}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="站点地址"
                  name="url"
                  initialValue={options.url}
                  rules={[{ required: true, message: 'Please input url!' }]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="电子邮件"
                  name="email"
                  initialValue={options.email}
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    { required: true, message: 'Please input your E-mail!' }
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="ICP 备案号："
                  name="icp"
                  initialValue={options.icp}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="站点描述"
                  name="descript"
                  initialValue={options.descript}
                  rules={[
                    { required: true, message: 'Please input descript!' }
                  ]}
                  {...formItemLayout}
                >
                  <TextArea />
                </Form.Item>

                <Form.Item>
                  <Mutation
                    mutation={UPDATE_OPTIONS}
                    shouldDeleteCache={false}
                    ItemName={/^Options/}
                  >
                    {({ mutation, loading: updateLoading }) => {
                      return (
                        <Button
                          type="primary"
                          loading={updateLoading}
                          onClick={() =>
                            submit(mutation, { ...props, _id: options._id })
                          }
                        >
                          Submit
                        </Button>
                      );
                    }}
                  </Mutation>
                </Form.Item>
              </Form>
            </Spin>
          );
        }}
      </Query>
    </div>
  );
};

export const Options = OptionsComponent;
