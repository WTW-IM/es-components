```
<div>
  <Button handleOnClick={() => setState({show: true, size: 'small'})} style={{marginRight:'15px'}}>Open Small Modal</Button>

  <Button handleOnClick={() => setState({show: true, size: 'medium'})} style={{marginRight:'15px'}}>Open Medium Modal</Button>

  <Button handleOnClick={() => setState({show: true, size: 'large'})}>Open Large Modal</Button>

  <Modal
    size={state.size}
    show={state.show}
    onHide={() => setState({show: false})}
  >
    <Modal.Header>This is the header.</Modal.Header>
    <Modal.Body>Body Content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.This is the popover's content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</Modal.Body>
    <Modal.Footer>This is the footer.</Modal.Footer>
  </Modal>
</div>
```
