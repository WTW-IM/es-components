import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import isBool from '../../util/isBool';
import { useTheme } from '../../util/useTheme';
import { FormStyle } from 'es-components-shared-types';

export type FormContextShape = {
  [key in FormStyle]?: boolean;
};

export type FormProps = JSXElementProps<'form'> & {
  flat?: boolean;
};

const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
  { flat, ...otherProps },
  ref
) {
  return (
    <FormContextProvider value={isBool(flat) ? { flat } : {}}>
      <form ref={ref} {...otherProps} />
    </FormContextProvider>
  );
});

export default Form;

export const FormContext = createContext<FormContextShape>({});

export const FormContextProvider = ({
  value,
  ...props
}: React.ProviderProps<FormContextShape>) => {
  const { inputStyles = {} } = useTheme();
  const { defaultFormStyle } = inputStyles as { defaultFormStyle?: FormStyle };
  const parentFormContext = useContext(FormContext);
  const newContext: FormContextShape = {
    ...parentFormContext,
    ...(value || {})
  };

  if (defaultFormStyle) {
    const newDefaultValue = isBool(newContext[defaultFormStyle])
      ? newContext[defaultFormStyle]
      : true;
    newContext[defaultFormStyle] = newDefaultValue;
  }

  return (
    <FormContext.Provider value={newContext} {...props}></FormContext.Provider>
  );
};

FormContextProvider.propTypes = {
  value: PropTypes.object
};

Form.propTypes = {
  /** Apply the Flat Style to all children */
  flat: PropTypes.bool
};

Form.defaultProps = {
  flat: undefined
};
