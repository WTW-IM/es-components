Group `RadioButton` components together using a `RadioGroup`. Any additional props passed to `RadioGroup` will propagate to each individual `RadioButton`.

```
const RadioButton = require('./RadioButton').default
const Control = require('../Control').default

function RadioGroupExample() {
  const [activity, setActivity] = React.useState('nothing')

  function handleRadioChange(event) {
    setActivity(event.target.value)
  }

  return (
    <>
      <Fieldset legendContent="Recreational Activities">
        <Control orientation="inline" validationState="success">
          <RadioGroup name="recreational-activities" onChange={handleRadioChange} selectedValue={activity}>
            <RadioButton value="hiking">Hiking</RadioButton>
            <RadioButton value="biking" disabled>Biking</RadioButton>
            <RadioButton value="kayaking">Kayaking</RadioButton>
            <RadioButton value="camping">Camping</RadioButton>
          </RadioGroup>
        </Control>
      </Fieldset>
      <p>You've selected: {activity}</p>
    </>
  )
};

<RadioGroupExample />
```

Each radio is disabled when the `disableAllOptions` prop is true.

```
const RadioButton = require('./RadioButton').default;
const Control = require('../Control').default;

<Control>
  <RadioGroup
    name="plates"
    selectedValue="seafood"
    disableAllOptions
  >
    <RadioButton value="meat">Meat</RadioButton>
    <RadioButton value="seafood">Seafood</RadioButton>
    <RadioButton value="vegetarian">Vegetarian</RadioButton>
  </RadioGroup>
</Control>
```

### Validation States

```
const RadioButton = require('./RadioButton').default;
const Control = require('../Control').default;

const options = [
  <RadioButton key="1" value="planes">Planes</RadioButton>,
  <RadioButton key="2" value="trains">Trains</RadioButton>,
  <RadioButton key="3" value="automobiles">Automobiles</RadioButton>
];

<div>
  <Fieldset legendContent="Success">
    <Control validationState="success">
      <RadioGroup name="success">
        {options}
      </RadioGroup>
    </Control>
  </Fieldset>

  <Fieldset legendContent="Warning">
    <Control validationState="warning">
      <RadioGroup name="warning">
        {options}
      </RadioGroup>
    </Control>
  </Fieldset>

  <Fieldset legendContent="Danger">
    <Control validationState="danger" orientation="inline">
      <RadioGroup name="danger">
        {options}
      </RadioGroup>
    </Control>
  </Fieldset>
</div>
```