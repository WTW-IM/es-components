/* eslint no-confusing-arrow: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import defaultTheme from '../../theme/defaultTheme';
import { buttonStyleTypes, defaultButtonVariants } from './button-variants';

class ToggleButton extends React.Component {
  state = {
    isPressed: this.props.isPressed
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPressed !== this.state.isPressed) {
      this.setState({ isPressed: nextProps.isPressed });
    }
  }

  toggleButton = event => {
    this.setState(previousState => ({ isPressed: !previousState.isPressed }));
    this.props.handleOnClick(event);
  };

  render() {
    const {
      buttonClasses,
      styleType,
      styledLink,
      size,
      block,
      alternative,
      theme
    } = this.props;
    const buttonVariant = defaultButtonVariants(theme.colors, styleType);
    return (
      <StyledToggleButton
        handleOnClick={this.toggleButton}
        buttonClasses={buttonClasses}
        styleType={styleType}
        styleLink={styledLink}
        size={size}
        block={block}
        alternative={alternative}
        theme={theme}
        buttonVariant={buttonVariant}
        isPressed={this.state.isPressed}
      >
        {this.props.children}
      </StyledToggleButton>
    );
  }
}

const StyledToggleButton = styled(Button)`
  background-color: ${props =>
    props.isPressed
      ? props.buttonVariant.hoverBackgroundColor
      : props.buttonVariant.backgroundColor};
`;

const buttonSizes = ['lg', 'default', 'sm', 'xs'];

ToggleButton.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonClasses: PropTypes.string,
  styleType: PropTypes.oneOf(buttonStyleTypes),
  styledLink: PropTypes.bool,
  size: PropTypes.oneOf(buttonSizes),
  block: PropTypes.bool,
  alternative: PropTypes.bool,
  theme: PropTypes.object,
  isPressed: PropTypes.bool
};

ToggleButton.defaultProps = {
  theme: defaultTheme
};

export default ToggleButton;
