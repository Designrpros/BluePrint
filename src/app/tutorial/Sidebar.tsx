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

interface SidebarProps {
  activeSection: string | null;
}

export default function Sidebar({ activeSection }: SidebarProps) {
  return (
    <SidebarContainer>
      <SidebarTitle>Tutorial</SidebarTitle>
      <SidebarLink href="#introduction" $isActive={activeSection === "introduction"}>
        Introduction
      </SidebarLink>
      <SidebarLink href="#installation" $isActive={activeSection === "installation"}>
        Installation
      </SidebarLink>
      <SidebarLink href="#setup-for-different-frameworks" $isActive={activeSection === "setup-for-different-frameworks"}>
        Setup for Different Frameworks
      </SidebarLink>
      <SidebarLink href="#using-components" $isActive={activeSection === "using-components"}>
        Using Components
      </SidebarLink>
      <SidebarLink href="#customizing-components" $isActive={activeSection === "customizing-components"}>
        Customizing Components
      </SidebarLink>
      <SidebarLink href="#next-steps" $isActive={activeSection === "next-steps"}>
        Next Steps
      </SidebarLink>
    </SidebarContainer>
  );
}