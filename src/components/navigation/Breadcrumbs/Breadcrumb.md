Use breadcrumbs to chain a list of items together
```

function Link({destination, name}){
  return <a href={`#${destination}`} style={{textDecorationLine: 'none'}}>{name}</a>
}

function Button({action, name}){
  return <button onClick={action}>{name}</button>
}

function Location({name}){
  return <span>{name}</span>
}

   <Breadcrumb breadcrumbClasses="test">
    <Link name="home" destination="bye there"/>
    <Button name="gettting there" action={() => alert("on my way")} />
    <Link name="test" destination="bye"/>
    <Location name="destination"/>
  </Breadcrumb>

```