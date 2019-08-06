A specially styled `LinkButton` that can be used with `Popover` if a text link is desired over the normal `Button`.

```
<PopoverLink styleType="success">Popover Link Button</PopoverLink>
```

You can optionally suppress the underline in the link. This can be useful when using icons.

```
import Icon from '../../base/icons/Icon';

<PopoverLink suppressUnderline styleType="primary"><Icon name="accessibility" size={30} /></PopoverLink>
```
