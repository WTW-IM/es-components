## Component Testing Guidelines

Test React Components using [Enzyme](http://airbnb.io/enzyme/docs/api/index.html) and [Jest](https://facebook.github.io/jest/docs/api.html). These guidelines for testing should help ensure that Components get tested thoroughly while maintaining maximum flexibility.

### Using Enzyme
Favor ``shallow`` when rendering components. It helps to ensure that Component tests are being written as a unit. See [shallow rendering docs](http://airbnb.io/enzyme/docs/api/shallow.html).

If the same component is being rendered in multiple tests with a different set of props, use the built in Enzyme ``setProps`` function rather than creating a function that renders with passed in props.

Example:

````javascript
describe('My Component', () => {
  let instance;
  
  beforeEach(() => {
    instance = shallow(<MyComponent />);
  });

  it('renders an Alert component only when there are validation errors', () => {
    instance.setProps({ validationErrors: [{ valueName: 'firstName', messages: ['First name is required'] }] });
    // assertion
  })
});
````

### Logic based rendering

Test that things get rendered properly based on Component logic.

Some examples:

``it('renders an Alert component only when there are validation errors')``
``it('renders an active class when selected')``
``it('renders 3 list items when there are three items passed in props')``

### View based actions

Test that functions get executed as expected. This is important to test Component behavior, even if it's just testing that the function passed as a prop is executed.

Some examples:

``it('executes onValueChange function prop when I change the value of the text box')``
``it('executes onButtonClick function when I click the button')``

### Basic Rendering
In general, it is safe to assume that React will render the HTML as it's been declared. 
There's not a lot of value in testing basic rendering of markup. It doesn't really help with 
regression and is harder to maintain when changing a component's rendering while the behavior has not changed.

Examples:

``it(renders a header)``

