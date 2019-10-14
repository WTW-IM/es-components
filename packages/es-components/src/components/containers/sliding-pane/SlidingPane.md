For accessbility, make sure to include the attribute `aria-haspopup='dialog'` on whatever link you create to activate the sliding pane.

```
import Button from '../../controls/buttons/Button';

function SlidingPaneExample() {

  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button aria-haspopup='dialog' onClick={() => setShow(true)}>Open Sliding Pane</Button>

      <SlidingPane
            isOpen={show}
            title="Sliding Pane Example"
            onRequestClose={() => setShow(false)}>
        Some body content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.This is the popover's content. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
      </SlidingPane>
    </>
    );
}

<SlidingPaneExample />
```
