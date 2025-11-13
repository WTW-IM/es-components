Simple star rating:

```
<StarRating rating={3.5} />
```
```
<StarRating rating={4} />
```
```
<StarRating rating={4.5} />
```
```
<StarRating rating={5} />
```
Poor performer:
```
<StarRating rating={4} isPoorPerformer />
```
Summarized star rating:
```
<StarRating rating={4.5} isSummarized />
```
Overwriting summarized star rating with text:
```
<StarRating rating={4} isSummarized overwriteSummaryText='Plan Too New To Be Measured' />
```
No rating available:
```
<StarRating rating={null}/>
```