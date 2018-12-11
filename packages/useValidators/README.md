# useValidators

This is a hook that allows the definition of validators that can be used to run against a provided value. 

# Installation

### npm
```bash
npm install @es-hooks/useValidators
```

### yarn
```bash
yarn add @es-hooks/useValidators
```


# Usage

Validation functions are required to operate on a single value and return a result. There are no limitations on what type of value is being validated or what the validation function returns. The `ValidationContext` that is returned from `useValidators` will have the most update to date validation results.


## Basic usage

```jsx
import React, { useContext } from 'react'
import useValidators from '@es-hooks/useValidators'

function isOverThreeCharacters(value) {
  return value.length > 3 ? true : false
}

function MyComponent(props) {
  const [results, invokeValidators] = useValidators([isOverThreeCharacters])

  const isValid = results.every(result => result !== false)

  return (
    <>
      <label htmlFor="firstName">First name</label>
      <input type="text" id="firstName" onChange={e => invokeValidators(e.target.value)} />

      <h1>{isValid ? Valid! : Invalid!}</h1>
    </>
  )
}
```

## Validating an object

```jsx
import React, { useContext } from 'react'
import useValidators from '@es-hooks/useValidators'

function hasFirstAndLastName(person) {
  if (person.firstName && person.lastName) {
    return person.firstName.length > 0 && person.lastName.length > 0;
  }
  return false;
}

function isAtLeastEighteenYearsOld(person) {
  return parseInt(person.age, 10) >= 18;
}

function MyComponent(props) {
  const [results, invokeValidators] = useValidators([
    hasFirstAndLastName,
    isAtLeastEighteenYearsOld
  ]);
  const [person, setPerson] = React.useState({});

  function validatePersonDetails() {
    invokeValidators(person);
  }

  function updatePersonField(field) {
    return function setValue(event) {
      person[field] = event.target.value;
      setPerson(person);
    };
  }

  return (
    <>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        id="firstName"
        onBlur={updatePersonField("firstName")}
      />
      <br />

      <label htmlFor="lastName">Last name</label>
      <input type="text" id="lastName" onBlur={updatePersonField("lastName")} />
      <br />

      <label htmlFor="age">Age</label>
      <input type="text" id="age" onBlur={updatePersonField("age")} />
      <br />

      <button type="button" onClick={validatePersonDetails}>
        Validate Person
      </button>

      <pre>{JSON.stringify(results)}</pre>
    </>
  );
}