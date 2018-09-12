Spinners will take up 100% of its container's width and height unless otherwise specified, but the content will always be an exact circle the size of the width or height, whichever is smaller.
```
<div style={{width: 100, height: 100}}>
  <Spinner />
</div>
```

Spinners can take a width and height prop that is a number that will be translated to a pixel value.
```
<div>
  <Spinner width="75" height="75" />
</div>
```

Spinners can take a width and height prop that is a pixel value.
```
<div>
  <Spinner width="65px" height="65px" />
</div>
```

Spinners can take a width and height prop that is a percentage value.
```
<div style={{width: 100, height: 100}}>
  <Spinner width="50%" />
</div>

```
