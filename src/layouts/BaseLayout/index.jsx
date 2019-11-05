import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '@/redux/actions/auth';

import { ContentLayout } from './Layout';

class BaseLayout extends PureComponent {
  componentDidMount() {
    const { initAuth } = this.props;
    initAuth();
  }

  render() {
    return (
      <ContentLayout useInfo={{}} />
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  initAuth: actions.initAuth,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
