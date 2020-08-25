Tab Panels allow us to store lots more data on the screen and only show the amount we want, when we want. This works by having a TabPanel.Tab which provides a quick peek into what information will be display in the content area when clicked. The TabPanel.Tab has a name, which is a string or JSX to be displayed, and an optional simpleName, which is a string that will be read by a screen reader. The TabPanel.Tab can have children inside of it that will be rendered inside of the TabPanel's content area.

```js
import Icon from '../../base/icons/Icon';

<TabPanel>
  <TabPanel.Tab name="Hi there">
    <p>
      HELLO WORLD!!!!
    </p>
  </TabPanel.Tab>
  <TabPanel.Tab simpleName="interesting" name={<div><Icon name="certificate" size={22} />Interesting 5 plans</div>}>
    <div>
      <p>
        Nesting is fun
      </p>
    </div>
  </TabPanel.Tab>
  <TabPanel.Tab name="Lorem ipsum" announcerText="Tab is now selected">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    </p>
  </TabPanel.Tab>
  <TabPanel.Tab name="dolor sit">
    <p>
      Multiple paragraphs inside the Tab.
    </p>
    <p>
      ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    </p>
  </TabPanel.Tab>
</TabPanel>
```

It is possible to control the displayed tab directly using the `selectedKey` prop.

```js
import Icon from '../../base/icons/Icon';

const [selectedKey, setSelectedKey] = React.useState('dolor sit');

function tabChanged(name) {
  let selectedKey = name;
  if (name.key) {
    selectedKey = name.key;
  }
  setSelectedKey(selectedKey);
}

<TabPanel selectedKey={selectedKey} tabChanged={tabChanged}>
  <TabPanel.Tab name="Hi there">
    <p>
      HELLO WORLD!!!!
    </p>
  </TabPanel.Tab>
  <TabPanel.Tab simpleName="interesting" name={<div key="foobar"><Icon name="certificate" size={22} />Interesting 5 plans</div>}>
    <div>
      <p>
        Nesting is fun
      </p>
    </div>
  </TabPanel.Tab>
  <TabPanel.Tab name="Lorem ipsum" announcerText="Tab is now selected">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    </p>
  </TabPanel.Tab>
  <TabPanel.Tab name="dolor sit">
    <p>
      Multiple paragraphs inside the Tab.
    </p>
    <p>
      ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    </p>
  </TabPanel.Tab>
</TabPanel>
```
