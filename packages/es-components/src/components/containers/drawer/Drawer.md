Use `Drawer` and `Drawer.Panel` components to wrap content in collapsable panels.

### Basic Example

```javascript
class DrawerExample extends React.Component {
  constructor() {
    this.state = { activeKeys: ['1'] };
    this.onActiveKeysChanged = this.onActiveKeysChanged.bind(this);
  }

  onActiveKeysChanged(value) {
    this.setState({ activeKeys: value });
  }

  render() {
    return (
      <Drawer
        activeKeys={this.state.activeKeys}
        onActiveKeysChanged={this.onActiveKeysChanged}
      >
        <Drawer.Panel title="Panel 1">
          <p>Pretty much any content you want in here.</p>
        </Drawer.Panel>
        <Drawer.Panel title="Panel 2">
          <p>More content you want in here.</p>
        </Drawer.Panel>
        <Drawer.Panel title="Panel 3">
          <div>
            More content. Anim pariatur cliche reprehenderit, enim eiusmod high
            life accusamus terry richardson ad squid.
          </div>
        </Drawer.Panel>
      </Drawer>
    );
  }
}

<DrawerExample />;
```

### Accordion

Add the `isAccordion` property to change the behavior to an accordion
style, where only one panel can be opened at a time.

```javascript
class DrawerExample extends React.Component {
  constructor() {
    this.state = { activeKeys: ['1'] };
    this.onActiveKeysChanged = this.onActiveKeysChanged.bind(this);
  }

  onActiveKeysChanged(value) {
    this.setState({ activeKeys: value });
  }

  render() {
    return (
      <Drawer
        activeKeys={this.state.activeKeys}
        onActiveKeysChanged={this.onActiveKeysChanged}
        isAccordion
      >
        <Drawer.Panel title="Accordion Panel 1">
          <p>Pretty much any content you want in here.</p>
        </Drawer.Panel>
        <Drawer.Panel title="Accordion Panel 2" noPadding>
          <ul>
            <li>List Item</li>
            <li>Another Item</li>
          </ul>
        </Drawer.Panel>
        <Drawer.Panel title="Accordion Panel 3">
          <div>
            More content. Anim pariatur cliche reprehenderit, enim eiusmod high
            life accusamus terry richardson ad squid.
          </div>
        </Drawer.Panel>
      </Drawer>
    );
  }
}

<DrawerExample />;
```

### Other Props

Use the `noPadding` property to remove default padding within a panel (useful for lists and tables).
Use the `titleAside` property to display text or other content on the right side of the panel header.
Use the `headingLevel` property to change default level of heading.
You can customize the `key` property of each Panel; if not specified a default key value will be assigned matching the Panel's numeric position.

```javascript
import Icon from '../../base/icons/Icon';

class DrawerExample extends React.Component {
  constructor() {
    this.state = { activeKeys: ['second', '3'] };
    this.onActiveKeysChanged = this.onActiveKeysChanged.bind(this);
  }

  onActiveKeysChanged(value) {
    this.setState({ activeKeys: value });
  }

  render() {
    return (
      <Drawer
        activeKeys={this.state.activeKeys}
        onActiveKeysChanged={this.onActiveKeysChanged}
        closedIconName="hand-right"
        openedIconName="hand-down"
        className="drawer-big"
      >
        <Drawer.Panel
          title="Panel One"
          key="first"
          noPadding
          titleAside={<em>aside text</em>}
        >
          <p>The default padding has been removed from this panel.</p>
        </Drawer.Panel>
        <Drawer.Panel
          title="Panel Two"
          key="second"
          noPadding
          titleAside={<Icon name="tag" />}
        >
          <ul>
            <li>List Item</li>
            <li>Another Item</li>
          </ul>
        </Drawer.Panel>
        <Drawer.Panel
          title="Panel Three"
          className="alt-color"
          headingLevel={3}
        >
          <div>
            More content. Anim pariatur cliche reprehenderit, enim eiusmod high
            life accusamus terry richardson ad squid.
          </div>
        </Drawer.Panel>
      </Drawer>
    );
  }
}

<DrawerExample />;
```

### Free-Form Drawers

#### **Drawer.Item**

Drawers have a few sub-components that make it so you can build drawers in any
configuration you need. The primary requirement for this setup is that
everything is contained within `Drawer.Item`. You can manually set a drawer item
to be open or closed using the `open` prop.

> | ⚠️WARNING! | The `activeKeys` prop does not work with Free-Form Drawers! It only works with Drawer.Panel drawers. Use the `open` prop instead. |
> | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |

#### **Drawer.ItemOpener**

`Drawer.ItemOpener` is the sub-component that allows you to designate which part
of your markup should open the Drawer. **It should have a single root node as a child.**
You can treat the inside content like any other React elements, including giving
it an `onClick` prop.

#### **Drawer.ItemBody**

