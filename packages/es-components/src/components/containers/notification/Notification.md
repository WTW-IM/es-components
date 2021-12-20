Notifications are static containers that will render any children passed to it. They come in three different variations.

There are two additional components `InlineMessage` and `Message` that can be used to display text in a `Notification`.

<a href="https://8lf1uv.axshare.com/#id=ipjuln&p=inline_error_notification&dp=0&g=1" target="blank"><div style="color:#cc0000;text-transform:uppercase;margin:1em 0;">View Error Pattern Examples</div></a>

```jsx
import { Message, InlineMessage } from './Message';
import Popover from '../popover/Popover';
import PopoverLink from '../../controls/buttons/PopoverLink';

<div>
  <Notification type="success">
    <Message
      emphasizedText="Success"
      text="This is a successful notification!"
    />
  </Notification>

  <Notification type="info">
    <InlineMessage
      emphasizedText="Info"
      text="This is an inline informational notification!"
    />
  </Notification>

  <Notification type="warning">
    <Message text="This is a warning notification!" />
  </Notification>

  <Notification type="danger">
    <InlineMessage text="This is a danger notification!" />
  </Notification>

  <Notification type="advisor">
    <div style={{ flexBasis: '100%' }}>
      <h3 style={{ marginTop: '0' }}>This is an advisor alert!</h3>
      <div>
        Children are rendered in a flex container and{' '}
        <a href="#notification">links</a> render with underlined text, but
        <Popover
          name="notification-popover"
          title="Advisor Popover"
          content="Some content that is helpful to advisors!"
          placement="top"
          renderTrigger={({ ref, toggleShow, isOpen }) => (
            <PopoverLink onClick={toggleShow} aria-expanded={isOpen} ref={ref}>
              popovers
            </PopoverLink>
          )}
        /> get dashed underlined text.
      </div>
      <h4>Any element can be rendered!</h4>
      <ul>
        <li>Item A</li>
        <li>Item B</li>
        <li>Item C</li>
      </ul>
    </div>
  </Notification>
</div>;
```

Setting the `includeIcon` prop to `true` will render the icon associated with the `type` prop.

If the screen size is less than `768px`, it will not be displayed.

```jsx
<Notification type="success" includeIcon>
  <span>Congrats! You did it!</span>
</Notification>
```

Alternatively, you can set the `alwaysShowIcon` prop to true and it will render the icon that will show all all screen resolutions.

```jsx
<Notification type="success" includeIcon alwaysShowIcon>
  <span>Congrats! You did it!</span>
</Notification>
```

Setting the `isDismissable` prop to `true` will add a button to remove the `Notification`. If an `onDismiss` prop is passed, it will be invoked when the `Notification` is removed.

```jsx
function NotificationApp() {
  const [message, setMessage] = React.useState(
    'This message is displayed until notification is removed'
  );

  function notificationDismissed() {
    setMessage('Notification was removed!');
  }

  return (
    <>
      <Notification
        type="success"
        isDismissable
        onDismiss={notificationDismissed}
      >
        <span>Try dismissing this notification!</span>
      </Notification>
      <p>{message}</p>
    </>
  );
}

<NotificationApp />;
```

By default, Anchor tags will receive some new styling within a Notification:

```jsx
import Anchor from '../../navigation/Anchor';
<Notification type="warning">
  <p>
    <Anchor href="#">This anchor</Anchor> has overwritten anchor styles.
  </p>
</Notification>;
```

You can disable these overwritten styles setting the `restyleAnchors` prop to `false`;

```jsx
import Anchor from '../../navigation/Anchor';
<Notification type="warning" restyleAnchors={false}>
  <p>
    <Anchor href="#">This anchor</Anchor> has the regular styling.
  </p>
</Notification>;
```
