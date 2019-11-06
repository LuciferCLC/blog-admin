import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '@/redux/actions/auth';

import { ContentLayout } from './Layout';

class BaseLayout extends PureComponent {
  componentDidMount() {
    const { getAuth } = this.props;
    getAuth();
  }

  render() {
    const { auth } = this.props;

    return (
      <ContentLayout useInfo={auth} />
    );
  }
}

BaseLayout.propTypes = {
  getAuth: PropTypes.func.isRequired,
  auth: PropTypes.shape({}),
};

BaseLayout.defaultProps = {
  auth: { username: '', gravatar: '' },
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAuth: actions.getAuth,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
