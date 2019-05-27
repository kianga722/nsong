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
      <ul className='dropdown'>
        <li
          className='dropdown-item'
          onClick={() => {
            this.props.dateSortNewest(true);
            this.dropdownToggle();
          }}
        >
          {this.props.sortDateNewest ? <span className='dropdown-current'></span> : <span className='dropdown-empty'></span>} 
          <span>Date (Newest First)</span>
        </li>
        <li
          className='dropdown-item'
          onClick={() => {
            this.props.dateSortNewest(false);
            this.dropdownToggle();
          }}
        >
          {this.props.sortDateNewest ? <span className='dropdown-empty'></span> : <span className='dropdown-current'></span>} 
          <span>Date (Oldest First)</span>
        </li>
      </ul>
    )
  }

  render() {
    return (
      <div id='sortBar'>

        <div id='logo'>
          <a href='https://nsong.herokuapp.com'
          >
            nsong
          </a>
        </div>

        <ul id='sort-options'>
          <li id='groupChannels'>
            <label htmlFor='groupChannelsSort'>
              <input
                type='checkbox'
                id='groupChannelsSort'
                checked={this.props.groupChannels}
                onChange={this.props.groupChannelsEnable}
              />
              <span className="checkCustomGroup"></span>
              <span>Group By Channel</span>
            </label>
          </li>
          
          <li
            id='dateSort'
            onClick={this.dropdownToggle}
          >
            <div className='dropdownToggle'>
              <span>
              {this.props.sortDateNewest ? 'Date (Newest First)' : 'Date (Oldest First)'}
              </span>
              {this.state.dropdownDateShow ? <i className='arrow up'></i> : <i className='arrow down'></i>}
              
            </div>
            {this.state.dropdownDateShow ? this.renderDropdown() : null}
          </li>
        </ul>
      
      </div>
    )
  }
}

export default SortBar;