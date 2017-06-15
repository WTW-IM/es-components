Use the ```closeButton``` attribute on the Modal.Header to show or hide the "X" button.

For accessbility, make sure to include the attribute ```aria-haspopup='dialog'``` on whatever link you create to activate the modal.

```
<div>
  <Button aria-haspopup='dialog' handleOnClick={() => setState({show: true, size: 'small', showCloseButton: false})} style={{marginRight:'15px'}}>Open Small Modal</Button>

  <Button aria-haspopup='dialog' handleOnClick={() => setState({show: true, size: 'medium', showCloseButton: true})} style={{marginRight:'15px'}}>Open Medium Modal</Button>

  <Button aria-haspopup='dialog' handleOnClick={() => setState({show: true, size: 'large', showCloseButton: true})}>Open Large Modal</Button>

  <Modal
    size={state.size}
    show={state.show}
    onHide={() => setState({show: false})}
  >
    <Modal.Header closeButton={state.showCloseButton}>This is the header.</Modal.Header>
    <Modal.Body>Body Content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.This is the popover's content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</Modal.Body>
    <Modal.Footer>This is the footer.</Modal.Footer>
  </Modal>
</div>
```
