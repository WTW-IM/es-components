Spinner button is a combination of Button and Spinner components and able to have any attributes that both components typically have.

```
import IconButton from './IconButton';

const buttonStyle = {
  display: 'inline-block',
  margin: '10px 15px 0 0'
};

function SpinnerButtonExample() {

    return (
      <div>
        <SpinnerButton disabled style={{width:'20%'}}>Toggle Me</IconButton>
        <SpinnerButton isOutline styleType="success" disabled style={buttonStyle}>Success</SpinnerButton>
      </div>
    );
}

<SpinnerButtonExample/>
```