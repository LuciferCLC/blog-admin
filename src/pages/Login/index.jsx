import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Form, Icon, Input, message
} from 'antd';

import * as action from '@/redux/actions/auth';

import { LoginButton } from './Button';

import styles from './index.module.scss';

class Login extends PureComponent {
  state = {
    loading: false,
  }

  handleSubmit = () => {
    const { form: { validateFields }, login } = this.props;
    console.log(this.props);
    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        try {
          const result = await login(values);
          console.log('result', result);
          if (result.login) {
            window.localStorage.setItem('TOKEN', JSON.stringify(result.login));
            // const path = this.props.location.state.from.pathname;
            // this.props.history.push(path || '/dashboard');
          }
        } catch (error) {
          message.error(error);
          this.setState({
            loading: false,
          });
        }
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
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login: action.login,
}, dispatch);

export default Form.create()(connect(null, mapDispatchToProps)(Login));
