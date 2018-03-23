import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import defaultTheme from '../../theme/defaultTheme';

import { noop } from 'lodash';
import Button from '../../controls/buttons/Button';

import { Manager, Target, Popper, Arrow } from 'react-popper';
import popoverStyles from './popoverStyles';

const Container = styled(Manager)`
  display: inline-block;
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

const PopoverTitle = styled.h3`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.primary};
  padding: 8px 14px;
  margin: 0;
`;

const PopoverContent = styled.div`
  text-align: left;
  padding: 8px 14px;
`;

function PopoverTest({
  popoverTitle,
  popoverContent,
  popoverPlacement,
  children,
  theme
}) {
  const arrowStyles = popoverStyles(theme.colors);
  /* eslint-disable no-unused-expressions */
  injectGlobal`${arrowStyles}`;
  /* eslint-enable no-unused-expressions */

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Target>
          <TriggerButton isLinkButton handleOnClick={noop}>
            {children}
          </TriggerButton>
        </Target>
        <Popper className="popper" placement={popoverPlacement}>
          <PopoverContainer>
            <PopoverTitle>{popoverTitle}</PopoverTitle>
            <PopoverContent>{popoverContent}</PopoverContent>
          </PopoverContainer>

          <Arrow className="popper__arrow" />
        </Popper>
      </Container>
    </ThemeProvider>
  );
}

PopoverTest.propTypes = {
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
  theme: defaultTheme
};

export default PopoverTest;
