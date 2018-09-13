Spinners can be sized how you like, but their contents will always be an exact circle.

Here are some examples, but they are not the only possibilities. You can use
inline styles, CSS, or even styled components to get the job done!

They can be sized to the outer container:
```
<div style={{width: 100, height: 100}}>
  <Spinner />
</div>
```

You can manually set width and height:
```
<div>
  <Spinner width="65px" height="65px" />
</div>
```


You can set the size based on a percentage:
```
<div style={{width: 100, height: 100}}>
  <Spinner width="50%" />
</div>

```
