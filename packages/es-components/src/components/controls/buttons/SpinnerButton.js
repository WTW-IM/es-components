import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';
import Spinner from '../../base/spinner';

const DISPLAY_TYPES = {
    none: 'none',
    inline: 'inline'
};

function SpinnerButton({
    children,
    title,
    text
}) {
    const [displaySpinner, setDisplay] = useState(DISPLAY_TYPES.none);

    const loadSpinner = () => {
        setDisplay(DISPLAY_TYPES.inline);

        setTimeout(() => {
            setDisplay(DISPLAY_TYPES.none);
        }, 3500);
    }

    return (
        <Button onClick={loadSpinner} style={{ maxWidth: 100, height: 40}}>    
            {
                displaySpinner === 'inline' ? 
                    <Spinner height="70%" width="70%" title={title}/>
                    : <p> {text} </p>
            }
            {children}
        </Button>
    )
}

export default SpinnerButton;