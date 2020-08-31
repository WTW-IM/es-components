Use the `closeButton` attribute on the Modal.Header to show or hide the "X" button.

For accessbility, make sure to include the attribute `aria-haspopup='dialog'` on whatever link you create to activate the modal. If you need
an informational dialog that contains no focusable elements, use a popover or something else more appropriate. Additionally, you can supply
a level prop to the `Modal.Header` to prevent skipping heading levels. The style of the `Modal.Header` will remain the same regardless of
the level passed in.

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
        <Button onClick={() => setShow(false)} style={{marginTope: 15}}>Cancel</Button>
        <Button onClick={() => setShow(false)} styleType="primary" style={{marginTop: 15}}>Ok</Button>
      </ModalButtonContainer>
    </Modal.Footer>
  </Modal>
</div>
```
