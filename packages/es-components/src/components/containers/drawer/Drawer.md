Use `Drawer` and `Drawer.Panel` components to wrap content in collapsable panels. This component can be used in a controlled or uncontrolled way. When uncontrolled, you can specify `defaultActiveKeys` to set initial state. When controlled, you must supply both `activeKeys` and an `onActiveKeysChanged` handler.

### Basic Example (Uncontrolled)
```
<Drawer defaultActiveKeys={"1"}>
  <Drawer.Panel title="Panel 1">
    <p>Pretty much any content you want in here.</p>
  </Drawer.Panel>
  <Drawer.Panel title="Panel 2">
    <p>More content you want in here.</p>
  </Drawer.Panel>
  <Drawer.Panel title="Panel 3">
    <div>
      More content. Anim pariatur cliche reprehenderit, enim eiusmod
      high life accusamus terry richardson ad squid.
    </div>
  </Drawer.Panel>
</Drawer>
```


### Accordion (Uncontrolled)
Add the `isAccordion` property to change the default behavior to an accordion
style, where only one panel can be opened at a time.
```
<Drawer isAccordion>
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
      More content. Anim pariatur cliche reprehenderit, enim eiusmod
      high life accusamus terry richardson ad squid.
    </div>
  </Drawer.Panel>
</Drawer>
```


### Advanced Example (Controlled)
Use the `noPadding` property to remove default padding within a panel (useful for lists and tables).
Use the `titleAside` property to display text or other content on the right side of the panel header.
You can customize the `key` property of each Panel; if not specified a default key value will be assigned
matching the Panel's numeric position.
Both the Drawer and Drawer.Panel components will accept additional classNames.
```
class DrawerExample extends React.Component {
  constructor() {
    this.state = { activeKeys: ["second","3"] };
    this.onActiveKeysChanged = this.onActiveKeysChanged.bind(this);
  }

  onActiveKeysChanged(value) {
    this.setState({ activeKeys: value });
  };

  render() {
    return (
      <Drawer activeKeys={this.state.activeKeys} onActiveKeysChanged={this.onActiveKeysChanged} closedIconName="hand-right" openedIconName="hand-down" className="drawer-big">
        <Drawer.Panel title="Panel One" key="first" noPadding titleAside={<em>aside text</em>}>
          <p>The default padding has been removed from this panel.</p>
        </Drawer.Panel>
        <Drawer.Panel title="Panel Two" key="second" noPadding titleAside={<Icon name='tag' />}>
          <ul>
            <li>List Item</li>
            <li>Another Item</li>
          </ul>
        </Drawer.Panel>
        <Drawer.Panel title="Panel Three" className="alt-color">
          <div>
            More content. Anim pariatur cliche reprehenderit, enim eiusmod
            high life accusamus terry richardson ad squid.
          </div>
        </Drawer.Panel>
      </Drawer>
    )
  }
}
<DrawerExample />
```
