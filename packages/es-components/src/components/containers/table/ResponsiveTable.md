`ResponsiveTable` will adapt its layout for smaller screens. You'll also need to add `data-label='[column name]'` on table cells to associate them with column names. Accepts all `Table` props.

### Responsive Table

```
<ResponsiveTable hasStripes>
  <thead>
    <Table.Row>
      <Table.HeaderCell scope="col">Name</Table.HeaderCell>
      <Table.HeaderCell scope="col">Age</Table.HeaderCell>
      <Table.HeaderCell scope="col">Height</Table.HeaderCell>
    </Table.Row>
  </thead>
  <tbody>
    <Table.Row>
      <Table.Cell scope="row" data-label="Name">Bill</Table.Cell>
      <Table.Cell data-label="Age">33</Table.Cell>
      <Table.Cell data-label="Height">5'4"</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell scope="row" data-label="Name">Robin</Table.Cell>
      <Table.Cell data-label="Age">20</Table.Cell>
      <Table.Cell data-label="Height">5'9"</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell scope="row" data-label="Name">Thomas</Table.Cell>
      <Table.Cell data-label="Age">45</Table.Cell>
      <Table.Cell data-label="Height">5'11"</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell scope="row" data-label="Name">Michael</Table.Cell>
      <Table.Cell data-label="Age">40</Table.Cell>
      <Table.Cell data-label="Height">6'</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell scope="row" data-label="Name">Noah</Table.Cell>
      <Table.Cell data-label="Age">24</Table.Cell>
      <Table.Cell data-label="Height">5'7"</Table.Cell>
    </Table.Row>
  </tbody>
</ResponsiveTable>
```
