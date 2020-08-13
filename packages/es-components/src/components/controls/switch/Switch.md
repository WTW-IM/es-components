A `Switch` component works exactly like a native checkbox input tag with style attached. It supports any HTML attributes that a native checkbox input tag supports.

```
import Switch from '../switch/Switch';

<>
    <Switch label='Current Generation Switch Option' />
    <Switch label='Current Generation Switch Option; Checked' checked />
    <Switch label='Current Generation Switch Option; Disabled' disabled />
</>
```

If your use-case/context requires, Switches can be configured to have their labels on either of the four cardinal sides—Right, Top, Bottom, or Left.
```
import Switch from '../switch/Switch';

const sectionStyle = {
    alignItems: "center",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-evenly",
    margin: "0 0 1rem"
};

<div style={sectionStyle}>
    <Switch type='primary' label='Right' direction='right' />
    <Switch type='primary' label='Top' direction='top' />
    <Switch type='primary' label='Bottom' direction='bottom' />
    <Switch type='primary' label='Left' direction='left' />
</div>
```

Since display: flex; is used to present a number of UI configurations without modifying the markup, you might find yourself in need to make more space if your label text is longer. Add a display of 'block', or combine with direction of 'left' to replicate a "mobile settings" feel to your control.
```
import Switch from '../switch/Switch';

const blockDisplay = {
    display: "block"
};

<div>
    <Switch style={blockDisplay} label='Block Display' />
    <Switch style={blockDisplay} label='Block Display; Label-Left' direction='left' />
</div>
```

As they are form controls, Switches must be able to convey semantic feedback (validation).
```
import Switch from '../switch/Switch';
import MessageNotification from '../../containers/notification/MessageNotification';

<div>
    <Switch label='Success' type='success' />
    <MessageNotification includeIcon type='success'>Nice job, hitting this switch!</MessageNotification>
    <Switch label='Warning' type='warning' />
    <MessageNotification includeIcon type='warning'>Heads up! You need to hit this switch before you continue.</MessageNotification>
    <Switch label='Error' type='danger' />
    <MessageNotification includeIcon type='danger'>Think carefully before hitting this switch!</MessageNotification>
</div>
```

The switch can have configured on and off text states for what either side of the button represents.
```
import Switch from '../switch/Switch';

<div>
    <Switch offText='Off' onText='On' />
    <Switch offText='Off' onText='On' label='This one has a label too' />
    <Switch offText='Off' onText='On' label='This one has a label, but on the left' direction='left' />
    <Switch offText='Left' onText='Right' label='This one had different on and off labels' />
    <Switch onText='Right' label='This one only has a right label' />
    <Switch offText='Left' label='This one only has a left label' />
</div>
```

The switch supports the `aria-label` html attribute with the `ariaLabel` property. The content will be read aloud by a screen reader.
```
import Switch from '../switch/Switch';

<div>
    <Switch ariaLabel='This content will be read aloud' label='Screen read label' />
</div>
```