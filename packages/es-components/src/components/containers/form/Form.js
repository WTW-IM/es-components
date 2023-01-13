import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import isBool from '../../util/isBool';

export const FormContext = createContext({ flat: false });

export default function Form({ flat: flatProp, ...otherProps }) {
  const formContext = useContext(FormContext);
  const flat = isBool(flatProp) ? flatProp : formContext.flat;
  return (
    <FormContext.Provider value={{ flat }}>
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
