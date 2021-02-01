import React, { Component } from 'react';
// types
type SortProps = {
  groupChannels: boolean,
  groupChannelsEnable: () => void,
  sortDateNewest: boolean,
  dateSortNewest: (bool: boolean) => void
}

type SortState = {
  dropdownDateShow: boolean
}

class SortBar extends Component<SortProps, SortState> {
  private node: React.RefObject<HTMLLIElement>;

  constructor(props: SortProps) {
    super(props);
    this.node = React.createRef();

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
      <ul
        className='dropdown slideDown'
      >
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

  // Close dropdown when clicking outside of dropdown
  handleClick = (e: Event) => {
    if (this.node.current && this.node.current.contains(e.target as Node)) {
      return;
    }
    this.setState({
      dropdownDateShow: false
    })
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
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
            ref={this.node}
          >
            <div className='dropdownToggle'>
              <span>
              {this.props.sortDateNewest ? 'Date (Newest First)' : 'Date (Oldest First)'}
              </span>
              {this.state.dropdownDateShow ? <i className='arrow up'></i> : <i className='arrow down'></i>}
              
            </div>
            {this.state.dropdownDateShow ? this.renderDropdown() : <ul className='dropdown'></ul>}
          </li>
        </ul>
      
      </div>
    )
  }
}

export default SortBar;