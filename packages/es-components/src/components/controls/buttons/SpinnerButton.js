import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Spinner from '../../base/spinner/Spinner';

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
  description,
  ...other
}) {
  const [displaySpinner, setDisplay] = useState(DISPLAY_TYPES.none);

  const defaultDimensions = {
    maxWidth: 100,
    height: 40
  };

  const loadSpinnerTriggerOnClick = () => {
    onClick();
    setDisplay(DISPLAY_TYPES.inline);

    setTimeout(() => {
      setDisplay(DISPLAY_TYPES.none);
    }, 2000);
  };

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
      {displaySpinner === 'inline' ? (
        <Spinner
          height="70%"
          width="70%"
          title={title}
          description={description}
        />
      ) : (
        children
      )}
    </Button>
  );
}

SpinnerButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  styleType: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'default', 'sm', 'xs']),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool,
  /** Override the default block mobile style */
  mobileBlock: PropTypes.bool,
  /** Styles the Button with a flat left edge */
  flatLeftEdge: PropTypes.bool,
  /** Styles the Button with a flat right edge */
  flatRightEdge: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string
};

SpinnerButton.defaultProps = {
  styleType: 'default',
  onClick: () => {},
  block: false,
  mobileBlock: true,
  size: 'default',
  flatLeftEdge: false,
  flatRightEdge: false,
  title: '',
  description: ''
};

export default SpinnerButton;
