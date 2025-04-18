import  { useState } from "react";
import { CDBSidebar, CDBSidebarHeader, CDBSidebarContent } from "cdbreact";
import { Nav } from "react-bootstrap";
import { IoIosFootball } from "react-icons/io";
import { TbPlayFootball } from "react-icons/tb";
import { MdQuiz } from "react-icons/md";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled Components
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const StyledNavLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  color: #333;
  
  text-decoration: none;
  padding: 10px 15px 10px 10px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background-color: #ddd;
    color: #000;
  }

  &.active {
    background-color: #bbb;
    font-weight: bold;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
  margin-bottom: 12px;
  font-size: 48px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.collapsed ? "center" : "space-between")};
  padding: 10px;
`;

const ToggleIcon = styled.span`
  cursor: pointer;
  font-size: 24px;
  color: white;
  margin-left: 1rem;
`;



const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <CDBSidebar textColor="#333" backgroundColor="black" collapsed={collapsed}>
      <CDBSidebarHeader>
        <ToggleWrapper collapsed={collapsed}>
          <ToggleIcon onClick={toggleSidebar}>
            <i className="fa fa-bars" />
          </ToggleIcon>
        
        </ToggleWrapper>
      </CDBSidebarHeader>

      <CDBSidebarContent>
        <Nav>
          <List>
            <ListItem>
              <StyledNavLink to="/">Dashboard</StyledNavLink>
            </ListItem>
            <ListItem>
              <StyledNavLink to="/equipe">Equipe</StyledNavLink>
            </ListItem>
            <ListItem>
              <StyledNavLink to="/match">
                <Icon>
                  <IoIosFootball />
                </Icon>
                {!collapsed && "Match"}
              </StyledNavLink>
            </ListItem>
            <ListItem>
              <StyledNavLink to="/joueur">
                <Icon>
                  <TbPlayFootball />
                </Icon>
                {!collapsed && "Joueur"}
              </StyledNavLink>
            </ListItem>
            <ListItem>
              <StyledNavLink to="/quiz">
                <Icon>
                  <MdQuiz />
                </Icon>
                {!collapsed && "Quiz"}
              </StyledNavLink>
            </ListItem>
          </List>
        </Nav>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default Sidebar;
