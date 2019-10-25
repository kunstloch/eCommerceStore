import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Navi = styled.nav`
  color: #523924;
  top: 30px;
  position: fixed;
  right: 20px;
  list-style-type: none;
`;

const links = [
  { href: '/', label: 'Home' },
  { href: '/cart', label: 'Cart' }
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

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </Navi>
);

export default Nav;
