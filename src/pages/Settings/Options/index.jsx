import React from 'react';
import { Form, Spin } from 'antd';

import styles from './index.module.scss';

// const { TextArea } = Input;

// const submit = (
//   mutation,
//   { form: { validateFields }, _id }
// ) => {
//   validateFields(async (err, values) => {
//     if (!err) {
//       await mutation({
//         variables: { ...values, _id },
//       });

//       message.success('success');
//     }
//   });
// };

const OptionsComponent = () => {
  // const { form: { getFieldDecorator } } = props;
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  return (
    <div className={styles.view}>
      <Spin>
        <Form>
          <Form.Item label="标题" {...formItemLayout}>
            {/* {getFieldDecorator('title', {
              initialValue: options.title,
              rules: [
                {
                  required: true,
                  message: 'Please input your title!',
                }
              ],
            })(<Input />)} */}
          </Form.Item>

          <Form.Item label="副标题" {...formItemLayout}>
            {/* {getFieldDecorator('sub_title', {
              initialValue: options.sub_title,
              rules: [
                {
                  required: true,
                  message: 'Please input sub_title!',
                }
              ],
            })(<Input />)} */}
          </Form.Item>

          <Form.Item label="关键词" {...formItemLayout}>
            {/* {getFieldDecorator('keyword', {
              initialValue: options.keyword,
            })(<Input />)} */}
          </Form.Item>

          <Form.Item label="站点地址" {...formItemLayout}>
            {/* {getFieldDecorator('url', {
              initialValue: options.url,

              rules: [
                {
                  required: true,
                  message: 'Please input url!',
                }
              ],
            })(<Input />)} */}
          </Form.Item>

          <Form.Item label="电子邮件" {...formItemLayout}>
            {/* {getFieldDecorator('email', {
              initialValue: options.email,

              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                }
              ],
            })(<Input />)} */}
          </Form.Item>

          <Form.Item label="ICP 备案号：" {...formItemLayout}>
            {/* {getFieldDecorator('icp', {
              initialValue: options.icp,
            })(<Input />)} */}
          </Form.Item>

          <Form.Item label="站点描述" {...formItemLayout}>
            {/* {getFieldDecorator('descript', {
              initialValue: options.descript,
              rules: [
                {
                  required: true,
                  message: 'Please input descript!',
                }
              ],
            })(<TextArea />)} */}
          </Form.Item>

          <Form.Item>
            {/* <MutationComponent
              mutation={UPDATE_OPTIONS}
              shouldDeleteCache={false}
              ItemName={/^Options/}
            >
              {(mutation, loading) => {
                return (
                  <Button
                    type="primary"
                    loading={loading}
                    onClick={() =>
                      submit(mutation, { ...props, _id: options._id })
                    }
                  >
                    Submit
                  </Button>
                );
              }}
            </MutationComponent> */}
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export const Options = Form.create()(OptionsComponent);
