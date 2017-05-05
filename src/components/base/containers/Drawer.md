Use ``Drawer`` and ``Drawer.Panel`` components to wrap content in collapsable panels.

### Basic Example:
```
<Drawer>
  <Drawer.Panel title="Panel 1">
    <p>Pretty much any content you want in here.</p>
  </Drawer.Panel>
  <Drawer.Panel title="Panel 2">
    <ul>
      <li>List Item</li>
      <li>Another Item</li>
    </ul>
  </Drawer.Panel>
  <Drawer.Panel title="Panel 3">
    <div>
      More content. Anim pariatur cliche reprehenderit, enim eiusmod
      high life accusamus terry richardson ad squid.
    </div>
  </Drawer.Panel>
</Drawer>
```

### Advanced Example:

Use the ``noPadding`` property to remove default padding within a panel (useful for lists and tables).
You can customize the key property of each Panel; if not specified the default is a zero-based array.
Both the Drawer and Drawer.Panel components will accept additional classNames.

```
<Drawer isAccordion defaultActiveKeys="1" closedIconName="hand-right" openedIconName="hand-down" className="drawer-big">
  <Drawer.Panel title="Panel 1" key="1">
    <p>Pretty much any content you want in here.</p>
  </Drawer.Panel>
  <Drawer.Panel title="Panel 2" key="2" noPadding>
    <ul>
      <li>List Item</li>
      <li>Another Item</li>
    </ul>
  </Drawer.Panel>
  <Drawer.Panel title="Panel 3" key="3" className="alt-color">
    <div>
      More content. Anim pariatur cliche reprehenderit, enim eiusmod
      high life accusamus terry richardson ad squid.
    </div>
  </Drawer.Panel>
</Drawer>
```
