import React from 'react';
import PropTypes, { ValidationMap } from 'prop-types';
import styled from 'styled-components';
import LinkButton, {
  propTypes as linkButtonPropTypes,
  defaultProps as linkButtonDefaultProps,
  LinkButtonProps
} from './LinkButton';
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

export type PopoverLinkProps = LinkButtonProps & {
  suppressUnderline?: Maybe<boolean>;
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
        suppressUnderline={suppressUnderline || false}
        {...other}
      >
        {children || ''}
      </StyledButton>
    );
  }
);

export const propTypes: PropTypesOf<PopoverLinkProps> = {
  ...linkButtonPropTypes,
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.oneOf(buttonVariantStyleTypes),
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool
};

export const defaultProps = {
  ...linkButtonDefaultProps,
  styleType: 'primary' as ButtonVariantStyleType,
  suppressUnderline: false
};

PopoverLink.propTypes = propTypes as ValidationMap<PopoverLinkProps>;
PopoverLink.defaultProps = defaultProps;

export default PopoverLink;