`Drawer.ItemBody` is the sub-component that designates what is to be hidden. (If
you're separating these values, remember to set `aria-labelledby` on
`Drawer.ItemBody` to the ID of the element inside your `Drawer.ItemOpener`)

#### **useDrawerItemContext**

Within `Drawer.Item`, you can use `useDrawerItemContext` to react when the
drawer is opened and closed.

```javascript
import { useDrawerItemContext } from './Drawer.js';
const DrawerTracker = () => {
  const { open } = useDrawerItemContext();

  return <p>Drawer is {open ? 'open' : 'closed'}!</p>;
};

const buttonOptions = ['hello', 'world', 'one', 'more', 'time'];
const FreeformExample = () => {
  const [currentValue, setCurrentValue] = React.useState(0);
  const [backwardsValue, setBackwardsValue] = React.useState(0);
  const [drawerOneOpen, setDrawerOneOpen] = React.useState(false);
  const [drawerTwoOpen, setDrawerTwoOpen] = React.useState(true);
  const onButtonClick = () => {
    let newValue = currentValue + 1;
    if (newValue >= buttonOptions.length) {
      newValue = 0;
    }
    setDrawerOneOpen((oldOpen) => {
      const newOpen = !oldOpen;
      setDrawerTwoOpen(newOpen);
      return newOpen;
    });

    setCurrentValue(newValue);
  };

  const backwardsButtonClick = () => {
    let newValue = backwardsValue - 1;
    if (newValue < 0) {
      newValue = buttonOptions.length - 1;
    }
    setDrawerTwoOpen((oldOpen) => !oldOpen);
    setBackwardsValue(newValue);
  };

  return (
    <Drawer useDefaultStyles={false}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .drawer-table, .drawer-table td {
          border: 1px solid gray;
          padding: 8px;
        }
      `,
        }}
      ></style>
      <h2>This is a drawer!</h2>
      <Drawer.Item>
        <h3>This is a single Drawer Item!</h3>
        <table className="drawer-table">
          <tbody>
            <tr>
              <td>A dynamic value: {buttonOptions[currentValue]}</td>
              <td>
                <Drawer.ItemOpener>
                  <button
                    type="button"
                    id="first-opener"
                    onClick={onButtonClick}
                  >
                    Click here to open and close both drawers!
                  </button>
                </Drawer.ItemOpener>
              </td>
            </tr>
            <tr>
              <td>
                <p>Click the button to reveal some hidden content below!</p>
                <Drawer.ItemBody
                  aria-labelledby="first-opener"
                  style={{
                    boxSizing: 'border-box',
                  }}
                >
                  <p>Hello and welcome to the revealed Drawer content!</p>
                  <p>We hope it is everything you dreamed of and more!</p>
                  <Drawer isAccordion>
                    <h4>Hello! I'm another drawer! I'm an accordion!</h4>
                    <div>
                      <Drawer.Item>
                        <Drawer.ItemOpener>
                          <p style={{ color: 'blue' }}>Click me to see more!</p>
                        </Drawer.ItemOpener>
                        <Drawer.ItemBody>
                          <p>Hello! I'm more!</p>
                        </Drawer.ItemBody>
                      </Drawer.Item>
                    </div>
                    <div>
                      <Drawer.Item>
                        <Drawer.ItemOpener>
                          <p style={{ color: 'blue' }}>
                            Click me to see something else!
                          </p>
                        </Drawer.ItemOpener>
                        <Drawer.ItemBody>
                          <p>Hello! I'm sure something else!</p>
                        </Drawer.ItemBody>
                      </Drawer.Item>
                    </div>
                  </Drawer>
                </Drawer.ItemBody>
              </td>
              <td>
                <DrawerTracker />
              </td>
            </tr>
          </tbody>
        </table>
      </Drawer.Item>
      <Drawer.Item open={drawerTwoOpen}>
        <h3>This is another Drawer Item!</h3>
        <table className="drawer-table">
          <tbody>
            <tr>
              <td>
                <Drawer.ItemOpener>
                  <button
                    type="button"
                    id="second-opener"
                    onClick={backwardsButtonClick}
                  >
                    Click here to open and close the drawer!
                  </button>
                </Drawer.ItemOpener>
              </td>
              <td>
                A backwards dynamic value:
                {buttonOptions[backwardsValue].split('').reverse().join('')}
              </td>
            </tr>
            <tr>
              <td>
                <DrawerTracker />
              </td>
              <td>
                <p>
                  Click the button to reveal some more hidden content below!
                </p>
                <Drawer.ItemBody
                  aria-labelledby="second-opener"
                  style={{
                    boxSizing: 'border-box',
                  }}
                >
                  <p>Hello and welcome to the other revealed Drawer content!</p>
                  <p>We hope it is not nightmarish!</p>
                </Drawer.ItemBody>
              </td>
            </tr>
          </tbody>
        </table>
      </Drawer.Item>
    </Drawer>
  );
};

<FreeformExample />;
```
