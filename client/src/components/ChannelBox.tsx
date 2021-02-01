import React, { Component } from 'react';

type ChannelBoxProps = {
  channelSort: {
    [key: string]: boolean;
  },
  toggleSort: (channel: string) => void,
  selectAll: (bool: boolean) => void,
  logos: {
    [key: string]: string;
  }
}


class ChannelBox extends Component<ChannelBoxProps, {}> {

  // Check if every filter option is selected
  isSelectAll = () => {
    return Object.values(this.props.channelSort).every((channel) => { return channel === true })
  }

  // Render correct select all button
  renderSelectAll = (bool: boolean) => {
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
            <label
              key={channel}
              htmlFor={`filter-${channel}`}
            >

              <input
                type='checkbox'
                id={`filter-${channel}`}
                checked={this.props.channelSort[channel]}
                onChange={() => this.props.toggleSort(channel)}
              />
              <span className="checkCustomFilter">
                <div className={`channelBox-logo ${this.props.logos[channel]}`}></div>
              </span>
              <span className='filter-title'>
                {channel}
              </span>

            </label>
          ))
        }
      </aside>
    )
  }
}

export default ChannelBox;