A styled message will render as a message container or styled div.

```
import React, { useState } from 'react';
import Control from '../../controls/Control';
import Fieldset from '../fieldset/Fieldset';
import RadioGroup from '../../controls/radio-buttons/RadioGroup';
import RadioButton from '../../controls/radio-buttons/RadioButton';
import { PromptType } from './PromptType';
import Prompt from './Prompt';
import formatMessage from 'format-message';

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
      {formatMessage(`My name is Mr/Mrs. Agent. Today is {today}. This call will be recorded. Do I have your permission to record this conversation to confirm your enrollment?`, { today: getDate() })}
    </div>
    <div style={{'display': 'inline-flex', 'padding': '5px 0 0 5px'}}>
      <RadioGroup
        name='recordConversation'
        onChange={radioOnChange}
        selectedValue={recordConversation}
      >
      <RadioButton value='recordConversationYes'>{formatMessage('Yes')}</RadioButton>
      <RadioButton value='recordConversationNo'>{formatMessage('No')}</RadioButton>
      </RadioGroup>
    </div>
  </Prompt>
  <Prompt isContentReadAloud={false}>
    <span>{formatMessage('Statement to the agent that does not need to be read aloud.')}</span>
  </Prompt>
  <Prompt>
     <span>
      {formatMessage.rich("Not passing <s>isContentReadAloud</s> defaults to 'Read Aloud'",
        {
          s: ({ children }) => <strong key="bold">{children}</strong>
        })
      }
    </span>
  </Prompt>
</React.Fragment>
```
