From the top level, you can control behaviors in the drawer components.

### Input Behavior

You can set the input type to "radio", which will cause the drawers to act as radio buttons and
using accordion-like behavior for the drawer open states. The `SelectionDrawer` will take all of the
`RadioGroup` props in this instance.

```javascript
<SelectionDrawer type="radio" name="medicare-coverage">
  <SelectionDrawer.Item header="Medicare coverage 1" value="medicareCoverage1">
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 2" value="medicareCoverage2">
    <p>
      Spend all night ensuring people don't sleep sleep all day walk on car
      leaving trail of paw prints on hood and windshield. Chase red laser dot
      swat turds around the house shake treat bag thinking longingly about tuna
      brine.
    </p>

    <p>
      Chew on cable why must they do that, and find empty spot in cupboard and
      sleep all day.
    </p>
  </SelectionDrawer.Item>
</SelectionDrawer>
```

You can set the input type to "checkbox", which will allow more than one drawer to be selected.

```javascript
<SelectionDrawer type="checkbox" name="medicare-coverage">
  <SelectionDrawer.Item header="Medicare coverage 3" value="medicareCoverage3">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 4" value="medicareCoverage4">
    Plays league of legends sleep on dog bed, force dog to sleep on floor so
    drink water out of the faucet. Stare at ceiling light. Plan steps for world
    domination knock dish off table cant eat out of my own dish. Meowzer! Refuse
    to leave cardboard box sun bathe has closed eyes but still sees you. Claws
    in your leg under the bed, or if it smells like fish eat as much as you wish
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 5" value="medicareCoverage5">
    <p>
      Ears back wide eyed then cats take over the world meowing non stop for
      food. Mrow. Always hungry lick arm hair. Cat not kitten around scamper
      hiss at vacuum cleaner. Yum has closed eyes but still sees you intently
      sniff hand.
    </p>

    <p>
      Chew on cable. Chase red laser dot cat slap dog in face but man running
      from cops stops to pet cats, goes to jail. Present belly, scratch hand
      when stroked make muffins. Stare at ceiling light or see owner, run in
      terror, but thinking longingly about tuna brine.
    </p>
  </SelectionDrawer.Item>
</SelectionDrawer>
```

### Responding to changes

Any selections made are exposed through the `onSelectionChange` callback.

```javascript
import Fieldset from '../../containers/fieldset/Fieldset';

function SelectionsExample() {
  const [selections, setSelections] = React.useState([]);

  return (
    <>
      <SelectionDrawer
        type="checkbox"
        name="medicare-selections"
        onSelectionChange={setSelections}
      >
        <SelectionDrawer.Item
          header="Medicare coverage 1"
          value="medicareCoverage1"
        >
          Hello and welcome to the other revealed Drawer content! We hope it is
          not nightmarish!
        </SelectionDrawer.Item>
        <SelectionDrawer.Item
          header="Medicare coverage 2"
          value="medicareCoverage2"
        >
          Hello and welcome to the other revealed Drawer content! We hope it is
          not nightmarish!
        </SelectionDrawer.Item>
        <SelectionDrawer.Item
          header="Medicare coverage 3"
          value="medicareCoverage3"
        >
          Hello and welcome to the other revealed Drawer content! We hope it is
          not nightmarish!
        </SelectionDrawer.Item>
        <SelectionDrawer.Item
          header="Medicare coverage 4"
          value="medicareCoverage4"
        >
          Hello and welcome to the other revealed Drawer content! We hope it is
          not nightmarish!
        </SelectionDrawer.Item>
        <SelectionDrawer.Item
          header="Medicare coverage 5"
          value="medicareCoverage5"
        >
          Hello and welcome to the other revealed Drawer content! We hope it is
          not nightmarish!
        </SelectionDrawer.Item>
        <Fieldset legendContent="Selected Items">
          <pre>{JSON.stringify(selections, null, 2)}</pre>
        </Fieldset>
      </SelectionDrawer>
    </>
  );
}

React.createElement(SelectionsExample);
```

### Drawer Layout

You can control the layout using the `inputAlignment` and `labelAlignment` props

#### Input 'left', Label 'right'

```javascript
<SelectionDrawer type="checkbox" inputAlignment="left" labelAlignment="right">
  <SelectionDrawer.Item header="Medicare coverage 1" value="medicareCoverage1">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 2" value="medicareCoverage2">
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
</SelectionDrawer>
```

#### Input 'left', Label 'left'

```javascript
<SelectionDrawer type="checkbox" inputAlignment="left" labelAlignment="left">
  <SelectionDrawer.Item header="Medicare coverage 1" value="medicareCoverage1">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 2" value="medicareCoverage2">
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
</SelectionDrawer>
```

