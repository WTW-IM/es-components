import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinkButton from './LinkButton';
import {
  buttonVariantStyleTypes,
  ButtonVariantStyleType
} from '../../../../../../types/ESTheme';

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
  Omit<JSX.IntrinsicElements['button'], 'ref'> & {
    suppressUnderline?: boolean;
    styleType?: Maybe<ButtonVariantStyleType>;
  }
>;

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

export const propTypes = {
  ...StyledButton.propTypes,
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.oneOf(buttonVariantStyleTypes),
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool
};

export const defaultProps = {
  ...StyledButton.defaultProps,
  styleType: 'primary',
  suppressUnderline: false
};

PopoverLink.propTypes = propTypes;
PopoverLink.defaultProps = defaultProps;

export default PopoverLink;
