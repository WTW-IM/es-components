A `Banner` is static a container that will render any children passed to it. It comes in five different types.

```jsx
import Heading from '../heading/Heading';
import Anchor from '../../navigation/Anchor';
import Action from '../../patterns/callToAction/Action';

<div>
  <ForwardedBanner type="success">
    <p>
      <b>Success</b> This is a successful notification!
    </p>
  </ForwardedBanner>
  <ForwardedBanner type="info">
    <p>
      <Anchor href="#banner">This anchor</Anchor> has the info background color.
    </p>
  </ForwardedBanner>
  <ForwardedBanner type="advisor">
    <div style={{ flexBasis: '100%' }}>
      <h3 style={{ marginTop: '0' }}>This is a banner!</h3>
      <div>
        Children are rendered in a flex container and{' '}
        <a href="#banner">links</a> render with underlined text
      </div>
      <h4>Any element can be rendered!</h4>
      <ul>
        <li>Item A</li>
        <li>Item B</li>
        <li>Item C</li>
      </ul>
      <Action isPrimary>First</Action>
      <Action>Second</Action>
      <Action>Third</Action>
    </div>
  </ForwardedBanner>
</div>;
```
