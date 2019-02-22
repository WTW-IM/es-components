Group `RadioButton` components together using a `RadioGroup`. Any additional props passed to `RadioGroup` will propagate to each individual `RadioButton`.

```
const RadioButton = require('./AnswerButton').default


function AnswerGroupExample() {
  const [activity, setActivity] = React.useState('nothing')

  function handleRadioChange(event) {
    setActivity(event.target.value)
  }

  return (
    <>
      <AnswerGroup name="yes-no-question" onChange={handleRadioChange} >
        <AnswerButton value="yes">Yes</RadioButton>
        <AnswerButton value="no">No</RadioButton>
      </AnswerGroup>
      <p>You've selected: {activity}</p>
    </>
  )
};

<AnswerGroupExample />
```