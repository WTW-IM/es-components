`ResponsiveTable` will adapt a column-based table layout for smaller screens. You'll also need to add `data-label='[column name]'` on a `th` in each row to associate them with column names. Accepts all `Table` props.

Due to the way ResponsiveTable hides the normal `thead` on small screens and displays each row in its own block,
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
      <th scope="row" data-label="Name">Bill</th>
      <td data-label="Age">33</td>
      <td data-label="Height">5'4"</td>
    </tr>
    <tr>
      <th scope="row" data-label="Name">Robin</th>
      <td data-label="Age">20</td>
      <td data-label="Height">5'9"</td>
    </tr>
    <tr>
      <th scope="row" data-label="Name">Thomas</th>
      <td data-label="Age">45</td>
      <td data-label="Height">5'11"</td>
    </tr>
    <tr>
      <th scope="row" data-label="Name">Michael</th>
      <td data-label="Age">40</td>
      <td data-label="Height">6'</td>
    </tr>
    <tr>
      <th scope="row" data-label="Name">Noah</th>
      <td data-label="Age">24</td>
      <td data-label="Height">5'7"</td>
    </tr>
  </tbody>
</ResponsiveTable>
```
