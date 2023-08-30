Initial Progress Tracker state.

```javascript
<ProgressTracker
  steps={[
    { active: true, label: 'Item One' },
    { active: false, label: 'Item Two' },
    { active: false, label: 'Item Three' },
    { active: false, label: 'Item Four' }
  ]}
/>
```

Step Two Active:

```javascript
<ProgressTracker
  steps={[
    { active: false, label: 'Item One' },
    { active: true, label: 'Item Two' },
    { active: false, label: 'Item Three' },
    { active: false, label: 'Item Four' }
  ]}
/>
```

Step Three Active:

```javascript
<ProgressTracker
  steps={[
    { active: false, label: 'Item One' },
    { active: false, label: 'Item Two' },
    { active: true, label: 'Item Three' },
    { active: false, label: 'Item Four' }
  ]}
/>
```

Step Four Active:

```javascript
<ProgressTracker
  steps={[
    { active: false, label: 'Item One' },
    { active: false, label: 'Item Two' },
    { active: false, label: 'Item Three' },
    { active: true, label: 'Item Four' }
  ]}
/>
```

Many steps:

```javascript
<ProgressTracker
  steps={[
    { active: false, label: 'Item One' },
    { active: false, label: 'Item Two' },
    { active: false, label: 'Item Three' },
    { active: false, label: 'Item Four' },
    { active: false, label: 'Item Five' },
    { active: false, label: 'Item Six' },
    { active: true, label: 'Item Seven' },
    { active: false, label: 'Item Eight' }
  ]}
/>
```

Responding when _only_ a past step is clicked. The intended behavior is that, if
you go backward in history, you _must_ complete the new current step and any
steps after that. That being the case, if you go backwards, the only way to
continue forward is to complete the steps back to where you previously were. In
this example, we've provided a "Reset" button to allow you to set the component
to its original state.

```javascript
const initialSteps = [
  { active: false, label: 'Item One' },
  { active: false, label: 'Item Two' },
  { active: false, label: 'Item Three' },
  { active: false, label: 'Item Four' },
  { active: false, label: 'Item Five' },
  { active: false, label: 'Item Six' },
  { active: true, label: 'Item Seven' },
  { active: false, label: 'Item Eight' }
];
const [steps, setSteps] = React.useState(initialSteps);
const onStepClicked = newIndex =>
  setSteps(
    steps.map((step, index) => ({ ...step, active: index === newIndex }))
  );

<div>
  <ProgressTracker steps={steps} onPastStepClicked={onStepClicked} />
  <button onClick={() => setSteps(initialSteps)}>Reset</button>
</div>;
```

Responding when a past or future step is clicked.

```javascript
const initialSteps = [
  { active: false, label: 'Item One' },
  { active: false, label: 'Item Two' },
  { active: false, label: 'Item Three' },
  { active: false, label: 'Item Four' },
  { active: false, label: 'Item Five' },
  { active: false, label: 'Item Six' },
  { active: true, label: 'Item Seven' },
  { active: false, label: 'Item Eight' }
];
const [steps, setSteps] = React.useState(initialSteps);
const onStepClicked = newIndex =>
  setSteps(
    steps.map((step, index) => ({ ...step, active: index === newIndex }))
  );

<div>
  <ProgressTracker
    steps={steps}
    onPastStepClicked={onStepClicked}
    onFutureStepClicked={onStepClicked}
  />
  <button onClick={() => setSteps(initialSteps)}>Reset</button>
</div>;
```
