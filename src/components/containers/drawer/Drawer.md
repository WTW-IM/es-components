Use ``Drawer`` and ``Drawer.Panel`` components to wrap content in collapsable panels.

### Basic Example
```
<Drawer>
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


### Accordion
Add the ``isAccordion`` property to change the default behavior to an accordion
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


### Advanced Example
Use the ``noPadding`` property to remove default padding within a panel (useful for lists and tables).
Use the ``titleAside`` property to display text or other content on the right side of the panel header.
You can customize the ``key`` property of each Panel; if not specified the default is a zero-based array.
Both the Drawer and Drawer.Panel components will accept additional classNames.

```
<Drawer defaultActiveKeys={["first", "third"]} closedIconName="hand-right" openedIconName="hand-down" className="drawer-big">
  <Drawer.Panel title="Panel 1" key="first" noPadding titleAside={<em>aside text</em>}>
    <p>The default padding has been removed from this panel.</p>
  </Drawer.Panel>
  <Drawer.Panel title="Panel 2" key="second" noPadding titleAside={<Icon name='tag' />}>
    <ul>
      <li>List Item</li>
      <li>Another Item</li>
    </ul>
  </Drawer.Panel>
  <Drawer.Panel title="Panel 3" key="third" className="alt-color">
    <div>
      More content. Anim pariatur cliche reprehenderit, enim eiusmod
      high life accusamus terry richardson ad squid.
    </div>
  </Drawer.Panel>
</Drawer>
```
