Use the `Menu` to expose an list of items overlayed over the screen when a button is pressed. All nodes should be `Menu.MenuSection`s

### Basic Example
```
<Menu header="Small Menu" buttonContent="Open Menu" openButtonType="primary" rootClose>
  <Menu.MenuSection title="Menu Section" isFirst rootClose>
    <a href="http://www.google.com">Go To Google</a>
  </Menu.MenuSection>
  <Menu.MenuSection title="Menu Section 2">
    <a href="http://www.yahoo.com">Go To Yahoo</a>
  </Menu.MenuSection>
  <Menu.MenuSection title="Menu Section 3">
    <a href="http://www.lycos.com">Go To Lycos</a>
  </Menu.MenuSection>
  <Menu.MenuSection title="Menu Section 4">
    <a href="http://www.dogpile.com">Go To Dogpile</a>
  </Menu.MenuSection>
  <Menu.MenuSection title="Menu Section 5">
    <a href="http://www.bing.com">Go To Bing</a>
  </Menu.MenuSection>
  <Menu.MenuSection title="Menu Section 6">
    <a href="http://www.ask.com">Go To Ask</a>
  </Menu.MenuSection>
  <Menu.MenuSection title="Menu Section 7">
    <a href="http://www.search.com">Go To Search</a>
  </Menu.MenuSection>
  <Menu.MenuSection title="Menu Section 8" isLast>
    <a href="http://www.duckduckgo.com">Go To Duck Duck Go</a>
  </Menu.MenuSection>
</Menu>
```

### Inline Example
By adding the `Inline` prop the menu will be displayed without bottom borders side by side.

```
<Menu header="Small Menu" buttonContent="Open Menu" inline>
  <Menu.MenuSection title="Menu Section" isFirst>
    <a href="http://www.google.com">Go To Google</a>
  </Menu.MenuSection>
  <Menu.MenuSection title="Menu Section 2">
    <a href="http://www.yahoo.com">Go To Yahoo</a>
  </Menu.MenuSection>
  <Menu.MenuSection title="Menu Section 3">
    <a href="http://www.lycos.com">Go To Lycos</a>
  </Menu.MenuSection>
</Menu>
```