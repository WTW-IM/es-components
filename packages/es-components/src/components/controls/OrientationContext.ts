import React from 'react';

export type Orientation = 'stacked' | 'inline';
export default React.createContext<Orientation>('stacked');
