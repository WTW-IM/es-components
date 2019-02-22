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
      <br/>
      <br/>
      <br/>
      <p>You've selected: {activity}</p>
    </>
  )
};

<AnswerGroupExample />
```

You can apply different button styles using the `styleType` and `successType` props

```
const AnswerButton = require('./AnswerButton').default


function AnswerGroupExample() {
  const [activity, setActivity] = React.useState('nothing')

  function handleRadioChange(event) {
    setActivity(event.target.value)
  }

  return (
    <>
      <AnswerGroup name="household-type" styleType="warning" successType="success" itemWidth="200px" onChange={handleRadioChange} >
        <AnswerButton value="single">Single</AnswerButton>
        <AnswerButton value="married">Married</AnswerButton>
        <AnswerButton value="head">Head of Household</AnswerButton>
      </AnswerGroup>
      <br/>
      <p>You've selected: {activity}</p>
    </>
  )
};

<AnswerGroupExample />
```