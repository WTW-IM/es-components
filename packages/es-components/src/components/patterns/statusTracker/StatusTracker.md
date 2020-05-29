The `StatusTracker` component is used to display success or failure along a given set of steps.

### Basic Example

```
const planStates = ['First step', 'Second step', 'Third step', 'Fourth step'];

<StatusTracker statusArray={planStates} step={3} />
```

The `isErrorState` prop will display the current step with an error status, showing that progress
can no longer continue.

```
const planStates = ['First step', 'Second step', 'Third step', 'Fourth step'];

<StatusTracker statusArray={planStates} step={3} isErrorState={true} />
```

#### UX Guidance:
If there’s an action available in a given point in the process for which the status is being tracked, that information should be presented in a popover, with a link — if applicable — that takes the user to the place where they can either get more information or take action to support the resolution of the issue, if not resolve it through such action.

```
import Icon from '../../base/icons/Icon';
import Anchor from '../../navigation/Anchor';
import Popover from '../../containers/popover/Popover';
import PopoverLink from '../../controls/buttons/PopoverLink';

const planStates = [
  <span><Anchor href="javascript:void(0)">A Simple Link</Anchor></span>,
  <span>
    <Icon name="cog" size={22} style={{fontWeight:'normal'}} />
    <Popover
      name="notification-popover"
      title="Detailed Instructions"
      content={<span>More content found <Anchor href="javascript:void(0)">here</Anchor></span>}
      placement="top"
      renderTrigger={({ ref, toggleShow, isOpen }) => (
        <PopoverLink onClick={toggleShow} aria-expanded={isOpen} ref={ref}>
          Second Step Popover
        </PopoverLink>
      )}
    />
  </span>,
  <span><Icon name="bell" size={22} /> Third Step</span>
];

<StatusTracker statusArray={planStates} step={2} />
```
