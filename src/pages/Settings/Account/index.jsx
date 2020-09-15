import React, { PureComponent } from 'react';
import { Form, Input, Button, message } from 'antd';

import { Query } from '@/components/Query';
import { Mutation } from '@/components/Mutation';

import { AvatarView } from './AvatarView';
import { GET_INFO, GET_QINIU } from './index.query';
import { UPDATE_INFO } from './index.mutations';

import styles from './index.module.scss';

class AccountComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.gravatar = '';
    this.formRef = React.createRef();
    this.state = {
      confirmDirty: false
    };
  }

  handleSubmit = async (e, mutation, _id = '') => {
    e.preventDefault();
    this.formRef.current.validateFields().then(async (values) => {
      await mutation({
        variables: {
          ...values,
          _id,
          gravatar: this.gravatar
        }
      });
      message.success('success');
      this.formRef.current.resetFields(['oldPassword', 'password', 'confirm']);
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState((state) => ({ confirmDirty: state.confirmDirty || !!value }));
  };

  validateToNextPassword = (rule, value) => {
    if (value && this.state.confirmDirty) {
      this.formRef.current.validateFields(['confirm'], { force: true });
    }
    Promise.resolve();
  };

  onChangeAvatar = (avatar) => {
    this.gravatar = avatar;
  };

  compareToFirstPassword = (rule, value) => {
    const oldPassword = this.formRef.current.getFieldValue('password');
    if (oldPassword && value !== oldPassword) {
      Promise.reject('Two passwords that you enter is inconsistent!');
    } else {
      Promise.resolve();
    }
  };

  render() {
    return (
      <Query query={GET_INFO}>
        {({ data }) => {
          const result = (data && data.getInfo) || {};

          return (
            <div className={styles.view}>
              <div className={styles.left}>
                <Form ref={this.formRef}>
                  <Form.Item
                    label="昵称"
                    name="name"
                    initialValue={result.name}
                    rules={[
                      { required: true, message: 'Please input your name!' }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="个性签名"
                    name="slogan"
                    initialValue={result.slogan}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="原密码"
                    name="oldPassword"
                    rules={[
                      { required: true, message: 'Please input oldPassword' }
                    ]}
                  >
                    <Input type="password" placeholder="原密码" />
                  </Form.Item>

                  <Form.Item
                    label="新密码"
                    name="password"
                    rules={[{ validator: this.validateToNextPassword }]}
                  >
                    <Input placeholder="新密码" type="password" />
                  </Form.Item>

                  <Form.Item
                    label="确认密码"
                    name="confirm"
                    rules={[{ validator: this.compareToFirstPassword }]}
                  >
                    <Input
                      placeholder="确认密码"
                      type="password"
                      onBlur={this.handleConfirmBlur}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Mutation
                      mutation={UPDATE_INFO}
                      ItemName={/UserInfo/}
                      shouldDeleteCache={false}
                    >
                      {({ mutation, loading }) => (
                        <Button
                          type="primary"
                          loading={loading}
                          onClick={(e) =>
                            this.handleSubmit(e, mutation, result._id)
                          }
                        >
                          Submit
                        </Button>
                      )}
                    </Mutation>
                  </Form.Item>
                </Form>
              </div>
              <div className={styles.right}>
                <Query query={GET_QINIU}>
                  {({ data: qiniuData }) => {
                    const res = (qiniuData && qiniuData.getQiniu) || {
                      token: ''
                    };
                    return (
                      <AvatarView
                        avatar={result.gravatar || ''}
                        username={result.username || ''}
                        token={res.token}
                        onChangeAvatar={this.onChangeAvatar}
                      />
                    );
                  }}
                </Query>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export const Account = AccountComponent;
