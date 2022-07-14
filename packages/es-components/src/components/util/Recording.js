// https://help.fullstory.com/hc/en-us/articles/360020623574-How-do-I-protect-my-users-privacy-in-FullStory

import { Children, cloneElement } from 'react';
import styled from 'styled-components';

const classNameMap = {
  excluded: 'fs-exclude',
  masked: 'fs-mask',
  unmasked: 'fs-unmask'
};

export const FULLSTORY_FILTER_TYPE = {
  excluded: 'excluded',
  masked: 'masked',
  unmasked: 'unmasked'
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(' ') || '';
}

function addClassNameToChildren(children, type, props = {}) {
  return Children.map(children, child =>
    cloneElement(child, {
      ...(props ?? {}),
      className: joinClassNames(child.props?.className, classNameMap[type])
    })
  );
}

export function withRecording(WrappedComponent, type) {
  // eslint-disable-next-line react/display-name
  return ({ children, className, ...props }) => {
    // eslint-disable-next-line no-param-reassign
    WrappedComponent.displayName = `${type}WithRecording(${getDisplayName(WrappedComponent)})`;
    return (
      <WrappedComponent className={joinClassNames(className, classNameMap[type])} {...props}>
        {children}
      </WrappedComponent>
    );
  };
}

// HOCs

/**
 * Exclusion applies to all child elements, it is not possible to Mask or Unmask the child of an excluded element
 */
export function withRecordingExcluded(WrappedComponent, props = {}) {
  return withRecording(WrappedComponent, FULLSTORY_FILTER_TYPE.excluded, props);
}

export function withRecordingMasked(WrappedComponent, props = {}) {
  return withRecording(WrappedComponent, FULLSTORY_FILTER_TYPE.masked, props);
}

export function withRecordingUnmasked(WrappedComponent, props = {}) {
  return withRecording(WrappedComponent, FULLSTORY_FILTER_TYPE.unmasked, props);
}

// Adds all siblings only

/**
 * Adds fullstory className to all children first level (not recursive). Does not produce a wrapper / container div.
 * Exclusion applies to all child elements, it is not possible to Mask or Unmask the child of an excluded element
 */
export function RecordingExclude({ children, ...rest }) {
  return <>{addClassNameToChildren(children, FULLSTORY_FILTER_TYPE.excluded, rest)}</>;
}

export function RecordingMasked({ children, ...rest }) {
  return <>{addClassNameToChildren(children, FULLSTORY_FILTER_TYPE.masked, rest)}</>;
}

export function RecordingUnmasked({ children, ...rest }) {
  return <>{addClassNameToChildren(children, FULLSTORY_FILTER_TYPE.unmasked, rest)}</>;
}

// Containers

/**
 * DIV container
 * Exclusion applies to all child elements, it is not possible to Mask or Unmask the child of an excluded element
 */
export const RecordingExcludedContainer = styled.div.attrs(() => ({
  className: classNameMap[FULLSTORY_FILTER_TYPE.excluded]
}))('');

export const RecordingMaskedContainer = styled.div.attrs(() => ({
  className: classNameMap[FULLSTORY_FILTER_TYPE.masked]
}))('');

export const RecordingUnmaskedContainer = styled.div.attrs(() => ({
  className: classNameMap[FULLSTORY_FILTER_TYPE.unmasked]
}))('');

export const RecordingExcludedElement = styled.span.attrs(() => ({
  className: classNameMap[FULLSTORY_FILTER_TYPE.excluded]
}))('');

export const RecordingMaskedElement = styled.span.attrs(() => ({
  className: classNameMap[FULLSTORY_FILTER_TYPE.masked]
}))('');

export const RecordingUnmaskedElement = styled.span.attrs(() => ({
  className: classNameMap[FULLSTORY_FILTER_TYPE.unmasked]
}))('');
