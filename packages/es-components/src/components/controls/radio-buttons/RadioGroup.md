Group `RadioButton` components together using a `RadioGroup`. Any additional props passed to `RadioGroup` will propagate to each individual `RadioButton`.

`RadioButton` supports a `className` prop for flexibility and styled-component usage. Any classes added will be applied to the wrapping `label` surrounding the display elements.

<a href="https://8lf1uv.axshare.com/#id=7zaoiz&p=multi_field_error&dp=0&g=1" target="blank"><div style="color:#cc0000;text-transform:uppercase;margin:1em 0;">View Error Pattern Examples</div></a>

```jsx
import RadioButton from './RadioButton';
import Control from '../Control';
import Fieldset from '../../containers/fieldset/Fieldset';

function RadioGroupExample() {
  const [activity, setActivity] = React.useState('nothing');

  function handleRadioChange(event) {
    setActivity(event.target.value);
  }

  return (
    <>
      <Control orientation="inline">
        <Fieldset legendContent="Recreational Activities">
          <RadioGroup
            name="recreational-activities"
            onChange={handleRadioChange}
            selectedValue={activity}
          >
            <RadioButton value="hiking">Hiking</RadioButton>
            <RadioButton value="biking" disabled>
              Biking
            </RadioButton>
            <RadioButton value="kayaking">Kayaking</RadioButton>
            <RadioButton value="camping">Camping</RadioButton>
          </RadioGroup>
        </Fieldset>
      </Control>
      <p>You've selected: {activity}</p>
    </>
  );
}

<RadioGroupExample />;
```

Each radio is disabled when the `disableAllOptions` prop is true.

```jsx
import RadioButton from './RadioButton';
import Control from '../Control';

<Control>
  <RadioGroup name="plates" selectedValue="seafood" disableAllOptions>
    <RadioButton value="meat">Meat</RadioButton>
    <RadioButton value="seafood">Seafood</RadioButton>
    <RadioButton value="vegetarian">Vegetarian</RadioButton>
  </RadioGroup>
</Control>;
```

### Validation States

```jsx
import RadioButton from './RadioButton';
import Control from '../Control';
import Fieldset from '../../containers/fieldset/Fieldset';

const options = [
  <RadioButton key="1" value="planes">
    Planes
  </RadioButton>,
  <RadioButton key="2" value="trains">
    Trains
  </RadioButton>,
  <RadioButton key="3" value="automobiles">
    Automobiles
  </RadioButton>
];

const [selectedValue, setSelectedValue] = React.useState('');

<div>
  <Control validationState="success">
    <Fieldset legendContent="Success">
      <RadioGroup
        name="success"
        selectedValue={selectedValue}
        onChange={e => setSelectedValue(e.target.value)}
      >
        {options}
      </RadioGroup>
    </Fieldset>
  </Control>

  <Control validationState="warning">
    <Fieldset legendContent="Warning">
      <RadioGroup
        name="warning"
        selectedValue={selectedValue}
        onChange={e => setSelectedValue(e.target.value)}
      >
        {options}
      </RadioGroup>
    </Fieldset>
  </Control>

  <Control validationState="danger" orientation="inline" hasValidationBorder>
    <Fieldset legendContent="Danger">
      <RadioGroup
        name="danger"
        selectedValue={selectedValue}
        onChange={e => setSelectedValue(e.target.value)}
      >
        {options}
      </RadioGroup>
    </Fieldset>
  </Control>
</div>;
```
