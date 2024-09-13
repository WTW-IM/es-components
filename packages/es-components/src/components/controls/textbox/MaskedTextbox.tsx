import React, { useCallback, useState } from 'react';
import PropTypes, { ValidationMap, Validator } from 'prop-types';
import MaskedInput, { MaskedInputProps } from '@im-open/react-text-mask';

import { callRefs } from '../../util/callRef';
import inputMaskType, {
  maskTypes as inputMaskTypes,
  InputMaskType
} from './inputMaskType';
import Textbox, { propTypes as basePropTypes, TextboxProps } from './Textbox';

export const maskTypes = [...inputMaskTypes, 'custom'] as const;

export type MaskType = InputMaskType | (typeof maskTypes)[number];

export interface MaskedTextboxProps extends TextboxProps {
  maskType: MaskType;
  customMask?: MaskedInputProps;
}

type MaskedRenderFunc = NonNullable<MaskedInputProps['render']>;

const isCustomMask = (
  maskProps: MaskedInputProps | undefined
): maskProps is MaskedInputProps => Boolean(maskProps);

const MaskedTextbox = React.forwardRef<
  Maybe<HTMLInputElement>,
  MaskedTextboxProps
>(function MaskedTextbox(props, ref) {
  const { maskType, customMask, ...additionalTextProps } = props;
  const [inputRef, setInputRef] = useState<Maybe<HTMLInputElement>>();
  const hasCustomMaskType = maskType === 'custom';
  const customMaskIsSet = isCustomMask(customMask);
  const hasCustomMask = hasCustomMaskType ? customMaskIsSet : false;
  React.useImperativeHandle(ref, () => inputRef || undefined);

  if (hasCustomMaskType && !customMaskIsSet) {
    throw new Error('customMask must be provided when maskType is "custom"');
  }

  const maskArgs: MaskedInputProps =
    hasCustomMask && customMaskIsSet
      ? customMask
      : inputMaskType[maskType as InputMaskType];

  const inputRender = useCallback<MaskedRenderFunc>(
    (maskRef, textboxProps) => {
      const setRef: React.Ref<HTMLInputElement> = inputElement => {
        if (!inputElement) return;

        // we need to set both the mask ref and the passed in ref
        callRefs(
          inputElement,
          maskRef as React.ForwardedRef<HTMLInputElement>,
          setInputRef,
          ref as React.ForwardedRef<HTMLInputElement>
        );
      };
      return <Textbox ref={setRef} {...textboxProps} />;
    },
    [ref]
  );

  return (
    <MaskedInput
      render={inputRender}
      {...maskArgs}
      type="text"
      {...additionalTextProps}
    />
  );
});

type MaskedValidator<T extends keyof MaskedInputProps> = Validator<
  MaskedInputProps[T]
>;

export const propTypes = {
  ...basePropTypes,
  /** Sets a mask type on the input */
  maskType: PropTypes.oneOf<MaskType>(maskTypes).isRequired,
  /** Provide a custom mask */
  customMask: PropTypes.shape<ValidationMap<MaskedInputProps>>({
    mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    guide: PropTypes.bool as MaskedValidator<'guide'>,
    placeholderChar: PropTypes.string as MaskedValidator<'placeholderChar'>,
    keepCharPositions: PropTypes.bool as MaskedValidator<'keepCharPositions'>,
    pipe: PropTypes.func as MaskedValidator<'pipe'>,
    showMask: PropTypes.bool as MaskedValidator<'showMask'>
  })
};

MaskedTextbox.propTypes = propTypes;

export default MaskedTextbox;
