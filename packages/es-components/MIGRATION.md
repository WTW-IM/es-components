# Migration Guide: v1 to v2:

## Component Changes

- `Button` component no longer contains a nested `div` that was previously used for styling. This may break tests that selected the button element via `.parentNode` (e.g. `getByText('My button').parentNode.click()`). Now you would just use: `getByText('My button').click()` This may affect components that use `Button`:
  - `ActionButton`
  - `CallToAction`
  - `DropdownButton`
  - `Incrementer`
  - `Popover` (close button)
  - `StarRating` (close button)
  - `ToggleButton`


## Theme Changes

- `theme.size` has been renamed to `theme.font`
- `headingSize` has been moved to `theme.font.headingDesktop`
- added `theme.font.headingMobile`

- Brand colors have been renamed so they are not tied semantically to a specific color name:
  - `brandColors.vbBlue` -> `brandColors.primary1`
  - `brandColors.vbGreen` -> `brandColors.primary2`
  - `brandColors.vbMagenta` -> `brandColors.primary3`
  - `brandColors.wtwGray` -> `brandColors.secondary1`
  - new -> `brandColors.secondary2`

- Some colors have been renamed so they are not tied semantically to a specific color name:
  - `colors.softwareBlue` -> `colors.primary`

- Some colors have been removed:
  - removed -> `colors.defaultColor`
  - removed -> `colors.defaultHover`
  - removed -> `colors.defaultBtnText`
  - removed -> `colors.popoverHeader`

- New colors have been added from the [BDA UI Toolkit](https://wtw-im.github.io/bda-des-sys/base.html#colors-tints-shades):
  - new grayscale colors added with the intent to eventually replace the existing `gray0` - `gray9` -> `gray50`, `gray100`, `gray300`, `gray500`, `gray700`, `gray900`
  - new -> `blue50`, `blue300`, `blue500`, `blue700`, `blue900`
  - new -> `green50`, `green300`, `green500`, `green700`, `green900`
  - new -> `magenta50`, `magenta300`, `magenta500`, `magenta700`, `magenta900`
  - new -> `violet50`, `violet300`, `violet500`, `violet700`, `violet900`
  - new -> `yellow50`, `yellow300`, `yellow500`, `yellow700`, `yellow900`
