At the top level are the `type` and `onSelectionChange` props. The former governs the selection behavior of the configured drawers to behave as either `radio` buttons or as a `checkbox`. The latter allows an accordian style behavior in selection

```jsx
<SelectionDrawer type="radio">
  <SelectionDrawer.Item header="Medicare coverage 1" panelKey="medicareCoverage1" forceOpen>
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 2" panelKey="medicareCoverage2" validationState="info" >
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 3" panelKey="medicareCoverage3" disabled>
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 4" panelKey="medicareCoverage4" validationState="warning">
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 5" panelKey="medicareCoverage5" validationState="danger">
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
</SelectionDrawer>
```

While the former allows multiple items to be selected. Any selections made are exposed through the `onSelectionChange` callback.

```jsx
<SelectionDrawer type="checkbox" onSelectionChange={console.log}>
  <SelectionDrawer.Item header="Medicare coverage 1" panelKey="medicareCoverage1" forceOpen>
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 2" panelKey="medicareCoverage2" validationState="info" >
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 3" panelKey="medicareCoverage3" disabled>
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 4" panelKey="medicareCoverage4" validationState="warning">
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 5" panelKey="medicareCoverage5" validationState="danger">
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
</SelectionDrawer>
```

`SelectionDrawer.Item` requires three props in order to correctly function - `header`, `panelKey` and `children`. The `header` represents the label content to be displayed at the top of the drawer. The `panelKey` acts as a unique key representing each individual item. All content within `children` is for any and all collapsable content when the user interacts with the selection. The header and checkbox/radio button can be configured to align to the left or right of the container.

The are numerous unitlity props available on `SelectionDrawer.Item`. The collapsing behavior can be decoupled from the selection behavior with the `independentSelection` prop. Furthermore, `forceOpen` and `forceClose` can control the content visibility on initial render. The `SelectionDrawer.Item` also takes a `validationState` for validation display.

```jsx
<SelectionDrawer type="checkbox">
  <SelectionDrawer.Item header="Medicare coverage 1" panelKey="medicareCoverage1" independentSelection>
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
  <SelectionDrawer.Item header="Medicare coverage 2" panelKey="medicareCoverage2" independentSelection headerAlignment="right">
    Hello and welcome to the other revealed Drawer content!

    We hope it is not nightmarish!
  </SelectionDrawer.Item>
</SelectionDrawer>
```