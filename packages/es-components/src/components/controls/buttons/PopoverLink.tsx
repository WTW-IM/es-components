import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinkButton from './LinkButton';
import {
  buttonVariantStyleTypes,
  ButtonVariantStyleType
} from 'es-components-shared-types';

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

type PopoverLinkProps = JSXElementProps<'button'> & {
  suppressUnderline?: boolean;
  styleType?: Maybe<ButtonVariantStyleType>;
};

const PopoverLink = React.forwardRef<HTMLButtonElement, PopoverLinkProps>(
  function ForwardedPopoverLink(
    props,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) {
    const { children, styleType, suppressUnderline, ...other } = props;

    return (
      <StyledButton
        ref={forwardedRef}
        styleType={styleType || 'default'}
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
  styleType: PropTypes.oneOf(buttonVariantStyleTypes),
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool
};

PopoverLink.defaultProps = {
  styleType: 'primary',
  suppressUnderline: false
};

export default PopoverLink;
