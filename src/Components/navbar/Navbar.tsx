import React from "react";
import styled from "styled-components";
import { FiSearch, FiSettings, FiBell } from "react-icons/fi";
import logo from "../../assets/logo.png"; // Replace with actual path
import Picture from "../../assets/Picture.png"; // Replace with actual path

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 24px;
  background-color:black;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const LeftSection = styled.div`
display: flex;
align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;




`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f9fb;
  padding: 8px 12px;
  border-radius: 9999px;
  min-width: 240px;

  svg {
    margin-right: 8px;
    color: #a0aec0;
  }

  input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    font-size: 14px;
    color: #4a5568;
  }
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  background-color: #f7f9fb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Navbar: React.FC = () => {
  return (
    <>
      <NavbarContainer>
        <LeftSection>
          <Logo>
            <img src={logo} alt="logo" /> {/* Replace with actual icon */}
          </Logo>
        </LeftSection>

        <RightSection>
          <SearchBar>
            <FiSearch size={26} />
            <input type="text" placeholder="Search for something" />
          </SearchBar>

          <IconWrapper>
            <FiSettings size={18} />
          </IconWrapper>

          <IconWrapper>
            <FiBell size={18} color="#f56565" />
          </IconWrapper>

          <Avatar src={Picture} alt="profile" />
        </RightSection>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
