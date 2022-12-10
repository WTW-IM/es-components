import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinkButton from './LinkButton';
import { useTheme } from '../../util/useTheme';
import type { PopoverStyleType } from '../../containers/popover/PopoverShared';

const StyledButton = styled(LinkButton)<{ suppressUnderline?: boolean }>`
  text-underline-position: under;
  text-decoration-skip-ink: none;
  text-decoration: ${props =>
    props.suppressUnderline ? 'none' : `dashed underline`};

  &:hover,
  :focus {
    text-decoration: ${props =>
      props.suppressUnderline ? 'none' : `solid underline`};
  }
`;

type PopoverLinkProps = React.PropsWithChildren<
  JSX.IntrinsicElements['button'] & {
    suppressUnderline?: boolean;
    styleType?: PopoverStyleType;
  }
>;

const PopoverLink = React.forwardRef<HTMLButtonElement, PopoverLinkProps>(
  function ForwardedPopoverLink(props, ref) {
    const { children, styleType, suppressUnderline, ...other } = props;
    const theme = useTheme();
    const variant =
      theme.buttonStyles.linkButton.variant[styleType || 'default'];

    return (
      <StyledButton
        ref={ref}
        variant={variant}
        suppressUnderline={suppressUnderline}
        {...other}
      >
        {children}
      </StyledButton>
    );
  }
);

PopoverLink.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.string,
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool
};

PopoverLink.defaultProps = {
  styleType: 'primary',
  suppressUnderline: false
};

export default PopoverLink;
