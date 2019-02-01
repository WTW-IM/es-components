Notifications are static containers that will render any children passed to it. They come in three different variations.

There are two additional components `InlineMessage` and `Message` that can be used to display text in a `Notification`.

```jsx
const Message = require('./Message').Message;
const InlineMessage = require('./Message').InlineMessage;

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
      <h3>This is an advisor alert!</h3>
      <div>
        Children are rendered in a flex container and{' '}
        <a href="#notification">links</a> render with underlined text, but
        <Popover
          name="notification-popover"
          title="Advisor Popover"
          content="Some content that is helpful to advisors!"
          placement="top"
          renderTrigger={({ ref, toggleShow, isOpen }) => (
            <PopoverLink
              onClick={toggleShow}
              aria-expanded={isOpen}
              ref={ref}
              styleType="primary"
            >
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
  <p>Congrats! You did it!</p>
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
        <p>Try dismissing this notification!</p>
      </Notification>
      <p>{message}</p>
    </>
  );
}

<NotificationApp />;
```
