Use the `closeButton` attribute on the Modal.Header to show or hide the "X"
button.

For accessbility, make sure to include the attribute `aria-haspopup='dialog'` on
whatever link you create to activate the modal. If you need an informational
dialog that contains no focusable elements, use a popover or something else more
appropriate. Additionally, you can supply a level prop to the `Modal.Header` to
prevent skipping heading levels. The style of the `Modal.Header` will remain the
same regardless of the level passed in.

If you need to custom style the Modal, we recommend passing classes from your
local implementation into the components you wish to style. You can also pass
`className` or `backdropClassName`, which will get added to the modal itself.

By default, the backdrop and modal content receive these classes:

- Backdrop
  - `ReactModal__Overlay`
  - `ReactModal__Overlay--after-open`
  - `ReactModal__Overlay--before-close`
- Modal
  - `ReactModal__Content`
  - `ReactModal__Content--after-open`
  - `ReactModal__Content--before-close`

Here's an example of what all the styling might look like in practice,
using `styled-components`.

```jsx static
const MyModalStyles = createGlobalStyle`
  .my-modal, .my-modal.ReactModal__Content {
    // custom styles for modal content
  }

  .my-modal.ReactModal__Content--after-open {
    // custom styles for opening transition of modal content
  }

  .my-modal.ReactModal__Content--before-close {
    // custom styles for closing transition of modal content
  }

  .my-modal-backdrop, .my-modal.ReactModal__Overlay {
    // custom styles for modal overlay
  }

  .my-modal-backdrop.ReactModal__Overlay--after-open {
    // custom styles for opening transition of modal overlay
  }

  .my-modal-backdrop.ReactModal__Overlay--before-close {
    // custom styles for closing transition of modal overlay
  }

  .my-modal-header {
    // custom styles for modal header
  }

  .my-modal-body {
    // custom styles for modal body
  }

  .my-modal-footer {
    // custom styles for modal footer
  }
`;

const MyModal = () => (
  <>
    <MyModalStyles />
    <Modal className="my-modal" backdropClassName="my-modal-backdrop">
      <Modal.Header className="my-modal-header">This is my modal!</Modal.Header>
      <Modal.Body className="my-modal-body">
        This is the modal body. It has some really great content!
      </Modal.Body>
      <Modal.Footer className="my-modal-footer">
        This is my modal's footer.
      </Modal.Footer>
    </Modal>
  </>
);
```

```
import Button from '../../controls/buttons/Button';

const [show, setShow] = React.useState(false);
const [size, setSize] = React.useState('medium');
const [hideCloseButton, setHideCloseButton] = React.useState(false);
const setInitialState = ({show: newShow, size: newSize, hideCloseButton: newHideClose}) => {
  setShow(newShow);
  setSize(newSize);
  setHideCloseButton(newHideClose);
}

<div>
  <Button
    aria-haspopup='dialog'
    onClick={() => setInitialState({show: true, size: 'small', hideCloseButton: true})}
    style={{margin: '0 15px 15px 0'}}
  >
    Open Small Modal
  </Button>

  <Button
    aria-haspopup='dialog'
    onClick={() => setInitialState({show: true, size: 'medium', hideCloseButton: false})}
    style={{margin: '0 15px 15px 0'}}
  >
    Open Medium Modal
  </Button>

  <Button
    aria-haspopup='dialog'
    onClick={() => setInitialState({show: true, size: 'large', hideCloseButton: false})}
    style={{margin: '0 15px 15px 0'}}
  >
    Open Large Modal
  </Button>

  <Modal
    size={size}
    show={show}
    onHide={() => setShow(false)}
  >
    <Modal.Header level={4} hideCloseButton={hideCloseButton}>This is the header.</Modal.Header>
    <Modal.Body>Body Content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.This is the popover's content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</Modal.Body>
    <Modal.Footer>
      <span style={{ flexGrow: 1, marginRight: '10px' }}>
        This is the footer.
      </span>
      <Button onClick={() => setShow(false)} style={{margin:0}}>Ok</Button>
    </Modal.Footer>
  </Modal>
</div>
```

`ModalButtonContainer` is a provided wrapper to give consistent styling to buttons and their layout inside of `Modal`s.

```
import ModalButtonContainer from './ModalButtonContainer';
import Button from '../../controls/buttons/Button';

const [show, setShow] = React.useState(false);

<div>
  <Button aria-haspopup='dialog' onClick={() => setShow(true)} style={{marginRight:'15px'}}>Open Modal</Button>

  <Modal
    size="medium"
    show={show}
    onHide={() => setShow(false)}
  >
    <Modal.Header level={4} hideCloseButton={false}>This is the header.</Modal.Header>
    <Modal.Body>Body Content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.This is the popover's content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</Modal.Body>
    <Modal.Footer>
      <ModalButtonContainer>
        <Button onClick={() => setShow(false)}>Cancel</Button>
        {'\u00A0'}
        <Button onClick={() => setShow(false)} styleType="primary">Ok</Button>
      </ModalButtonContainer>
    </Modal.Footer>
  </Modal>
</div>
```
