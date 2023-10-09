### Drawer Layout

You can individually set `inputAlignment` and `labelAlignment` for each Item.

```javascript
import SelectionDrawer from './SelectionDrawer';

<SelectionDrawer type="radio" name="medicare-coverage">
  <SelectionDrawer.Item
    header="Medicare coverage 1"
    value="medicareCoverage1"
    labelAlignment="right"
  >
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item
    header="Medicare coverage 2"
    value="medicareCoverage2"
    inputAlignment="left"
  >
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
  <SelectionDrawer.Item header="Medicare coverage 3" value="medicareCoverage3">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
</SelectionDrawer>;
```

### Validation

You can individually set `validationState` for each Item.

```javascript
import SelectionDrawer from './SelectionDrawer';

<SelectionDrawer type="radio" name="medicare-coverage">
  <SelectionDrawer.Item
    header="Medicare coverage 1"
    value="medicareCoverage1"
    validationState="success"
  >
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item
    header="Medicare coverage 2"
    value="medicareCoverage2"
    validationState="danger"
  >
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
  <SelectionDrawer.Item header="Medicare coverage 3" value="medicareCoverage3">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
</SelectionDrawer>;
```

### Opening

#### Openability

You can individually set `openable` for each Item.

```javascript
import SelectionDrawer from './SelectionDrawer';

<SelectionDrawer type="radio" name="medicare-coverage">
  <SelectionDrawer.Item
    header="Medicare coverage 1"
    value="medicareCoverage1"
    openable
  >
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
  <SelectionDrawer.Item
    header="Medicare coverage 3"
    value="medicareCoverage3"
    openable
  >
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
</SelectionDrawer>;
```

#### Forcing Open/Close

You can force an item to be open or closed using `forceOpen` and `forceClose`. These props override
any other open state.

```javascript
import SelectionDrawer from './SelectionDrawer';

<SelectionDrawer type="radio" name="medicare-coverage">
  <SelectionDrawer.Item
    header="Medicare coverage 1"
    value="medicareCoverage1"
    forceOpen
  >
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item
    header="Medicare coverage 2"
    value="medicareCoverage2"
    forceClose
  >
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
  <SelectionDrawer.Item header="Medicare coverage 3" value="medicareCoverage3">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
</SelectionDrawer>;
```

### Disabling

You can individually set `disabled` for each Item.

```javascript
import SelectionDrawer from './SelectionDrawer';

<SelectionDrawer type="radio" name="medicare-coverage">
  <SelectionDrawer.Item header="Medicare coverage 1" value="medicareCoverage1">
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item
    header="Medicare coverage 2"
    value="medicareCoverage2"
    disabled
  >
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
  <SelectionDrawer.Item header="Medicare coverage 3" value="medicareCoverage3">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
</SelectionDrawer>;
```

### Interaction with `SelectionDrawer`

Properties set on individual Items override the props from the parent Drawer.

```javascript
import SelectionDrawer from './SelectionDrawer';

<SelectionDrawer
  type="radio"
  name="medicare-coverage"
  openable={true}
  inputAlignment="left"
>
  <SelectionDrawer.Item
    header="Medicare coverage 1"
    value="medicareCoverage1"
    inputAlignment="right"
  >
    Hello and welcome to the other revealed Drawer content! We hope it is not
    nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item
    header="Medicare coverage 2"
    value="medicareCoverage2"
    openable={false}
  >
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
  <SelectionDrawer.Item header="Medicare coverage 3" value="medicareCoverage3">
    Intently stare at the same spot present belly, scratch hand when stroked.
    Meoooow! Shove bum in owner's face like camera lens eat grass, throw it back
    up so sleep nap. Sit in window and stare ooo, a bird!
  </SelectionDrawer.Item>
</SelectionDrawer>;
```
