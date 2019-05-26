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
          {this.props.sortDateNewest ? <span className='dropdown-current'></span> : <span className='dropdown-empty'></span>} 
          <span>Date (Newest First)</span>
        </a>
        <a href='#'
          className='dropdown-item'
          onClick={() => {
            this.props.dateSortNewest(false);
            this.dropdownToggle();
          }}
        >
          {this.props.sortDateNewest ? <span className='dropdown-empty'></span> : <span className='dropdown-current'></span>} 
          <span>Date (Oldest First)</span>
        </a>
      </div>
    )
  }

  render() {
    return (
      <div id='sortBar'>
        
        <div
          id='groupChannels'
        >
          <label htmlFor='groupChannelsSort'>
            <input
              type='checkbox'
              id='groupChannelsSort'
              checked={this.props.groupChannels}
              onChange={this.props.groupChannelsEnable}
            />
            <span className="checkCustom"></span>
            <span>Group By Channel</span>
          </label>
        </div>
        
        <div
          id='dateSort'
          onClick={this.dropdownToggle}
        >
          <a href='#'
            className='dropdownToggle'
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