Use breadcrumbs to chain a list of items together
```
function Link({destination, name}){
  return <a href={`#${destination}`} style={{textDecorationLine: 'none'}}>{name}</a>
}

function Location({name}){
  return <span>{name}</span>
}

   <Breadcrumb className="test">
    <Link name="home" destination="bye there"/>
    <Button handleOnClick={() => alert("on my way")} styleType="accent">getting there</Button>
    <Link name="test" destination="bye"/>
    <Location name="destination"/>
  </Breadcrumb>

```