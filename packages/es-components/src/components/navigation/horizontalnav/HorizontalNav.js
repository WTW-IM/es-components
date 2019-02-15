import React from 'react';

import { useNavigation } from '../useNavigation';
import { useNavigationItem } from '../useNavigationItem';

const Navigation = useNavigation('horizontal');

function HorizontalNav(props) {
  return <Navigation {...props} />;
}

HorizontalNav.Item = useNavigationItem('horizontal');

export default HorizontalNav;
