import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Navi = styled.nav`
  color: #523924;

  margin-right: 15px;

  ul {
    text-decoration: none;
  }
  li {
    display: inline;
    list-style-type: none;
    margin: 0 10px;
  }

  a {
    text-decoration: none;
    color: #523924;
    font-weight: bold;
    text-decoration: underline;
    font-size: 16px;
  }
`;

const links = [
  { href: '/', label: 'Home' },
  { href: '/cart', label: 'Einkaufswagen' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <Navi>
    <ul>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  </Navi>
);

export default Nav;
