import React from 'react';

import { useNavigation } from '../useNavigation';
import { useNavigationItem } from '../useNavigationItem';

const Navigation = useNavigation('vertical');

function SideNav(props) {
  return <Navigation {...props} />;
}

SideNav.Item = useNavigationItem('vertical');

export default SideNav;
