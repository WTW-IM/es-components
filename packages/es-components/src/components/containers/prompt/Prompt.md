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

const getDate = () => {
  const today = new Date();
  const day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

<React.Fragment>
  <Prompt type={PromptType.ReadAloud}>
    <Control orientation='inline'>
      <Fieldset legendContent={`My name is Mr/Mrs. Agent. Today is ${getDate()}. This call will be recorded. Do I have your permission to record this conversation to confirm your enrollment?`}>
        <RadioGroup
          name='recordConversation'
          onChange={radioOnChange}
          selectedValue={recordConversation}
        >
        <RadioButton value='recordConversationYes'>Yes</RadioButton>
        <RadioButton value='recordConversationNo'>No</RadioButton>
        </RadioGroup>
      </Fieldset>
    </Control>
  </Prompt>
  <Prompt type={PromptType.DoNotReadAloud}>
    <span>Statement to the agent that does not need to be read aloud.</span>
  </Prompt>
</React.Fragment>
```