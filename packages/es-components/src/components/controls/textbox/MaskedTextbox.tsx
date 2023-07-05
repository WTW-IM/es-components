import React, { useCallback, useState } from 'react';
import PropTypes, { ValidationMap, Validator } from 'prop-types';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

import { callRefs } from '../../util/callRef';
import inputMaskType, {
  maskTypes as inputMaskTypes,
  InputMaskType
} from './inputMaskType';
import Textbox, {
  propTypes as basePropTypes,
  defaultProps as baseDefaultProps,
  TextboxProps
} from './Textbox';

export const maskTypes = [...inputMaskTypes, 'custom'] as const;

export type MaskType = InputMaskType | (typeof maskTypes)[number];

export interface MaskedTextboxProps extends TextboxProps {
  maskType: MaskType;
  customMask?: MaskedInputProps;
}

type MaskedRenderFunc = NonNullable<MaskedInputProps['render']>;

const MaskedTextbox = React.forwardRef<
  Maybe<HTMLInputElement>,
  MaskedTextboxProps
>(function MaskedTextbox(props, ref) {
  const { maskType, customMask, ...additionalTextProps } = props;
  const [inputRef, setInputRef] = useState<Maybe<HTMLInputElement>>();
  React.useImperativeHandle(ref, () => inputRef || undefined);

  if (maskType === 'custom' && !customMask) {
    throw new Error('customMask must be provided when maskType is "custom"');
  }

  const maskArgs =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    maskType === 'custom' ? customMask! : inputMaskType[maskType];

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

export const defaultProps = {
  ...baseDefaultProps,
  /** Sets a mask type on the input */
  customMask: undefined
};

MaskedTextbox.propTypes = propTypes;
MaskedTextbox.defaultProps = defaultProps;

export default MaskedTextbox;
