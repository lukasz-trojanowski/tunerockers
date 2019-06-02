import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import GlobalContext from '../../context/context';
import SubMenu from './SubMenu';
import SubMenuItem from './SubMenuItem';
import MenuItem from './MenuItem';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid #222;
  z-index: 200;
`;

function Menu() {
  const { globalState } = useContext(GlobalContext);
  const { database } = globalState;
  
  return (
    <Nav>
      {database.map(genre => {
        let label = genre._id;
        genre._id === 'electro-electro-house' && (label = 'ELECTRO');
        genre._id === 'club-dance' && (label = 'CLUB');

        return (
          <SubMenu
            to={`/${genre._id}`}
            key={genre._id}
            label={`${label}`}>
            {genre.songs.map(year => (
              <SubMenuItem
                key={year.year}
                exact
                strict
                to={'/' + genre._id + '/' + year.year}>
                {year.year}
              </SubMenuItem>
            ))}
          </SubMenu>
        );
      })}
      <MenuItem to='/lobby' label='lobby'>
        Lobby [{globalState.lobbyDatabase.length}]
      </MenuItem>
    </Nav>
  );
}

export default withRouter(Menu);
