A styled message will render as a message container or styled div.

```
import React, { useState } from 'react';
import Control from '../../controls/Control';
import Fieldset from '../fieldset/Fieldset';
import RadioGroup from '../../controls/radio-buttons/RadioGroup';
import RadioButton from '../../controls/radio-buttons/RadioButton';
import { PromptType } from './PromptType';
import Prompt from './Prompt';

const [recordConversation, setStateForQuestion] = useState('');
const radioOnChange = target => {
  setStateForQuestion(target.currentTarget.value);
};

function getDate() {
  const today = new Date();
  var month = today.getMonth() + 1;
  const day = today.getDate();
  var year = today.getFullYear();
  return `${month}/${day}/${year}`;
}

<React.Fragment>
  <Prompt isContentReadAloud={true}>
    <div>
      {`My name is Mr/Mrs. Agent. Today is ${getDate()}. This call will be recorded. Do I have your permission to record this conversation to confirm your enrollment?`}
    </div>
    <div style={{'display': 'inline-flex', 'padding': '5px 0 0 5px'}}>
      <RadioGroup
        name='recordConversation'
        onChange={radioOnChange}
        selectedValue={recordConversation}
      >
      <RadioButton value='recordConversationYes'>Yes</RadioButton>
      <RadioButton value='recordConversationNo'>No</RadioButton>
      </RadioGroup>
    </div>
  </Prompt>
  <Prompt isContentReadAloud={false}>
    <span>Statement to the agent that does not need to be read aloud.</span>
  </Prompt>
  <Prompt>
    <span>Not passing <strong>isContentReadAloud</strong> defaults to 'Read Aloud'</span>
  </Prompt>
</React.Fragment>
```
