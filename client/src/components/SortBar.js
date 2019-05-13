import React, { Component } from 'react';

class SortBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownDateShow: false
    };
  }

  dropdownToggle = () => {
    this.setState({
      dropdownDateShow: !this.state.dropdownDateShow
    })
  }

  renderDropdown = () => {
    return (
      <div className='dropdown'>
        <a href='#'
          className='dropdown-item'
          onClick={() => {
            this.props.dateSortNewest(true);
            this.dropdownToggle();
          }}
        >
          <span>Date (Newest First)</span>
          {this.props.sortDateNewest ? <span>current</span> : null}
        </a>
        <a href='#'
          className='dropdown-item'
          onClick={() => {
            this.props.dateSortNewest(false);
            this.dropdownToggle();
          }}
        >
          <span>Date (Oldest First)</span>
          {this.props.sortDateNewest ? null : <span>current</span>}
        </a>
      </div>
    )
  }

  render() {
    return (
      <div id='sortBar'>
        
        <div
          id='groupChannels'
          onClick={this.props.groupChannelsEnable}
        >
          <input
            type='checkbox'
            checked={this.props.groupChannels}
          />
          <span className='groupChannels-title'>
            Group By Channel
          </span>
        </div>
        
        <div id='dateSort'>
          <a href='#'
            className='dropdownToggle'
            onClick={this.dropdownToggle}
          >
            {this.props.sortDateNewest ? 'Date (Newest First)' : 'Date (Oldest First)'}
          </a>
          {this.state.dropdownDateShow ? this.renderDropdown() : null}
        </div>

      </div>
    )
  }
}

export default SortBar;