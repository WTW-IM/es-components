Group `AnswerButton` components together using a `AnswerGroup`. Any additional props passed to `AnswerGroup` will propagate to each individual `AnswerButton`.

```
const AnswerButton = require('./AnswerButton').default

function AnswerGroupExample() {
  const [answer, setAnswer] = React.useState('nothing')

  function handleRadioChange(event) {
    setAnswer(event.target.value)
  }

  return (
    <>
      <AnswerGroup name="yes-no-question" onChange={handleRadioChange} selectedValue={answer}>
        <AnswerButton value="yes">Yes</AnswerButton>
        <AnswerButton value="no">No</AnswerButton>
      </AnswerGroup>
      <p>You've selected: {answer}</p>
    </>
  )
};

<AnswerGroupExample />
```

You can apply different button styles using the `styleType`, `size`, and `selectedType` props

```
const AnswerButton = require('./AnswerButton').default

function AnswerGroupExample() {
  const [answer, setAnswer] = React.useState('nothing')

  function handleRadioChange(event) {
    setAnswer(event.target.value)
  }

  return (
    <>
      <AnswerGroup name="household-type" size="sm" styleType="default" selectedType="info" itemWidth="200px" onChange={handleRadioChange} selectedValue={answer}>
        <AnswerButton value="single">Single</AnswerButton>
        <AnswerButton value="married">Married</AnswerButton>
        <AnswerButton value="head">Head of Household</AnswerButton>
      </AnswerGroup>
      <p>You've selected: {answer}</p>
    </>
  )
};

<AnswerGroupExample />
```

Setting the `isOutline` property will apply a flat style to each `AnswerButton`

```
const AnswerButton = require('./AnswerButton').default

function AnswerGroupExample() {
  const [answer, setAnswer] = React.useState('nothing')

  function handleRadioChange(event) {
    setAnswer(event.target.value)
  }

  return (
    <>
      <AnswerGroup name="position" styleType="primary" selectedType="primary" itemWidth="200px" onChange={handleRadioChange} isOutline selectedValue={answer}>
        <AnswerButton value="left">Left</AnswerButton>
        <AnswerButton value="middle">Middle</AnswerButton>
        <AnswerButton value="right">Right</AnswerButton>
      </AnswerGroup>
      <p>You've selected: {answer}</p>
    </>
  )
};

<AnswerGroupExample />
```

### Validation states

```
const Control = require('../Control').default;
const AnswerButton = require('./AnswerButton').default

function AnswerGroupExample() {
  return (
    <>
    <Control validationState="success">
      <Label htmlFor="success-question">Success</Label>
      <AnswerGroup name="success-question" isOutline onChange={()=>{}}>
        <AnswerButton value="yes">Yes</AnswerButton>
        <AnswerButton value="no">No</AnswerButton>
      </AnswerGroup>
    </Control>

    <Control validationState="warning">
      <Label htmlFor="warning-question">Warning</Label>
      <AnswerGroup name="warning-question" isOutline onChange={()=>{}}>
        <AnswerButton value="yes">Yes</AnswerButton>
        <AnswerButton value="no">No</AnswerButton>
      </AnswerGroup>
    </Control>

    <Control validationState="danger">
      <Label htmlFor="danger-question">Danger</Label>
      <AnswerGroup name="danger-question" isOutline onChange={()=>{}}>
        <AnswerButton value="yes">Yes</AnswerButton>
        <AnswerButton value="no">No</AnswerButton>
      </AnswerGroup>
    </Control>
</>
  )
};

<AnswerGroupExample />
```
