import React from 'react';
import PropTypes, { ValidationMap } from 'prop-types';
import styled from 'styled-components';
import LinkButton, {
  propTypes as linkButtonPropTypes,
  LinkButtonProps
} from './LinkButton';
import {
  buttonVariantStyleTypes,
  ButtonVariantStyleType
} from 'es-components-shared-types';

interface PopoverLinkButtonStyledProps {
  $suppressUnderline: boolean;
}

const StyledButton = styled(LinkButton)<PopoverLinkButtonStyledProps>`
  text-decoration: ${({ $suppressUnderline }) =>
    $suppressUnderline ? 'none' : `dashed underline`};
  text-decoration-skip-ink: none;
  text-underline-position: under;

  &:hover,
  :focus {
    text-decoration: ${({ $suppressUnderline }) =>
      $suppressUnderline ? 'none' : `solid underline`};
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
    const {
      children,
      styleType = 'primary',
      suppressUnderline,
      ...other
    } = props;

    return (
      <StyledButton
        ref={forwardedRef}
        styleType={styleType || 'default'}
        $suppressUnderline={suppressUnderline || false}
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

PopoverLink.propTypes = propTypes as ValidationMap<PopoverLinkProps>;

export default PopoverLink;
