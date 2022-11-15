A `Banner` is static a container that will render any children passed to it. It allows customizing the background color and text color.

```jsx
import Heading from '../heading/Heading';
import Anchor from '../../navigation/Anchor';
import Action from '../../patterns/callToAction/Action';

<div>
  <Banner bgColor="#FF7377" textColor="white">
    <p>
      <Anchor href="#">This anchor</Anchor> has the parent font color.
    </p>
  </Banner>
  <Banner bgColor="#d3d3d3">
    <p>
      <Anchor href="#">This anchor</Anchor> has the default font color.
    </p>
  </Banner>
  <Banner bgColor="#00a0d2" textColor="white">
    <div style={{ flexBasis: '100%' }}>
      <h3 style={{ marginTop: '0' }}>This is a banner!</h3>
      <div>
        Children are rendered in a flex container and{' '}
        <a href="#notification">links</a> render with parent font color
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
  </Banner>
</div>;
```
