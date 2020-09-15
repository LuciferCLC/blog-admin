import 'easymde/dist/easymde.min.css';

import React, { PureComponent } from 'react';
import { Form, Input, Button, message } from 'antd';
import SimpleMDE from 'react-simplemde-editor';

import { Mutation } from '@/components/Mutation';

import { CREATE_ARTICLE } from './index.mutation';

export default class Release extends PureComponent {
  formRef = React.createRef();

  handleSubmit = (e, mutation) => {
    e.preventDefault();
    this.formRef.current.validateFields().then(async (values) => {
      await mutation({
        variables: { ...values }
      });
      message.success('success');
      this.formRef.current.resetFields(['title', 'content']);
    });
  };

  render() {
    return (
      <Form ref={this.formRef}>
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入文章内容' }]}
        >
          <SimpleMDE />
        </Form.Item>

        <Form.Item>
          <Mutation mutation={CREATE_ARTICLE} ItemName={/^ArticleItem/}>
            {({ mutation, loading }) => (
              <Button
                type="primary"
                loading={loading}
                onClick={(e) => this.handleSubmit(e, mutation)}
              >
                提交
              </Button>
            )}
          </Mutation>
        </Form.Item>
      </Form>
    );
  }
}
