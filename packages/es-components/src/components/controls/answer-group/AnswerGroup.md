Group `AnswerButton` components together using a `AnswerGroup`. Any additional props passed to `AnswerGroup` will propagate to each individual `AnswerButton`.

```
const AnswerButton = require('./AnswerButton').default


function AnswerGroupExample() {
  const [activity, setActivity] = React.useState('nothing')

  function handleRadioChange(event) {
    setActivity(event.target.value)
  }

  return (
    <>
      <AnswerGroup name="yes-no-question" onChange={handleRadioChange} >
        <AnswerButton value="yes">Yes</AnswerButton>
        <AnswerButton value="no">No</AnswerButton>
      </AnswerGroup>
      <p>You've selected: {activity}</p>
    </>
  )
};

<AnswerGroupExample />
```

You can apply different button styles using the `styleType` and `selectedType` props

```
const AnswerButton = require('./AnswerButton').default


function AnswerGroupExample() {
  const [activity, setActivity] = React.useState('nothing')

  function handleRadioChange(event) {
    setActivity(event.target.value)
  }

  return (
    <>
      <AnswerGroup name="household-type" styleType="default" selectedType="primary" itemWidth="200px" onChange={handleRadioChange} >
        <AnswerButton value="single" isOutline>Single</AnswerButton>
        <AnswerButton value="married" isOutline>Married</AnswerButton>
        <AnswerButton value="head" isOutline>Head of Household</AnswerButton>
      </AnswerGroup>
      <p>You've selected: {activity}</p>
    </>
  )
};

<AnswerGroupExample />
```

Setting the `isOutline` property will apply a flat style to each `AnswerButton`

```
const AnswerButton = require('./AnswerButton').default


function AnswerGroupExample() {
  const [activity, setActivity] = React.useState('nothing')

  function handleRadioChange(event) {
    setActivity(event.target.value)
  }

  return (
    <>
      <AnswerGroup name="household-type" styleType="primary" selectedType="primary" itemWidth="200px" onChange={handleRadioChange} isOutline >
        <AnswerButton value="left">Left</AnswerButton>
        <AnswerButton value="middle">Middle</AnswerButton>
        <AnswerButton value="right">Right</AnswerButton>
      </AnswerGroup>
      <p>You've selected: {activity}</p>
    </>
  )
};

<AnswerGroupExample />
```
