import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: var(--header-color);
  display: flex;
`;

const NavWrapper = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 22px;
`;

const NavItem = styled.li`
  list-style: none;
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }

  a {
    transition: all 0.2s ease-in-out;
    color: #fff;
    text-decoration: none;
    padding: 18px 8px;
    &.selected {
      background-color: var(--bg-color);
      color: var(--header-color);
    }
  }
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <NavWrapper>
        <NavItem>
          <NavLink to="/" exact activeClassName="selected">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/editor" activeClassName="selected">
            Visual Editor
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/animations" activeClassName="selected">
            Animation Playground
          </NavLink>
        </NavItem>
      </NavWrapper>
    </HeaderWrapper>
  );
};
