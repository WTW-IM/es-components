Use ``Drawer`` and ``DrawerPanel`` components to wrap content in collapsable panels.

### Basic Example:
```
<Drawer>
  <DrawerPanel header="Panel 1">
    <p>Pretty much any content you want in here.</p>
  </DrawerPanel>
  <DrawerPanel header="Panel 2">
    <ul>
      <li>List Item</li>
      <li>Another Item</li>
    </ul>
  </DrawerPanel>
  <DrawerPanel header="Panel 3">
    <div>
      More content. Anim pariatur cliche reprehenderit, enim eiusmod
      high life accusamus terry richardson ad squid.
    </div>
  </DrawerPanel>
</Drawer>
```

### Advanced Example:
```
<Drawer isAccordion defaultActiveKeys="1" closedIconName="hand-right" openedIconName="hand-down" className="drawer-big">
  <DrawerPanel header="Panel 1" key="1">
    <p>Pretty much any content you want in here.</p>
  </DrawerPanel>
  <DrawerPanel header="Panel 2" key="2" noPadding>
    <ul>
      <li>List Item</li>
      <li>Another Item</li>
    </ul>
  </DrawerPanel>
  <DrawerPanel header="Panel 3" key="3" className="alt-color">
    <div>
      More content. Anim pariatur cliche reprehenderit, enim eiusmod
      high life accusamus terry richardson ad squid.
    </div>
  </DrawerPanel>
</Drawer>
```
