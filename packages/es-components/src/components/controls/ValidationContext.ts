import React from 'react';
import { ValidationStyleType } from 'es-components-shared-types';

const ValidationContext = React.createContext<ValidationStyleType>('default');
export default ValidationContext;

export const useValidationState = () => React.useContext(ValidationContext);
