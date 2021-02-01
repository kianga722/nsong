import React, { Component } from 'react';
// types
type LayoutProps = {
  layoutChange: boolean,
  layoutToggle: () => void
}


class LayoutChange extends Component<LayoutProps, {}> {
  render() {
    return (
      <aside
        id='layoutChange'
        onClick={this.props.layoutToggle}
      >
        {this.props.layoutChange ? 'Switch It Back!': 'Switch Layout!'}
      </aside>
    )
  }
}

export default LayoutChange;