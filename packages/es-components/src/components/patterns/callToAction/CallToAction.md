This component combines the `Notification` and a set of `Action` components. This component takes all the same props as [Notification](#notification). It will replace any passed `isDismissable` prop and set it to `false`.

```jsx
import Action from './Action';

function firstAction() {
  console.log('first action fired');
}

function secondAction() {
  console.log('second action fired');
}

function thirdAction() {
  console.log('third action fired');
}

<CallToAction type="danger">
  <p>What what what!</p>
  <Action onClick={thirdAction}>Third</Action>
  <Action onClick={secondAction}>Second</Action>
  <Action onClick={firstAction} isPrimary>
    First
  </Action>
</CallToAction>;
```
