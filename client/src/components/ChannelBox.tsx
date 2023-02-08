import React from 'react';
import { ChannelsObj } from '../utils/interfaces';
import { logos } from '../utils/constants';

interface ChannelBoxProps {
    channelSort: ChannelsObj;
    toggleSort: (channel: string) => void;
    selectAll: (bool: boolean) => void;
}

const ChannelBox = ({
    channelSort,
    toggleSort,
    selectAll,
} : ChannelBoxProps) => {

    // Check if every filter option is selected
    const isSelectAll = (channelSort: ChannelsObj): boolean => {
        return Object.values(channelSort).every((channel) => { return channel === true })
    }

    // Render correct select all button
    const renderSelectAll = (bool: boolean, selectAll: (bool: boolean) => void) => {
        return (
            <div
                className='filter-all'
                onClick={() => selectAll(bool)}
            >
                {bool ? 'Select All':'Unselect All'}
            </div>
        )
    }

    return (
        <aside id='channelBox'>
            <div className='box-title'>Channel Filter</div>

            {isSelectAll(channelSort) ? renderSelectAll(false, selectAll) : renderSelectAll(true, selectAll)}

            {
                Object.keys(channelSort).map((channel) => (
                <label
                    key={channel}
                    htmlFor={`filter-${channel}`}
                >

                    <input
                        type='checkbox'
                        id={`filter-${channel}`}
                        checked={channelSort[channel]}
                        onChange={() => toggleSort(channel)}
                    />

                    <span className="checkCustomFilter">
                        <div className={`channelBox-logo ${logos[channel]}`}></div>
                    </span>

                    <span className='filter-title'>{channel}</span>
                </label>
                ))
            }
        </aside>
    )
}

export default ChannelBox;