#### Input 'right', Label 'left'

```javascript
<SelectionDrawer type="checkbox" inputAlignment="right" labelAlignment="left">
  <SelectionDrawer.Item header="Medicare coverage 1" value="medicareCoverage1">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 2" value="medicareCoverage2">
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
</SelectionDrawer>
```

#### Input 'right', Label 'right'

```javascript
<SelectionDrawer type="checkbox" inputAlignment="right" labelAlignment="right">
  <SelectionDrawer.Item header="Medicare coverage 1" value="medicareCoverage1">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 2" value="medicareCoverage2">
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
</SelectionDrawer>
```

### Drawer Openability

You can use `openable` to determine independent opening/closing of drawer items

```javascript
<SelectionDrawer type="checkbox" openable>
  <SelectionDrawer.Item header="Medicare coverage 1" value="medicareCoverage1">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 2" value="medicareCoverage2">
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
</SelectionDrawer>
```

### Validation

You can control the layout using the `validationState` prop, or from an outer `Control`

### `validationState` Prop

```javascript
import Button from '../../controls/buttons/Button';
import Fieldset from '../../containers/fieldset/Fieldset';

function ValidationExamples() {
  const [validationType, setValidationType] = React.useState('success');
  const [selections, setSelections] = React.useState(['medicareCoverage1']);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20
        }}
      >
        <Button
          onClick={() => setValidationType('success')}
          styleType="success"
        >
          Success
        </Button>
        <Button
          onClick={() => setValidationType('warning')}
          styleType="warning"
        >
          Warning
        </Button>
        <Button onClick={() => setValidationType('danger')} styleType="danger">
          Danger
        </Button>
        <Button onClick={() => setValidationType('advisor')} styleType="info">
          Advisor
        </Button>
      </div>

      <Fieldset legendContent={`Validation Type: ${validationType}`}>
        <SelectionDrawer
          type="checkbox"
          validationState={validationType}
          selectedItems={selections}
          onSelectionChange={setSelections}
        >
          <SelectionDrawer.Item
            header="Medicare coverage 1"
            value="medicareCoverage1"
          >
            Intently stare at the same spot present belly, scratch hand when
            stroked. Meoooow! Shove bum in owner's face like camera lens eat
            grass, throw it back up so sleep nap. Sit in window and stare ooo, a
            bird!
          </SelectionDrawer.Item>
          <SelectionDrawer.Item
            header="Medicare coverage 2"
            value="medicareCoverage2"
          >
            Hello and welcome to the other revealed Drawer content! We hope it
            is not nightmarish!
          </SelectionDrawer.Item>
        </SelectionDrawer>
      </Fieldset>
    </>
  );
}

React.createElement(ValidationExamples);
```

### Control

```javascript
import Control from '../../controls/Control';
import Button from '../../controls/buttons/Button';
import Fieldset from '../../containers/fieldset/Fieldset';

function ValidationExamples() {
  const [validationType, setValidationType] = React.useState('success');
  const [selections, setSelections] = React.useState(['medicareCoverage1']);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20
        }}
      >
        <Button
          onClick={() => setValidationType('success')}
          styleType="success"
        >
          Success
        </Button>
        <Button
          onClick={() => setValidationType('warning')}
          styleType="warning"
        >
          Warning
        </Button>
        <Button onClick={() => setValidationType('danger')} styleType="danger">
          Danger
        </Button>
        <Button onClick={() => setValidationType('advisor')} styleType="info">
          Advisor
        </Button>
      </div>

      <Control validationState={validationType}>
        <Fieldset legendContent={`Validation Type: ${validationType}`}>
          <SelectionDrawer
            type="checkbox"
            selectedItems={selections}
            onSelectionChange={setSelections}
          >
            <SelectionDrawer.Item
              header="Medicare coverage 1"
              value="medicareCoverage1"
            >
              Intently stare at the same spot present belly, scratch hand when
              stroked. Meoooow! Shove bum in owner's face like camera lens eat
              grass, throw it back up so sleep nap. Sit in window and stare ooo,
              a bird!
            </SelectionDrawer.Item>
            <SelectionDrawer.Item
              header="Medicare coverage 2"
              value="medicareCoverage2"
            >
              Hello and welcome to the other revealed Drawer content! We hope it
              is not nightmarish!
            </SelectionDrawer.Item>
          </SelectionDrawer>
        </Fieldset>
      </Control>
    </>
  );
}

React.createElement(ValidationExamples);
```
