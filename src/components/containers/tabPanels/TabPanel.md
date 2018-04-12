Tab Panels allow us to store lots more data on the screen and only show the amount we want, when we want. This works by having a Tab contain context, or a Tab List that contains elements. Each direct child of the tab list mush contain optiontext that will turn into the title in the dropdown. Tabs are able to have a full node inside instead of just text. This allows us to put in icons and other styling.

```
<div>
<TabPanel optionKeyFunc={((x) => x.replace(/\s/g, ''))}>
  <TabPanel.TabList name="Topics">
    <span optiontext="Basics">
      <p>
       No elements
      </p>
    </span>
    <span optiontext="Advanced">
       <p>
        More information. So much information. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
       </p>
    </span>
  </TabPanel.TabList>
  <TabPanel.Tab name="Hi there">
    <p>
      HELLO WORLD!!!!
    </p>
  </TabPanel.Tab>
  <TabPanel.Tab name={<div><Icon name="certificate" /><span>Interesting</span><p>5 plans</p></div>}>
    <div>
      <p>
        Nesting is fun
      </p>
    </div>
  </TabPanel.Tab>
</TabPanel>
</div>
```