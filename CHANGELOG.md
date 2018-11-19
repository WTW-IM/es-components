# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## <small>18.0.5 (2018-11-19)</small>

* Update: Checkbox and RadioGroup styles, styleguide styles ([fcb194f](https://github.com/wtw-im/es-components/commit/fcb194f))





## <small>18.0.4 (2018-11-15)</small>

* Update: Add helper function to wrap render ([5c6369e](https://github.com/wtw-im/es-components/commit/5c6369e))
* Update: Add tests to Spinner component ([bb471dc](https://github.com/wtw-im/es-components/commit/bb471dc))
* Update: Change Breadcrumb to use react-testing-library ([e3b239a](https://github.com/wtw-im/es-components/commit/e3b239a))
* Update: Change Checkbox to react-testing-library ([90834f2](https://github.com/wtw-im/es-components/commit/90834f2))
* Update: Change Datepicker to use react-testing-library ([a68ac5c](https://github.com/wtw-im/es-components/commit/a68ac5c))
* Update: Change Drawer to use react-testing-library ([e1af925](https://github.com/wtw-im/es-components/commit/e1af925))
* Update: Change DropDown to use react-testing-library ([6ea6296](https://github.com/wtw-im/es-components/commit/6ea6296))
* Update: Change FieldSet tests to react-testing-library ([23edd8c](https://github.com/wtw-im/es-components/commit/23edd8c))
* Update: Change Icon to use react-testing-library ([1324807](https://github.com/wtw-im/es-components/commit/1324807))
* Update: Change Incrementer to use react-testing-library ([58ebcc2](https://github.com/wtw-im/es-components/commit/58ebcc2))
* Update: Change Menu to use react-testing-library ([239d9f4](https://github.com/wtw-im/es-components/commit/239d9f4))
* Update: Change Modal to use react-testing-library ([d6a17fd](https://github.com/wtw-im/es-components/commit/d6a17fd))
* Update: Change Notification tests to use react-testing-library ([b03b439](https://github.com/wtw-im/es-components/commit/b03b439))
* Update: Change Popover to use react-testing-library ([60c490c](https://github.com/wtw-im/es-components/commit/60c490c))
* Update: Change RadioGroup to use react-testing-library ([afbd42f](https://github.com/wtw-im/es-components/commit/afbd42f))
* Update: Change SideNav to use react-testing-library ([dbba3cf](https://github.com/wtw-im/es-components/commit/dbba3cf))
* Update: Change TabPanel to use react-testing-library ([7e43c6a](https://github.com/wtw-im/es-components/commit/7e43c6a))
* Update: Change Textbox to use react-testing-library ([0c3dadc](https://github.com/wtw-im/es-components/commit/0c3dadc))
* Update: Change Tooltip to use react-testing-library ([884dfc1](https://github.com/wtw-im/es-components/commit/884dfc1))
* Update: Remove enzyme from project ([48e342e](https://github.com/wtw-im/es-components/commit/48e342e))





## <small>18.0.3 (2018-11-09)</small>

* Build: skip version commits ([0067918](https://github.com/wtw-im/es-components/commit/0067918))
* Fix: Popover corner outline on focus removed (fixes #223) ([1982bb4](https://github.com/wtw-im/es-components/commit/1982bb4)), closes [#223](https://github.com/wtw-im/es-components/issues/223)





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
