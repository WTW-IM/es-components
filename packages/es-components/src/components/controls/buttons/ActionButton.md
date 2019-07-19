An `ActionButton` is a `Button` that uses the Default style as the base and the 'styleType' color for the hover effect.

### ActionButton Style Types

```
const buttonStyle = {
  margin: '10px 15px 0 0'
};

const iconStyle = {
  position: 'relative',
  top: '-2px'
};

<p style={{display: 'flex'}}>
  <ActionButton styleType="info" style={buttonStyle}><Icon name="edit" style={iconStyle} /> Edit</ActionButton>
  <ActionButton styleType="success" style={buttonStyle}><Icon name="add" style={iconStyle} /> Add</ActionButton>
  <ActionButton styleType="danger" style={buttonStyle}><Icon name="remove" style={iconStyle} /> Remove</ActionButton>
</p>
```
