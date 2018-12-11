const React = require('react');

module.exports = function useValidators(validators) {
  const [validationResults, setValidationResults] = React.useState([]);

  function invokeValidators(value) {
    const results = validators.map(function invokeValidator(validator) {
      return validator(value);
    });

    setValidationResults(results);
  }

  return [validationResults, invokeValidators];
};
