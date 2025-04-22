import { useState, useEffect } from "react";
import { CDBSidebar, CDBSidebarHeader, CDBSidebarContent } from "cdbreact";
import { Nav } from "react-bootstrap";
import { IoIosFootball } from "react-icons/io";
import { TbPlayFootball } from "react-icons/tb";
import { MdQuiz, MdDashboard, MdGroup } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import styled from "styled-components";
import { Link } from "react-router-dom";


interface SidebarWrapperProps {
  collapsed: boolean;
}

interface IconProps {
  collapsed: boolean;
  isMobile: boolean;
}

interface OverlayProps {
  show: boolean;
  collapsed: boolean;
}

interface ToggleProps {
  collapsed: boolean;
}


const SidebarWrapper = styled(CDBSidebar)<SidebarWrapperProps>`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s;
  width: ${(props) => (props.collapsed ? "80px" : "250px")} !important;
  min-width: ${(props) => (props.collapsed ? "80px" : "250px")} !important;
  z-index: 1000;

  & * {
    box-sizing: border-box;
  }

  & .pro-sidebar {
    min-width: ${(props) => (props.collapsed ? "80px" : "250px")} !important;
    width: ${(props) => (props.collapsed ? "80px" : "250px")} !important;
  }

  @media (max-width: 768px) {
    width: ${(props) => (props.collapsed ? "0" : "250px")} !important;
    min-width: ${(props) => (props.collapsed ? "0" : "250px")} !important;
    transform: translateX(${(props) => (props.collapsed ? "-100%" : "0")});

    & .pro-sidebar {
      min-width: ${(props) => (props.collapsed ? "0" : "250px")} !important;
      width: ${(props) => (props.collapsed ? "0" : "250px")} !important;
    }
  }
`;

const SidebarHeaderWrapper = styled(CDBSidebarHeader)`
  padding: 15px;
  background: #2c3e50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ContentWrapper = styled(CDBSidebarContent)`
  padding-top: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
  width: 100%;
`;

const StyledNavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #f8f9fa;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 4px;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &.active {
    background-color: #4e73df;
    color: white;
    font-weight: bold;
  }
`;

const Icon = styled.span<IconProps>`
  margin-right: ${(props) =>
    props.collapsed && !props.isMobile ? "0" : "12px"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  min-width: 24px;
`;

const LinkText = styled.span<IconProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${(props) =>
    props.collapsed && !props.isMobile ? "none" : "block"};
`;

const ToggleIcon = styled.div`
  cursor: pointer;
  font-size: 40px;
  display: flex;
  align-items: center;
  color: #f8f9fa;
`;

const MobileOverlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${(props) => (props.show && !props.collapsed ? "block" : "none")};

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileToggle = styled.div<ToggleProps>`
  position: fixed;
  top: 80px;
  left: 15px;
  z-index: 998;
  background-color: #2c3e50;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  display: none;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    display: ${(props) => (props.collapsed ? "flex" : "none")};
  }
`;


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (mobile && !isMobile) {
        setCollapsed(true);
      }

      if (!mobile && isMobile && collapsed) {
        setCollapsed(false);
      }
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, [isMobile, collapsed]);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <>
      {isMobile && (
        <MobileToggle collapsed={collapsed} onClick={toggleSidebar}>
          <HiMenuAlt2 size={24} />
        </MobileToggle>
      )}

      <MobileOverlay
        show={isMobile}
        collapsed={collapsed}
        onClick={toggleSidebar}
      />

      <SidebarWrapper
        textColor="red"
        backgroundColor="#2c3e50"
        collapsed={collapsed}
      >
        <SidebarHeaderWrapper>
          <ToggleIcon onClick={toggleSidebar}>
            <HiMenuAlt2 />
          </ToggleIcon>
        </SidebarHeaderWrapper>

        <ContentWrapper>
          <Nav className="w-100">
            <List>
              {[
                { to: "/", icon: <MdDashboard />, label: "Dashboard" },
                { to: "/equipe", icon: <MdGroup />, label: "Equipe" },
                { to: "/match", icon: <IoIosFootball />, label: "Match" },
                { to: "/joueur", icon: <TbPlayFootball />, label: "Joueur" },
                { to: "/quiz", icon: <MdQuiz />, label: "Quiz" },
              ].map(({ to, icon, label }) => (
                <ListItem key={to}>
                  <StyledNavLink to={to}>
                    <Icon collapsed={collapsed} isMobile={isMobile}>
                      {icon}
                    </Icon>
                    <LinkText collapsed={collapsed} isMobile={isMobile}>
                      {label}
                    </LinkText>
                  </StyledNavLink>
                </ListItem>
              ))}
            </List>
          </Nav>
        </ContentWrapper>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
