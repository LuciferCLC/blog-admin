import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { LoginButton } from './Button';
import styles from './index.module.scss';

class Login extends PureComponent {
  state = {
    loading: false
  };

  handleSubmit = (e) => {
    console.log('登录', e);
    // this.props.form.validateFields(async (err, values) => {
    //   if (!err) {
    //     this.setState({
    //       loading: true
    //     });

    //     try {
    //       const {
    //         data: { login }
    //       } = await client.query({
    //         query: LOGIN,
    //         variables: values,
    //         errorPolicy: 'all'
    //       });

    //       this.setState({
    //         loading: false
    //       });

    //       if (login) {
    //         window.localStorage.setItem('TOKEN', JSON.stringify(login));
    //         const path = this.props.location.state.from.pathname;
    //         this.props.history.push(path || '/dashboard');
    //       }
    //     } catch (error) {
    //       this.setState({
    //         loading: false
    //       });
    //     }
    //   }
    // });
  };

  render() {
    return (
      <div className={styles.container}>
        <Form className={styles.form}>
          <Form.Item
            hasFeedback
            name="username"
            rules={[
              { required: true, message: '请输入姓名' },
              { min: 6, message: '最小长度为 6 位' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <LoginButton
              type="primary"
              htmlType="submit"
              className={styles['form-button']}
              login={this.handleSubmit}
              loading={this.state.loading}
            >
              Log in
            </LoginButton>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
