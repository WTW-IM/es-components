Use ``Drawer`` and ``DrawerPanel`` components to wrap content in collapsable panels.

### Basic Example:
```
<Drawer>
  <DrawerPanel header="Collapsable Item 1">
    <p>Pretty much any content you want in here.</p>
  </DrawerPanel>
  <DrawerPanel header="Collapsable Item 2">
    <ul>
      <li>List Item</li>
      <li>Another Item</li>
    </ul>
  </DrawerPanel>
  <DrawerPanel header="Collapsable Item 3">
    <div>
      More content. Anim pariatur cliche reprehenderit, enim eiusmod
      high life accusamus terry richardson ad squid.
    </div>
  </DrawerPanel>
</Drawer>
```

### Drawer Options

Option            | Type                   | Description
----------------- | ---------------------- | ---------------------------------------------------------
isAccordion       | boolean                | Only allows one DrawerPanel to be open at a time
defaultActiveKeys | string or string array | Specify which panels are opened by default
closedIconName    | string                 | Override the default plus icon with another OE icon name
openedIconName    | string                 | Override the default minus icon with another OE icon name
className         | string or object       | Add additional CSS classes to the root drawer element

### DrawerPanel Options

Option    | Type             | Description
--------- | ---------------- | ---------------------------------------------------------------
header    | string           | Header text displayed next to the open/close icon
key       | string           | Manually set the key value for the panel (otherwise uses index)
className | string or object | Add additional CSS classes to the drawer item element
noPadding | boolean          | Removes the default padding from the panel body


### Advanced Example:
```
<Drawer isAccordion defaultActiveKeys="1" closedIconName="hand-right" openedIconName="hand-down" className="drawer-big">
  <DrawerPanel header="Collapsable Item 1" key="1">
    <p>Pretty much any content you want in here.</p>
  </DrawerPanel>
  <DrawerPanel header="Collapsable Item 2" key="2" className="alt-color">
    <ul>
      <li>List Item</li>
      <li>Another Item</li>
    </ul>
  </DrawerPanel>
  <DrawerPanel header="Collapsable Item 3" key="3" noPadding>
    <div>
      More content. Anim pariatur cliche reprehenderit, enim eiusmod
      high life accusamus terry richardson ad squid.
    </div>
  </DrawerPanel>
</Drawer>
```
