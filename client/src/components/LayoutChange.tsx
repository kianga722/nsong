import React from 'react';

interface LayoutChangeProps {
    layoutChange: boolean;
    layoutToggle: () => void;
}

const LayoutChange = ({
    layoutChange,
    layoutToggle
} : LayoutChangeProps) => {
    return (
        <aside
          id='layoutChange'
          onClick={layoutToggle}
        >{layoutChange ? 'Switch It Back!': 'Switch Layout!'}</aside>
    )
}

export default LayoutChange;