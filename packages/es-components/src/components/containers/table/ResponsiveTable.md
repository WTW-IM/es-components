`ResponsiveTable` will adapt a column-based table layout for smaller screens. You'll also need to add `data-label='[column name]'` on table cells to associate them with column names. Accepts all `Table` props.

Due to the way ResponsiveTable hides the normal `thead` on small screens and displays each column in its own block,
row-based table headings don't work well with this component.

### Responsive Table

```
<ResponsiveTable hasStripes>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Height</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row" data-label="Name">Bill</td>
      <td data-label="Age">33</td>
      <td data-label="Height">5'4"</td>
    </tr>
    <tr>
      <td scope="row" data-label="Name">Robin</td>
      <td data-label="Age">20</td>
      <td data-label="Height">5'9"</td>
    </tr>
    <tr>
      <td scope="row" data-label="Name">Thomas</td>
      <td data-label="Age">45</td>
      <td data-label="Height">5'11"</td>
    </tr>
    <tr>
      <td scope="row" data-label="Name">Michael</td>
      <td data-label="Age">40</td>
      <td data-label="Height">6'</td>
    </tr>
    <tr>
      <td scope="row" data-label="Name">Noah</td>
      <td data-label="Age">24</td>
      <td data-label="Height">5'7"</td>
    </tr>
  </tbody>
</ResponsiveTable>
```
