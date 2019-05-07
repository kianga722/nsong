import React, { Component } from 'react';

class ChannelBox extends Component {

  // Check if every filter option is selected
  isSelectAll = () => {
    return Object.values(this.props.channelSort).every((channel) => { return channel === true })
  }

  renderUnselectAll = () => {
    return (
      <div
        className='filter-all'
        onClick={this.props.UnSelectAll}
      >
        Unselect All
      </div>
    )
  }

  renderSelectAll = () => {
    return (
      <div
        className='filter-all'
        onClick={this.props.SelectAll}
      >
        Select All
      </div>
    )
  }

  render() {
    return (
      <aside id='channelBox'>
        <div>Channel Filter</div>
        {this.isSelectAll() ? this.renderUnselectAll() : this.renderSelectAll()}
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