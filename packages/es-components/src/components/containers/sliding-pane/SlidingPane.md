For accessbility, make sure to include the attribute `aria-haspopup='dialog'` on whatever link you create to activate the sliding pane.

```
import Button from '../../controls/buttons/Button';
import styled from 'styled-components';

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

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
        <Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Footer>
      </SlidingPane>
    </>
    );
}

<SlidingPaneExample />
```

Custom styling for the overlay and content can also be provided.

```
import Button from '../../controls/buttons/Button';

function SlidingPaneExample() {

  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button aria-haspopup='dialog' onClick={() => setShow(true)}>Open Custom Sliding Pane</Button>

      <SlidingPane
            isOpen={show}
            title="Custom Sliding Pane Example"
            onRequestClose={() => setShow(false)}
            overlayStyles={{marginTop: '100px'}}
            contentStyles={{marginRight: 'auto'}}>
        You can see the styling applied
      </SlidingPane>
    </>
    );
}

<SlidingPaneExample />
```
