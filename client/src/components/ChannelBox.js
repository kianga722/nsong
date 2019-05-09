import React, { Component } from 'react';

class ChannelBox extends Component {

  // Check if every filter option is selected
  isSelectAll = () => {
    return Object.values(this.props.channelSort).every((channel) => { return channel === true })
  }

  // Render correct select all button
  renderSelectAll = (bool) => {
    return (
      <div
        className='filter-all'
        onClick={() => this.props.selectAll(bool)}
      >
        {bool ? 'Select All':'Unselect All'}
      </div>
    )
  }

  render() {
    return (
      <aside id='channelBox'>
        <div className='box-title'>Channel Filter</div>
        {this.isSelectAll() ? this.renderSelectAll(false) : this.renderSelectAll(true)}
        {
          Object.keys(this.props.channelSort).map((channel) => (
            <div
              key={channel}
              className='filter-channel'
              onClick={() => this.props.toggleSort(channel)}
            >
              <input
                type='checkbox'
                checked={this.props.channelSort[channel]}
              />
              <span className='filter-title'>
                {channel}
              </span>
            </div>
          ))
        }
      </aside>
    )
  }
}

export default ChannelBox;