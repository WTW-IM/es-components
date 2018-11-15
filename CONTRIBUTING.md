## Component Testing Guidelines

Test React Components using [react-testing-library](https://github.com/kentcdodds/react-testing-library) and [Jest](https://facebook.github.io/jest/docs/api.html). These guidelines for testing should help ensure that Components get tested thoroughly while maintaining maximum flexibility.

### Logic based rendering

Test that things get rendered properly based on Component logic.

Some examples:

``it('renders a Notification component only when there are validation errors')``
``it('only allows one drawer to be opened at a time')``
``it('renders a lengend when legendContent is provided')``

### View based actions

Test that actions trigger the correct updates in the UI.

Some examples:

``it('opens a closed panel')``
``it('when increment button is clicked, the displayed value is increased by incrementAmount')``

### Basic Rendering
In general, it is safe to assume that React will render the HTML as it's been declared. 
There's not a lot of value in testing basic rendering of markup. It doesn't really help with 
regression and is harder to maintain when changing a component's rendering while the behavior has not changed.

Examples:

``it(renders a header)``

