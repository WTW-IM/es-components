## Measurements

A general rule of thumb for setting measurements is as follows:

- If the measurement is focused on text or positioning within or around a
  container (like padding and margin), use `em` so that if your container's
  text size changes, your spacing stays proportional.
- If the measurement is part of an overall layout, use `px`. Our layouts are
  largely based on pixel measurements. (In the `es-components-via-theme`, the
  `phone` break point is `480px`, for example.) Since the layouts are built
  around a `px` expectation, we should add to the layout with the same
  expectation.
