# Changelog
All notable changes to this project will be documented in this file.

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