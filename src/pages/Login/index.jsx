import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon, Input, message
} from 'antd';
import { get } from 'lodash-es';

import * as api from '@/redux/api/auth';

import { LoginButton } from './Button';

import styles from './index.module.scss';

class Login extends PureComponent {
  state = {
    loading: false,
  }

  handleSubmit = () => {
    const {
      form: { validateFields },
      location,
      history: { push },
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        api.login(values).then(({ result }) => {
          if (result.token) {
            message.success('登陆成功！');
            window.localStorage.setItem('TOKEN', JSON.stringify(result));
            const path = get(location, ['state', 'from', 'pathname'], null);
            push(path || '/dashboard');
          }
        }).catch((error) => {
          message.error(error);
          this.setState({
            loading: false,
          });
        });
      } else {
        message.error(err);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { loading } = this.state;

    return (
      <div className={styles.container}>
        <Form className={styles.form}>
          <Form.Item hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '请输入姓名' },
                { min: 1, message: '最小长度为 1 位' }
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码' }
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                placeholder="Password"
                type="password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <LoginButton
              type="primary"
              htmlType="submit"
              className={styles['form-button']}
              login={this.handleSubmit}
              loading={loading}
            >
              Log in
            </LoginButton>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Form.create()(Login);
