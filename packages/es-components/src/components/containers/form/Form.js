import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import isBool from '../../util/isBool';
import { useTheme } from '../../util/useTheme';

export default function Form({ flat, ...otherProps }) {
  return (
    <FormContextProvider value={isBool(flat) ? { flat } : {}}>
      <form {...otherProps} />
    </FormContextProvider>
  );
}

export const FormContext = createContext({});

export const FormContextProvider = ({ value, ...props }) => {
  const { inputStyles = {} } = useTheme();
  const { defaultFormStyle } = inputStyles;
  const parentFormContext = useContext(FormContext);
  const newContext = { ...parentFormContext, ...(value || {}) };

  if (defaultFormStyle) {
    newContext[defaultFormStyle] = isBool(newContext[defaultFormStyle])
      ? newContext[defaultFormStyle]
      : true;
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
