### Notification Types

```
<div>
  <Notification
    type="success"
    header="Success!"
    additionalText="You did a thing."
  />

  <Notification
    type="info"
    header="Information!"
    additionalText="Here's some information you need to know."
  />

  <Notification
    type="warning"
    additionalText="Here's a warning."
  />

  <Notification
    type="danger"
    header="Danger!"
    additionalText="You're about to do something dangerous!"
  />

  <Notification
    type="advisor"
    header="Advisor!"
    additionalText="This message is for benefit advisors."
  />
</div>
```

Adding the `dismissable` prop will render a dismiss button that will execute the provided `onDismiss` function.
```
<Notification
  type="success"
  additionalText="I have a dismiss button. Click it!"
  dismissable
  onDismiss={() => alert('Why so dismissive?')}
/>
```

Adding the `includeIcon` prop will render an appropriate icon for the alert type. <em>If the viewport is less than 768px, it will not render any icons in the notification.</em>
```
<Notification
  type="advisor"
  additionalText="Please read"
  includeIcon
/>
```

Providing `callsToAction` will render a button for each which executes that action. The first button will receive the `primary` style type and any additional button will receive the `default` style type.
```
class CustomButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: 'Secondary',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.isProcessing) return;

    this.setState({ content: 'Processing', isProcessing: true });

    setTimeout(() => this.setState({ content: 'Secondary', isProcessing: false }), 3000);
  }

  render() {
    const { isProcessing, content } = this.state;
    return (
      <Button
        handleOnClick={this.handleClick}
        disabled={isProcessing}
      >
        {content}
      </Button>
    );
  }
}

const callsToAction = [
      {
        actionButtonContent: 'Primary',
        action() {
          confirm('You clicked a button!');
        }
      },
      <CustomButton />,
      {
        actionButtonContent: 'Tertiary',
        action() {
          alert('You clicked the tertiary button')
        }
      }
    ];
<Notification
  type="warning"
  header="Action is required"
  additionalText="Please click one of the buttons"
  callsToAction={callsToAction}
/>
```

Providing `extraAlert` with an object will render the selected icon and the provided text in the upper-right corner of the notification. If no icon is chosen, the `federal` icon will be used by default.
```
const extraAlert = {
  alertText: 'I\'m an extra little alert!',
  alertIcon: 'bell'
 };

<Notification
  type="success"
  additionalText="Look at the extra alert!"
  extraAlert={extraAlert}
/>
```

Any additional children will get rendered before call to action buttons.
```
<Notification
  type="info"
  additionalText="Here's some information to get you started"
>
  This is <a href="#">how a link looks</a>.
  <ol>
    <li>Item A</li>
    <li>Item B</li>
    <li>Item C</li>
  </ol>
</Notification>
```

### Color Variants

Applying the `useLightVariant` prop will use a lighter background color for the given notification type.

```
const callsToAction = [
      {
        actionButtonContent: 'Primary',
        action() {
          confirm('You clicked a button!');
        }
      },
      {
        actionButtonContent: 'Secondary',
        action() {
          alert('You clicked the secondary button')
        }
      }
    ];

<div>
  <Notification
    type="success"
    header="Success!"
    additionalText="You did a thing."
    useLightVariant
    callsToAction={callsToAction}
  />

  <Notification
    type="info"
    header="Information!"
    additionalText="Here's some information you need to know."
    useLightVariant
  />

  <Notification
    type="warning"
    additionalText="Here's a warning."
    useLightVariant
  />

  <Notification
    type="danger"
    header="Danger!"
    additionalText="You're about to do something dangerous!"
    useLightVariant
  />

  <Notification
    type="advisor"
    header="Advisor!"
    additionalText="This message is for benefit advisors."
    useLightVariant
  />
</div>
```

The `useMessageOnlyVariant` prop can be applied to display the message in the appropriate text color without applying a background color.

```
<div>
  <Notification
    type="success"
    header="Success!"
    additionalText="You did a thing."
    useMessageOnlyVariant
  />

  <Notification
    type="info"
    header="Information!"
    additionalText="Here's some information you need to know."
    useMessageOnlyVariant
  />

  <Notification
    type="warning"
    additionalText="Here's a warning."
    useMessageOnlyVariant
  />

  <Notification
    type="danger"
    header="Danger!"
    additionalText="You're about to do something dangerous!"
    useMessageOnlyVariant
  />

  <Notification
    type="advisor"
    header="Advisor!"
    additionalText="This message is for benefit advisors."
    useMessageOnlyVariant
  />
</div>
```

If `useLightVariant` and `useMessageOnlyVariant` are both present `useMessageOnlyVariant` will take precedence.
