import React, { useState, useEffect, useRef } from 'react';
import { SongObj } from '../utils/interfaces';

interface SortBarProps {
    songs: SongObj[];
    groupChannels: boolean;
    groupChannelsEnable: (songs: SongObj[]) => void;
    sortDateNewest: boolean;
    dateSortNewest: (songs: SongObj[], bool: boolean) => void;
}

const SortBar = ({
    songs,
    groupChannels,
    groupChannelsEnable,
    sortDateNewest,
    dateSortNewest
} : SortBarProps) => {

    const nodeSort = useRef<HTMLLIElement>(null);

    const [dropdownDateShow, setDropdownDateShow] = useState(false)

    const dropdownToggle = () => {
        setDropdownDateShow(!dropdownDateShow)
    }

    const renderDropdown = (songs: SongObj[]) => {
        return (
            <ul
                className='dropdown slideDown'
            >
                <li
                    className='dropdown-item'
                    onClick={() => {
                        dateSortNewest(songs, true);
                        dropdownToggle();
                    }}
                >
                    {sortDateNewest ? <span className='dropdown-current'></span> : <span className='dropdown-empty'></span>} 
                    <span>Date (Newest First)</span>
                </li>

                <li
                    className='dropdown-item'
                    onClick={() => {
                        dateSortNewest(songs, false);
                        dropdownToggle();
                    }}
                >
                    {sortDateNewest ? <span className='dropdown-empty'></span> : <span className='dropdown-current'></span>} 
                    <span>Date (Oldest First)</span>
                </li>
            </ul>
        )
    }

    const handleClick = ({target}: MouseEvent): void => {
        if (nodeSort.current && nodeSort.current.contains(target as Node)) {
            // inside click
            return;
        }
        // outside click
        setDropdownDateShow(false)
    };


    // Handle popup mouse clicks
    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div id='sortBar'>
  
            <div id='logo'>
                <a href='https://nsong.herokuapp.com'
                >nsong</a>
            </div>
    
            {
                songs &&
                <ul id='sort-options'>
                    <li id='groupChannels'>
                        <label htmlFor='groupChannelsSort'>
                            <input
                                type='checkbox'
                                id='groupChannelsSort'
                                checked={groupChannels}
                                onChange={() => groupChannelsEnable(songs)}
                            />
                            <span className="checkCustomGroup"></span>
                            <span>Group By Channel</span>
                        </label>
                    </li>
                    
                    <li
                        id='dateSort'
                        onClick={dropdownToggle}
                        ref={nodeSort}
                    >
                        <div className='dropdownToggle'>
                            <span>{sortDateNewest ? 'Date (Newest First)' : 'Date (Oldest First)'}</span>
                            {dropdownDateShow ? <i className='arrow up'></i> : <i className='arrow down'></i>}
                        </div>
                        {dropdownDateShow ? renderDropdown(songs) : <ul className='dropdown'></ul>}
                    </li>
                </ul>
            }
            
        </div>
    )
}

export default SortBar;