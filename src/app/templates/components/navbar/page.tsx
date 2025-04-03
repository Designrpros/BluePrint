"use client"

import styled from "styled-components";
import { projects } from "@/data/projects";

// Define the Project type
type Project = {
  name: string;
  category: string;
  components: string[];
  url: string;
};

// Styled Components with Adjusted Design

const ProjectComponentContainer = styled.div`
  min-height: 100vh;
  background-color: white;
`;

const Header = styled.header`
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
  @media (min-width: 640px) {
    font-size: 2rem;
  }
  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
  max-width: 48rem;
  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const ProjectComponentSection = styled.section`
  position: relative;
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }

  /* Diagonal line pattern on the edges */
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50px;
    background-repeat: repeat;
    background-size: 20px 20px;
    opacity: 0.08;
    pointer-events: none;
    background-image: linear-gradient(
        135deg,
        #e5e7eb 1px,
        transparent 1px,
        transparent 50%,
        #e5e7eb 50%,
        #e5e7eb 51%,
        transparent 51%,
        transparent
      ),
      linear-gradient(
        45deg,
        #e5e7eb 1px,
        transparent 1px,
        transparent 50%,
        #e5e7eb 50%,
        #e5e7eb 51%,
        transparent 51%,
        transparent
      );
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const BlueprintGrid = styled.div`
  position: absolute;
  inset: 0;
  background-repeat: repeat;
  background-size: 20px 20px;
  opacity: 0.08;
  pointer-events: none;
  background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
`;

const ProjectComponentContent = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #9ca3af;
  border-radius: 0;
  padding: 1.5rem;
`;

const ComponentWrapper = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled component for the Navbar
const StyledNavbar = styled.nav`
  width: 100%;
  padding: 1rem;
  background-color: #1f2937;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// ProjectComponentPage Component for Navbar

export default function NavbarPage({ params }: { params: { projectName: string } }) {
  // Find the project based on projectName from the URL params
  const selectedProject = projects.find(
    (project) => project.name.toLowerCase().replace(/\s/g, "-") === params.projectName
  ) || projects[0]; // Fallback to first project if not found

  return (
    <>
      <ProjectComponentContainer>
        <Header>
          <HeaderContent>
            <Title>Navbar in {selectedProject.name}</Title>
            <Description>
              Below is a preview of the Navbar component as used in the {selectedProject.name} project.
            </Description>
          </HeaderContent>
        </Header>

        <ProjectComponentSection>
          <BlueprintGrid />
          <ProjectComponentContent>
            <ComponentWrapper>
              <StyledNavbar>
                <span>Logo</span>
                <span>Menu</span>
              </StyledNavbar>
            </ComponentWrapper>
          </ProjectComponentContent>
        </ProjectComponentSection>
      </ProjectComponentContainer>
    </>
  );
}