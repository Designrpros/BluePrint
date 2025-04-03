"use client"

import { useState } from "react";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import { MagnifyingGlassIcon, PlusIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// Global Style to Remove Body Margin and Padding
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

// Styled Components for the Navbar

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 64px; /* h-16 = 64px */
`;

const NavContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  text-decoration: none;
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: none;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 640px) {
    display: flex;
  }

  @media (max-width: 639px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background-color: #ffffff;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 20;
  }
`;

const NavLink = styled(Link)`
  color: #4b5563;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #9d845d;
  }

  @media (max-width: 639px) {
    font-size: 1rem;
    padding: 0.5rem 0;
    width: 100%;
    text-align: center;
  }
`;

const IconsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  color: #4b5563;
  transition: color 0.2s ease;

  &:hover {
    color: #9d845d;
  }
`;

const IconLink = styled.a`
  color: #4b5563;
  transition: color 0.2s ease;

  &:hover {
    color: #9d845d;
  }
`;

const GitHubLink = styled.a`
  color: #4b5563;
  transition: color 0.2s ease;

  &:hover {
    color: #9d845d;
  }
`;

const SearchPopover = styled.div`
  position: absolute;
  top: 64px;
  right: 1rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 20;

  @media (min-width: 640px) {
    right: 1.5rem;
  }
  @media (min-width: 1024px) {
    right: 2rem;
  }
`;

const SearchInput = styled.input`
  width: 16rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #1f2937;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }

  @media (max-width: 639px) {
    width: 100%; /* Full width on mobile */
  }
`;

const BurgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  transition: color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #9d845d;
  }

  @media (min-width: 640px) {
    display: none; /* Hide on larger screens */
  }
`;

// Navbar Component
export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <GlobalStyle />
      <Nav>
        <NavContainer>
          <NavContent>
            {/* Left Section: Logo */}
            <LogoSection>
              <LogoLink href="/">BluePrint</LogoLink>
            </LogoSection>

            {/* Right Section: Nav Links, Burger Icon, and Other Icons */}
            <div className="flex items-center space-x-6">
              {/* Burger Icon for Mobile */}
              <BurgerButton onClick={toggleMenu}>
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </BurgerButton>

              {/* Nav Links */}
              <NavLinks isOpen={isMenuOpen}>
                <NavLink href="/commands">Commands</NavLink>
                <NavLink href="/prompts">Prompts</NavLink>
                <NavLink href="/tutorial">Tutorial</NavLink>
                <NavLink href="/docs">Docs</NavLink>
                <NavLink href="/showcase">Showcase</NavLink>
              </NavLinks>

              {/* Icons */}
              <IconsSection>
                {/* Search Button */}
                <IconButton onClick={() => setIsSearchOpen(!isSearchOpen)}>
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </IconButton>

                {/* Plus Icon (Placeholder for additional functionality) */}
                <IconLink href="#">
                  <PlusIcon className="h-5 w-5" />
                </IconLink>

                {/* GitHub Icon */}
                <GitHubLink
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.102-.253-.446-1.268.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.202 2.393.1 2.646.64.696 1.024 1.588 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.359.31.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </GitHubLink>
              </IconsSection>
            </div>
          </NavContent>

          {/* Search Popover */}
          {isSearchOpen && (
            <SearchPopover>
              <SearchInput
                type="text"
                placeholder="Search components..."
              />
            </SearchPopover>
          )}
        </NavContainer>
      </Nav>
    </>
  );
}