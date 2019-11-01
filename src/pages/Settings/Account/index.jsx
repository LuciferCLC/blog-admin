import React, { Component } from 'react';
import {
  Form, Input, message
} from 'antd';

// import { AvatarView } from './AvatarView';

import styles from './index.module.scss';

const { Item } = Form;

class AccountComponent extends Component {
  gravatar = '';

  state = {
    confirmDirty: false,
  };

  handleSubmit = (
    e,
    mutation,
    _id = ''
  ) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        await mutation({
          variables: {
            ...values,
            _id,
            gravatar: this.gravatar,
          },
        });
        message.success('success');
        form.resetFields(['oldPassword', 'password', 'confirm']);
      }
    });
  };

  handleConfirmBlur = (e) => {
    const { target: { value } } = e;
    this.setState((state) => ({
      confirmDirty: state.confirmDirty || !!value,
    }));
  };

  validateToNextPassword = (
    rule,
    value,
    callback
  ) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  onChangeAvatar = (avatar) => {
    this.gravatar = avatar;
  };

  compareToFirstPassword = (
    rule,
    value,
    callback
  ) => {
    const { form } = this.props;
    const oldPassword = form.getFieldValue('password');
    if (oldPassword && value !== oldPassword) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.view}>
        <div className={styles.left}>
          <Form>
            <Item label="昵称">
              {/* {getFieldDecorator('name', {
                initialValue: result.name,
                rules: [
                  {
                    required: true,
                    message: 'Please input your name!',
                  }
                ]
              })(<Input />)} */}
            </Item>

            <Item label="个性签名">
              {/* {getFieldDecorator('slogan', {
                initialValue: result.slogan,
              })(<Input />)} */}
            </Item>

            <Item label="原密码">
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: 'Please input oldPassword',
                  }
                ],
              })(<Input type="password" placeholder="原密码" />)}
            </Item>

            <Item label="新密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.validateToNextPassword,
                  }
                ],
              })(<Input placeholder="新密码" type="password" />)}
            </Item>

            <Item label="确认密码">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    validator: this.compareToFirstPassword,
                  }
                ],
              })(
                <Input
                  placeholder="确认密码"
                  type="password"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Item>

            <Item>
              {/* <MutationComponent
                mutation={UPDATE_INFO}
                ItemName={/UserInfo/}
                shouldDeleteCache={false}
              >
                {(mutation, loading) => (
                  <Button
                    type="primary"
                    loading={loading}
                    onClick={(e: React.FormEvent<any>) =>
                      this.handleSubmit(e, mutation, result._id)
                    }
                  >
                    Submit
                  </Button>
                )}
              </MutationComponent> */}
            </Item>
          </Form>
        </div>
        <div className={styles.right}>
          {/* <AvatarView
            avatar={result.gravatar || ''}
            username={result.username || ''}
            token={res.token}
            onChangeAvatar={this.onChangeAvatar}
          /> */}
        </div>
      </div>
    );
  }
}

export const Account = Form.create()(AccountComponent);
