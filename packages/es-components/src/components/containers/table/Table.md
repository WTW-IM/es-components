### Basic Table

```jsx
<Table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bill</td>
      <td>33</td>
    </tr>
    <tr>
      <td>Robin</td>
      <td>20</td>
    </tr>
    <tr>
      <td>Thomas</td>
      <td>45</td>
    </tr>
    <tr>
      <td>Michael</td>
      <td>40</td>
    </tr>
    <tr>
      <td>Noah</td>
      <td>24</td>
    </tr>
  </tbody>
</Table>
```

```jsx
<Table>
  <caption>Row-based table headings</caption>
  <tbody>
    <tr>
      <th scope="row">Name</th>
      <td>Rufus</td>
    </tr>
    <tr>
      <th scope="row">Age</th>
      <td>43</td>
    </tr>
    <tr>
      <th scope="row">Height</th>
      <td>5'11"</td>
    </tr>
  </tbody>
</Table>
```

### Other Options

Condensed Table With Hover:

```jsx
<Table hasHover isCondensed>
  <caption>Condensed Table with Hover</caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bill</td>
      <td>33</td>
    </tr>
    <tr>
      <td>Robin</td>
      <td>20</td>
    </tr>
    <tr>
      <td>Thomas</td>
      <td>45</td>
    </tr>
  </tbody>
</Table>
```

Roomy Table With Stripes:

```jsx
<Table hasStripes isRoomy>
  <caption>Roomy Table with Stripes</caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bill</td>
      <td>33</td>
    </tr>
    <tr>
      <td>Robin</td>
      <td>20</td>
    </tr>
    <tr>
      <td>Thomas</td>
      <td>45</td>
    </tr>
  </tbody>
</Table>
```
