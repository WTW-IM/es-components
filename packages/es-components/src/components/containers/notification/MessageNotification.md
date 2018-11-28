A `MessageNotification` component renders the same as a `Notification` would without a background.

```
<div>
  <MessageNotification
    type="success"
  >
    <p>This is a successful notification!</p>
  </MessageNotification>

  <MessageNotification
    type="info"
  >
    <p>This is an informational notification!</p>
  </MessageNotification>

  <MessageNotification
    type="warning"
    
  >
    <p>This is a warning notification!</p>
  </MessageNotification>

  <MessageNotification
    type="danger"
  >
    <p>This is a danger notification!</p>
  </MessageNotification>
</div>
```