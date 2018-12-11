const React = require('react');
const { useContext, createElement: h } = require('react');
const { render, cleanup, fireEvent } = require('react-testing-library');

const useValidators = require('./');

function TestApp({ validators }) {
  const [ValidationContext, invokeValidators] = useValidators(validators);
  const results = useContext(ValidationContext);

  function onChange(event) {
    invokeValidators(event.target.value);
  }

  return h('div', null, [
    h('label', { htmlFor: 'test' }, 'Test'),
    h('input', { type: 'text', id: 'test', onChange }),
    results.map((res, index) => (
      res.isValid ? 
      h('p', { key: index }, 'Valid') :
      h('p', { key: index }, 'Invalid')
    ))
  ]);
}

beforeEach(cleanup);

it('invokes all validators', () => {
  const firstValidator = jest.fn().mockReturnValue({ isValid: true });
  const secondValidator = jest.fn().mockReturnValue({ isValid: true });
  const validators = [firstValidator, secondValidator];
  const { getByLabelText } = render(h(TestApp, { validators }));

  fireEvent.change(getByLabelText('Test'), { target: { value: 'h' } });

  expect(firstValidator).toHaveBeenCalledWith('h');
  expect(secondValidator).toHaveBeenCalledWith('h');
});

it('gets results out of returned context', () => {
  const firstValidator = jest.fn().mockReturnValue({ isValid: true });
  const secondValidator = jest
    .fn()
    .mockReturnValueOnce({ isValid: false })
    .mockReturnValueOnce({ isValid: true });
  const validators = [firstValidator, secondValidator];

  const { getByLabelText, getByText } = render(h(TestApp, { validators }));

  fireEvent.change(getByLabelText('Test'), { target: { value: 'h' } });

  expect(() => getByText('Invalid')).not.toThrow();

  fireEvent.change(getByLabelText('Test'), { target: { value: 'hello' } });

  expect(() => getByText('Invalid')).toThrow();
});
