### Input Behavior

You can set the input type to "radio", which will cause the drawers to act as radio buttons and
using accordion-like behavior for the drawer open states. The `SelectionDrawer` will take all of the
`RadioGroup` props in this instance.

```javascript
import SelectionDrawer from './SelectionDrawer';

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
</SelectionDrawer>;
```
