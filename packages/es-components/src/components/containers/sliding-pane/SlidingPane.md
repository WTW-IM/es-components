For accessbility, make sure to include the attribute `aria-haspopup='dialog'` on whatever link you create to activate the sliding pane.

```
import Button from '../../controls/buttons/Button';

<div>
  <Button aria-haspopup='dialog' onClick={() => setState({show: true})}>Open Sliding Pane</Button>

  <SlidingPane
        isOpen={state.show}
        title="Sliding Pane Example"
        onRequestClose={() => setState({show: false})}>
    Some body content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.This is the popover's content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
  </SlidingPane>
</div>
```