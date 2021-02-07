/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useState, useEffect, useContext } from 'react';
import AppContext from '../../components/AppContext';
import clsx from 'clsx';
import SearchBar from '@theme/SearchBar';
import Toggle from '@theme/Toggle';
import useThemeContext from '@theme/hooks/useThemeContext';
import { useThemeConfig } from '@docusaurus/theme-common';
import useHideableNavbar from '@theme/hooks/useHideableNavbar';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import useWindowSize, { windowSizes } from '@theme/hooks/useWindowSize';
import NavbarItem from '@theme/NavbarItem';
import Logo from '@theme/Logo';
import IconMenu from '@theme/IconMenu';
import styles from './styles.module.css'; // retrocompatible with v1

const DefaultNavItemPosition = 'right'; // If split links by left/right
// if position is unspecified, fallback to right (as v1)

function splitNavItemsByPosition(items) {
  const leftItems = items.filter(item => (item.position ?? DefaultNavItemPosition) === 'left');
  const rightItems = items.filter(item => (item.position ?? DefaultNavItemPosition) === 'right');
  return {
    leftItems,
    rightItems
  };
}

function Navbar() {
  const { userdata, setUserdata } = useContext(AppContext);
  const logout = () => {
    setUserdata({ loggedIn: false });
  }

  const {
    navbar: {
      items,
      hideOnScroll,
      style
    },
    colorMode: {
      disableSwitch: disableColorModeSwitch
    }
  } = useThemeConfig();
  const [sidebarShown, setSidebarShown] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const {
    isDarkTheme,
    setLightTheme,
    setDarkTheme
  } = useThemeContext();
  const {
    navbarRef,
    isNavbarVisible
  } = useHideableNavbar(hideOnScroll);
  useLockBodyScroll(sidebarShown);
  const showSidebar = useCallback(() => {
    setSidebarShown(true);
  }, [setSidebarShown]);
  const hideSidebar = useCallback(() => {
    setSidebarShown(false);
  }, [setSidebarShown]);
  const onToggleChange = useCallback(e => e.target.checked ? setDarkTheme() : setLightTheme(), [setLightTheme, setDarkTheme]);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setSidebarShown(false);
    }
  }, [windowSize]);
  const {
    leftItems,
    rightItems
  } = splitNavItemsByPosition(items);
  return <nav ref={navbarRef} className={clsx('navbar', 'navbar--fixed-top', {
    'navbar--dark': style === 'dark',
    'navbar--primary': style === 'primary',
    'navbar-sidebar--show': sidebarShown,
    [styles.navbarHideable]: hideOnScroll,
    [styles.navbarHidden]: !isNavbarVisible
  })}>
      <div className="navbar__inner">
        <div className="navbar__items">
          {items != null && items.length !== 0 && <div aria-label="Navigation bar toggle" className="navbar__toggle" role="button" tabIndex={0} onClick={showSidebar} onKeyDown={showSidebar}>
              <IconMenu />
            </div>}
          <Logo className="navbar__brand" imageClassName="navbar__logo" titleClassName={clsx('navbar__title', {
          [styles.hideLogoText]: isSearchBarExpanded
        })} />
          {leftItems.map((item, i) => <NavbarItem {...item} key={i} />)}
        </div>
        <div className="navbar__items navbar__items--right">
          {/* Custom Links start */}
          {userdata && userdata.loggedIn ?
            <>
              {userdata.userType === 'fellow' ?
                <NavbarItem to='dashboard' label='Dashboard' position='right' /> : ''
              }
              {userdata.userType === 'admin' ?
                <NavbarItem to='admin-dashboard' label='Admin Dashboard' position='right' /> : ''
              }
              <NavbarItem to='/' label='Logout' position='right' onClick={() => logout()} />
            </>
            :
            <>
              <NavbarItem to='login' label='Login' position='right' />
            </>
          }
          
          {/* Custom Links end */}
          {rightItems.map((item, i) => <NavbarItem {...item} key={i} />)}
          {!disableColorModeSwitch && <Toggle className={styles.displayOnlyInLargeViewport} aria-label="Dark mode toggle" checked={isDarkTheme} onChange={onToggleChange} />}
          <SearchBar handleSearchBarToggle={setIsSearchBarExpanded} isSearchBarExpanded={isSearchBarExpanded} />
        </div>
      </div>
      <div role="presentation" className="navbar-sidebar__backdrop" onClick={hideSidebar} />
      <div className="navbar-sidebar">
        <div className="navbar-sidebar__brand">
          <Logo className="navbar__brand" imageClassName="navbar__logo" titleClassName="navbar__title" onClick={hideSidebar} />
          {!disableColorModeSwitch && sidebarShown && <Toggle aria-label="Dark mode toggle in sidebar" checked={isDarkTheme} onChange={onToggleChange} />}
        </div>
        <div className="navbar-sidebar__items">
          <div className="menu">
            <ul className="menu__list">
              {items.map((item, i) => <NavbarItem mobile {...item} onClick={hideSidebar} key={i} />)}
            </ul>
          </div>
        </div>
      </div>
    </nav>;
}

export default Navbar;