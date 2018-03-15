Use `Breadcrumb` to chain a list of items together. The last element, if not a
link, will be styled differently to denote the user's current location.
```
<Breadcrumb className="test">
  <a href="#home">Home</a>
  <a href="#gettingthere">On Our Way</a>
  <a href="#test">Getting There</a>
  <span>Destination</span>
</Breadcrumb>
```
