import React, { useState } from 'react';

import Button from './Button';
import Spinner from '../../base/spinner';

const DISPLAY_TYPES = {
    none: 'none',
    inline: 'inline'
};

function SpinnerButton({
    children,
    onClick,
    styleType,
    size,
    block,
    mobileBlock,
    flatLeftEdge,
    flatRightEdge,
    title,
    ...other
}) {
    const [displaySpinner, setDisplay] = useState(DISPLAY_TYPES.none);

    const defaultDimensions = {
        maxWidth: 100, 
        height: 40,
    }

    const loadSpinnerTriggerOnClick = () => {
        onClick();
        setDisplay(DISPLAY_TYPES.inline);

        setTimeout(() => {
            setDisplay(DISPLAY_TYPES.none);
        }, 2000);
    }

    return (
        <Button
            size={size}
            block={block}
            mobileBlock={mobileBlock}
            flatLeftEdge={flatLeftEdge}
            flatRightEdge={flatRightEdge}
            onClick={loadSpinnerTriggerOnClick}
            styleType={styleType}
            style={defaultDimensions}
            {...other}
        >
            {
                displaySpinner === 'inline' ? 
                    <Spinner height="70%" width="70%" title={title}/>
                    : children
            }
        </Button>
    )
}

export default SpinnerButton;