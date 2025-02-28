/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'prop-types' {
  import React from 'react';
  import { Requireable, default as OrigPropTypes } from '@types/prop-types';
  export * from '@types/prop-types';
  type NewNode = Requireable<React.ReactNode>;

  const PropTypes: Override<
    typeof OrigPropTypes,
    {
      node: NewNode;
    }
  >;
  // copy the original PropTypes namespace
  namespace PropTypes {
    type Validator<T> = OrigPropTypes.Validator<T>;
    type ValidationMap<T> = OrigPropTypes.ValidationMap<T>;
    type Requireable<T> = OrigPropTypes.Requireable<T>;
    type ReactComponentLike = OrigPropTypes.ReactComponentLike;
    type ReactElementLike = OrigPropTypes.ReactElementLike;
    interface ReactNodeArray extends OrigPropTypes.ReactNodeArray {}
    type AwaitedReactNodeLike = OrigPropTypes.AwaitedReactNodeLike;
    type ReactNodeLike = OrigPropTypes.ReactNodeLike;
    type IsOptional<T> = OrigPropTypes.IsOptional<T>;
    type RequiredKeys<V> = OrigPropTypes.RequiredKeys<V>;
    type OptionalKeys<V> = OrigPropTypes.OptionalKeys<V>;
    type InferPropsInner<V> = OrigPropTypes.InferPropsInner<V>;
    interface Validator<T> extends OrigPropTypes.Validator<T> {}
    interface Requireable<T> extends OrigPropTypes.Requireable<T> {}
    type ValidationMap<T> = OrigPropTypes.ValidationMap<T>;
    type WeakValidationMap<T> = OrigPropTypes.WeakValidationMap<T>;
    type InferType<V> = OrigPropTypes.InferType<V>;
    type InferProps<V> = OrigPropTypes.InferProps<V>;
  }

  export = PropTypes;
}
