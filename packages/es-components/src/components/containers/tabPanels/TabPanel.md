Tab Panels allow us to store lots more data on the screen and only show the amount we want, when we want. This works by having a Tab contain context, or a Tab List that contains elements. Each direct child of the tab list must contain optiontext that will turn into the title in the dropdown. Tabs are able to have a full node inside instead of just text. This allows us to put in icons and other styling.

```
<div>
<TabPanel>
  <TabPanel.Tab name="Hi there">
    <p>
      HELLO WORLD!!!!
    </p>
  </TabPanel.Tab>
  <TabPanel.Tab simpleName="interesting" name={<div><Icon name="certificate" />Interesting 5 plans</div>}>
    <div>
      <p>
        Nesting is fun
      </p>
    </div>
  </TabPanel.Tab>
  <TabPanel.Tab name="Lorem ipsum">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    </p>
  </TabPanel.Tab>
  <TabPanel.Tab name="dolor sit">
    <p>
      ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    </p>
  </TabPanel.Tab>
</TabPanel>
</div>
```