import React, { Component } from 'react';

import { connect } from 'react-redux';
import { toggleLayout } from '../actions/layoutActions';
import PropTypes from 'prop-types';

class LayoutChange extends Component {
  render() {
    return (
      <aside
        id='layoutChange'
        onClick={this.props.toggleLayout}
      >
        {this.props.layoutChange ? 'Switch It Back!': 'Switch Layout!'}
      </aside>
    )
  }
}

LayoutChange.propTypes = {
  toggleLayout: PropTypes.func.isRequired,
  layoutChange: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  layoutChange: state.layoutChange.layoutChange
});

export default connect(mapStateToProps, { toggleLayout })(LayoutChange);