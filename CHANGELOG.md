# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## <small>18.0.2 (2018-11-09)</small>

* Fix: ensure pipeline can push to github ([9f9c6c5](https://github.com/wtw-im/es-components/commit/9f9c6c5))
* Docs: move developer-related docs to root ([804e3df](https://github.com/wtw-im/es-components/commit/804e3df))
* Build: run lerna publish on master builds ([1461142](https://github.com/wtw-im/es-components/commit/1461142))







## 18.0.0 - 2018-10-09
Fixes the styling of the RadioGroup
- No more underline of the legend
- Updating the label font-size to be smaller
- Stacking the radio buttons for the mobile breakpoint
- Updating a few instances of padding/margins to be consistent with the VB UI Toolkit

Implements consistent validation behavior with TextBox:
- Updates Checkbox to accept validationState and additionalHelpContent
- Updates RadioGroup to accept validationState and additionalHelpContent and removes hasError
- Updates Dropdown to accept additionalHelpContent
