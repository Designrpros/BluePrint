"use client"

import styled from "styled-components";

// Styled Components for the Sidebar

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem;
  position: fixed;
  top: 64px; /* Start exactly below the navbar (h-16 = 64px) */
  height: calc(100vh - 64px); /* Span the full viewport height minus the navbar */
  overflow-y: auto;
  z-index: 10; /* Ensure sidebar is above content on mobile */
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 200px;
    transform: translateX(-100%); /* Hide sidebar off-screen on mobile */
    &.open {
      transform: translateX(0); /* Show sidebar when open */
    }
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const SidebarLink = styled.a<{ $isActive: boolean }>`
  display: block;
  padding: 0.25rem 0;
  font-size: 0.875rem;
  color: #4b5563;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: ${(props) => (props.$isActive ? "700" : "400")};

  &:hover {
    color: #9d845d; /* Use brown color for hover */
  }
`;

const SidebarToggle = styled.button`
  display: none;
  position: fixed;
  top: 80px; /* Below the navbar */
  left: 1rem;
  z-index: 20;
  background-color: #9d845d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a6644;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

interface SidebarProps {
  activeSection: string | null;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ activeSection, isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      <SidebarToggle onClick={toggleSidebar}>
        {isOpen ? "Close" : "Menu"}
      </SidebarToggle>
      <SidebarContainer className={isOpen ? "open" : ""}>
        <SidebarTitle>Commands</SidebarTitle>
        <SidebarLink href="#commands-introduction" $isActive={activeSection === "commands-introduction"}>
          Introduction
        </SidebarLink>
        <SidebarLink href="#create-project" $isActive={activeSection === "create-project"}>
          Create a Project
        </SidebarLink>
        <SidebarLink href="#development-commands" $isActive={activeSection === "development-commands"}>
          Development Commands
        </SidebarLink>
        <SidebarLink href="#build-deploy-commands" $isActive={activeSection === "build-deploy-commands"}>
          Build & Deploy Commands
        </SidebarLink>
        <SidebarLink href="#troubleshooting-commands" $isActive={activeSection === "troubleshooting-commands"}>
          Troubleshooting Commands
        </SidebarLink>
      </SidebarContainer>
    </>
  );
}