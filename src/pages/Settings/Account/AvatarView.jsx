import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, message, notification } from 'antd';

import styles from './index.module.scss';

export class AvatarView extends PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    onChangeAvatar: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    qiniuKey: '',
    currentAvatar: ''
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'error') {
      this.setState({ loading: false });

      notification.error({
        message: 'upload error',
        description: info.file.response.error
      });
    }

    if (info.file.status === 'done') {
      this.setState((state) => ({
        currentAvatar: `${process.env.REACT_APP_STATIC_SITE}${state.qiniuKey}`
      }));

      this.props.onChangeAvatar(
        `${process.env.REACT_APP_STATIC_SITE}${this.state.qiniuKey}`
      );

      this.setState({
        loading: false
      });
    }
  };

  beforeUpload = (file) => {
    this.setState({
      qiniuKey: file.name
    });

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  };

  render() {
    const { username, avatar, token } = this.props;
    const { loading, qiniuKey, currentAvatar } = this.state;

    return (
      <>
        <div className={styles['avatar-title']}>{username}</div>
        <div className={styles.avatar}>
          <img src={currentAvatar || avatar} alt="avatar" />
        </div>
        <Upload
          action={process.env.REACT_APP_QINNIU_UPLOAD}
          data={{
            key: qiniuKey,
            token
          }}
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onChange={(info) => this.handleChange(info)}
        >
          <div className={styles['button-view']}>
            <Button loading={loading} disabled={loading} icon="upload">
              Change avatar
            </Button>
          </div>
        </Upload>
      </>
    );
  }
}
