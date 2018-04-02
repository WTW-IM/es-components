import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../../theme/defaultTheme';

import Button from '../../controls/buttons/Button';

import Popup from './Popup';

const Container = styled.div`
  display: ${props => (props.isInline ? 'inline-block' : 'initial')};
`;

const TriggerButton = styled(Button)`
  border-bottom: 1px dotted;
  text-decoration: none;

  color: blue;
`;

const PopoverContainer = styled.div`
  max-width: 275px;
  background: ${props => props.theme.colors.white};
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const PopoverHeader = styled.h3`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.primary};
  font-size: 18px;
  padding: 8px 14px;
  margin: 0;
`;

const PopoverContent = styled.div`
  padding: 8px 14px;
`;

class PopoverTest extends React.Component {
  state = {
    isOpen: false
  };

  handleOnClick = event => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen }, () => this.props.isOpen);
  };

  hidePop = event => {
    this.setState({ isOpen: false }, () => this.props.isOpen);
  };

  render() {
    const {
      popoverTitle,
      popoverContent,
      popoverPlacement,
      children,
      arrowSize = 'md',
      isTriggerInline = true,
      theme
    } = this.props;

    const triggerButton = (
      <TriggerButton isLinkButton handleOnClick={this.handleOnClick}>
        {children}
      </TriggerButton>
    );

    return (
      <ThemeProvider theme={theme}>
        <Container isInline={isTriggerInline}>
          <Popup
            trigger={triggerButton}
            placement={popoverPlacement}
            transitionIn={this.state.isOpen}
            onHide={this.hidePop}
            arrowSize={arrowSize}
          >
            <PopoverContainer>
              <PopoverHeader>{popoverTitle}</PopoverHeader>

              <PopoverContent>{popoverContent}</PopoverContent>
            </PopoverContainer>
          </Popup>
        </Container>
      </ThemeProvider>
    );
  }
}

PopoverTest.propTypes = {
  name: PropTypes.string,
  isOpen: PropTypes.bool,
  keepOpen: PropTypes.bool,
  arrowSize: PropTypes.oneOf(['sm', 'md', 'lg', 'default']),
  disablePopoverFlipping: PropTypes.bool,
  isTriggerInline: PropTypes.bool,

  /** The link content which activates the popover */
  children: PropTypes.node.isRequired,
  /** The text displayed in the popover title section */
  popoverTitle: PropTypes.string,
  /** The content displayed in the popover body */
  popoverContent: PropTypes.node,
  /** The placement of the popover in relation to the link */
  popoverPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Function to toggle display of popover */
  onToggle: PropTypes.func,
  /** Displays or hides the popover */
  showPopover: PropTypes.bool,
  /** Display a close ('x') button */
  showCloseButton: PropTypes.bool,
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool,
  /** The button style of the popover link */
  buttonStyle: PropTypes.string,
  /** Sets the link to use a text rather than a button style **/
  isLinkButton: PropTypes.bool,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object
};

PopoverTest.defaultProps = {
  popoverPlacement: 'bottom',
  hasCloseButton: true,
  theme: defaultTheme
};

export default PopoverTest;
