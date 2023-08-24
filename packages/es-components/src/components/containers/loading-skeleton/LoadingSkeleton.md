The Loading Skeleton component is used to represent something in the process of
being loaded. It is made up of shapes which will have a shimmer effect to
represent the idea of loading. You can pass `shapeColor` and `shimmerColor`
props to control the colors of the output. By default, the `shapeColor` is
`theme.colors.gray3`, and `shimmerColor` is `theme.colors.white`.

A `LoadingSkeleton` consists of two basic pieces:

1. `LoadingSkeleton`, which is a container that can be styled as necessary for
   your purposes. Its background color will match the `shimmerColor` prop.
2. `LoadingSkeleton.Shape` which is a shape element that you can style to create
   the different pieces of your skeleton. This element will have the
   `shapeColor` prop as its background-color.

   The `LoadingSkeleton.Shape` utilizes the `theme` prop from styled-components
   to get the appropriate colors from `theme.skeleton`. If you'd like to use the
   skeleton colors, you can do the same in your `LoadingSkeleton`'s children by
   using this pattern:

   ```js static
   const MyShape = styled(LoadingSkeleton.Shape)`
     width: 10px;
     height: 10px;
     padding: 5px;
     border: solid 1px;
     border-color: ${({ theme }) => theme.skeleton.shapeColor};
   `;
   ```

Below, we're using a pre-fabricated "Skeleton Tile," which utilizes the pieces
of the `LoadingSkeleton` to represent a header section, some body lines, and a
call-to-action button.

[Look at the `SkeletonTile` code](https://github.com/WTW-IM/es-components/tree/main/packages/es-components/src/components/containers/loading-skeleton/SkeletonTile.tsx) for a more in-depth example.

```jsx
import SkeletonTile from './SkeletonTile.tsx';

<SkeletonTile />;
```
