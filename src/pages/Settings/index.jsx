import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import { Options } from './Options';
import { Account } from './Account';

import styles from './index.module.scss';

const { Item } = Menu;

class Set extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menu[selectKey] ? selectKey : 'options';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { match, location } = props;
    const menu = {
      options: 'Options Setting',
      account: 'Account Setting'
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      menu,
      selectKey: key || 'options'
    };
  }

  selectKey = ({ key }) => {
    const { history } = this.props;
    history.push(`/settings/${key}`);
    this.setState({
      selectKey: key
    });
  };

  getmenu = () => {
    const { menu } = this.state;
    return Object.keys(menu).map((item) => (
      <Item key={item}>{menu[item]}</Item>
    ));
  };

  render() {
    const { selectKey, menu } = this.state;

    return (
      <div className={styles.main}>
        <div className={styles['left-menu']}>
          <Menu
            selectedKeys={[selectKey]}
            mode="inline"
            onClick={this.selectKey}
          >
            {this.getmenu()}
          </Menu>
        </div>
        <div className={styles['right-content']}>
          <div className={styles.title}>{menu[selectKey]}</div>
          <div className={styles.view}>
            <Route path="/settings/options" exact component={Options} />
            <Route path="/settings/account" exact component={Account} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Set);
