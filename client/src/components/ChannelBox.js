import React, { Component } from 'react';

class ChannelBox extends Component {
  render() {
    return (
      <aside id='channelBox'>
        <div>Channel Filter</div>
        <div className='filter-channel' >
          <input type='checkbox' />
          <span className='filter-title' >
            Show All
          </span>
        </div>
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
        <div className='filter-channel'>
          <input type='checkbox' />
          <span className='filter-title'>
            Show None
          </span>
        </div>
      </aside>
    )
  }
}

export default ChannelBox;