import React, { Component } from 'react';

import { connect } from 'react-redux';
import { toggleChannel, selectAllChannel } from '../actions/channelActions';
import PropTypes from 'prop-types';

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
        onClick={() => this.props.selectAllChannel(bool)}
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
                onChange={() => this.props.toggleChannel(channel)}
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

ChannelBox.propTypes = {
  toggleChannel: PropTypes.func.isRequired,
  selectAllChannel: PropTypes.func.isRequired,
  channelSort: PropTypes.object.isRequired,
  logos: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  channelSort: state.channelSort.channelSort,
  logos: state.channelSort.logos
});

export default connect(mapStateToProps, { toggleChannel, selectAllChannel })(ChannelBox);