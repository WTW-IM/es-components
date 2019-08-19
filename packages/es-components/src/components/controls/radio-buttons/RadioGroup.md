Group `RadioButton` components together using a `RadioGroup`. Any additional props passed to `RadioGroup` will propagate to each individual `RadioButton`.

```
import RadioButton from './RadioButton';
import Control from '../Control';
import Fieldset from '../../containers/fieldset/Fieldset';

function RadioGroupExample() {
  const [activity, setActivity] = React.useState('nothing')

  function handleRadioChange(event) {
    setActivity(event.target.value)
  }

  return (
    <>
      <Control orientation="inline">
        <Fieldset legendContent="Recreational Activities">
          <RadioGroup name="recreational-activities" onChange={handleRadioChange} selectedValue={activity}>
            <RadioButton value="hiking">Hiking</RadioButton>
            <RadioButton value="biking" disabled>Biking</RadioButton>
            <RadioButton value="kayaking">Kayaking</RadioButton>
            <RadioButton value="camping">Camping</RadioButton>
          </RadioGroup>
        </Fieldset>
      </Control>
      <p>You've selected: {activity}</p>
    </>
  )
};

<RadioGroupExample />
```

Each radio is disabled when the `disableAllOptions` prop is true.

```
import RadioButton from './RadioButton';
import Control from '../Control';

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
import RadioButton from './RadioButton';
import Control from '../Control';
import Fieldset from '../../containers/fieldset/Fieldset';

const options = [
  <RadioButton key="1" value="planes">Planes</RadioButton>,
  <RadioButton key="2" value="trains">Trains</RadioButton>,
  <RadioButton key="3" value="automobiles">Automobiles</RadioButton>
];

<div>
  <Control validationState="success">
    <Fieldset legendContent="Success">
      <RadioGroup name="success">
        {options}
      </RadioGroup>
    </Fieldset>
  </Control>

  <Control validationState="warning">
    <Fieldset legendContent="Warning">
      <RadioGroup name="warning">
        {options}
      </RadioGroup>
    </Fieldset>
  </Control>

  <Control validationState="danger" orientation="inline" hasValidationBorder>
    <Fieldset legendContent="Danger">
      <RadioGroup name="danger">
        {options}
      </RadioGroup>
    </Fieldset>
  </Control>
</div>
```
