Initial Progress Tracker state.
```
<ProgressTracker steps={[
  { active: true, label: "Item One" },
  { active: false, label: "Item Two" },
  { active: false, label: "Item Three" },
  { active: false, label: "Item Four" },
]} />
```

Step Two Active:
```
<ProgressTracker steps={[
  { active: false, label: "Item One" },
  { active: true, label: "Item Two" },
  { active: false, label: "Item Three" },
  { active: false, label: "Item Four" },
]} />
```

Step Three Active:
```
<ProgressTracker steps={[
  { active: false, label: "Item One" },
  { active: false, label: "Item Two" },
  { active: true, label: "Item Three" },
  { active: false, label: "Item Four" },
]} />
```

Step Four Active:
```
<ProgressTracker steps={[
  { active: false, label: "Item One" },
  { active: false, label: "Item Two" },
  { active: false, label: "Item Three" },
  { active: true, label: "Item Four" },
]} />
```

Many steps:
```
<ProgressTracker steps={[
  { active: false, label: "Item One" },
  { active: false, label: "Item Two" },
  { active: false, label: "Item Three" },
  { active: false, label: "Item Four" },
  { active: false, label: "Item Five" },
  { active: false, label: "Item Six" },
  { active: true, label: "Item Seven" },
  { active: false, label: "Item Eight" },
]} />
```

Responding when a past step is clicked. The intended behavior is that, if
you go backward in history, you _must_ complete the new current step and any
steps after that. That being the case, if you go backwards, the only way to
continue forward is to complete the steps back to where you previously were. In
this example, we've provided a "Reset" button to allow you to set the component
to its original state.
```javascript

const initialSteps = [
  { active: false, label: "Item One" },
  { active: false, label: "Item Two" },
  { active: false, label: "Item Three" },
  { active: false, label: "Item Four" },
  { active: false, label: "Item Five" },
  { active: false, label: "Item Six" },
  { active: true, label: "Item Seven" },
  { active: false, label: "Item Eight" },
];
const [steps, setSteps] = React.useState(initialSteps);

<div>
  <ProgressTracker
    steps={steps}
    onPastStepClicked={(newIndex) => setSteps(
       steps.map((step, index) => ({ ...step, active: index === newIndex }))
    )}
  />
  <button onClick={() => setSteps(initialSteps)}>Reset</button>
</div>
```
