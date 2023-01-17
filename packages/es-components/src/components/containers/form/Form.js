import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import isBool from '../../util/isBool';
import { useTheme } from '../../util/useTheme';

export const FormContext = createContext({ flat: false });

export default function Form({ flat: flatProp, ...otherProps }) {
  const { inputStyles = {} } = useTheme();
  const { defaultFormStyle } = inputStyles;
  const originalFormContext = useContext(FormContext);
  const newContext = { ...originalFormContext };
  if (defaultFormStyle) {
    newContext[defaultFormStyle] = isBool(newContext[defaultFormStyle])
      ? newContext[defaultFormStyle]
      : true;
  }
  newContext.flat = isBool(flatProp) ? flatProp : newContext.flat;
  return (
    <FormContext.Provider value={newContext}>
      <form {...otherProps} />
    </FormContext.Provider>
  );
}

Form.propTypes = {
  /** Apply the Flat Style to all children */
  flat: PropTypes.bool
};

Form.defaultProps = {
  flat: undefined
};
