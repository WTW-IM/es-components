import React from 'react';

export const orientations = ['stacked', 'inline'] as const;
export type Orientation = (typeof orientations)[number];
export default React.createContext<Orientation>('stacked');
