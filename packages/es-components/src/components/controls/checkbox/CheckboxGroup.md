Use a `CheckboxGroup` component to render a group of checkboxes. Provide a `checkAllText` string to display an optional "check all" box. An array of values is returned via the `onChange` handler.

```
import Control from '../Control';
import Fieldset from '../../containers/fieldset/Fieldset';

function CheckboxGroupExample() {
  const [activity, setActivity] = React.useState([]);

  function handleChange(values) {
    setActivity(values);
  }

  const checkboxOptions = [
    {
      value: 'hiking'
    },
    {
      value: 'biking',
      checked: true
    },
    {
      value: 'kayaking'
    },
    {
      value: 'camping'
    }
  ];

  return (
    <>
      <Control>
        <Fieldset legendContent="Recreational Activities">
          <CheckboxGroup options={checkboxOptions} onChange={handleChange} checkAllText="Select all activities" />
        </Fieldset>
      </Control>
      <p>You've selected: {activity.toString()}</p>
    </>
  )
};

<CheckboxGroupExample />
```
