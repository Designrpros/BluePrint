"use client"

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { projects } from "@/data/projects";
import { libraryComponents } from "@/data/libraryComponents";

// Define the Project type
type Project = {
  name: string;
  category: string;
  components: string[];
  url: string;
};

// Styled Components with Adjusted Design

const LibraryContainer = styled.div`
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

const ToggleButton = styled.button`
  background-color: #e5e7eb;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #1f2937;
  cursor: pointer;
  margin: 1rem 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1d5db;
  }
`;

const IframeContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 0;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  margin-bottom: 1.5rem;
`;

const ComponentIframe = styled.iframe`
  width: 100% !important;
  height: 100% !important;
  border: none;
  border-radius: 0;
`;

const LibrarySection = styled.section`
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

const LibraryContent = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #9ca3af;
  border-radius: 0;
  padding: 1.5rem;
`;

const CategorySection = styled.div`
  margin-bottom: 2rem;
`;

const CategoryHeader = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 0.5rem;
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ComponentCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #9ca3af;
  border-radius: 0;
  position: relative;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    background-color: #f3f4f6;
  }
`;

const VerticalSeparator = styled.div`
  position: absolute;
  right: -0.75rem;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #9ca3af;
  opacity: 0.5;
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

const ComponentLinkWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ComponentInfo = styled.div`
  padding: 0.5rem;
`;

const ComponentName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
`;

const ComponentDescription = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.25;
`;

// ComponentsLibraryPage Component

export default function ComponentsLibraryPage({ params }: { params: { projectName: string } }) {
  const [isIframeVisible, setIsIframeVisible] = useState(false);

  // Find the project based on projectName from the URL params
  const selectedProject = projects.find(
    (project) => project.name.toLowerCase().replace(/\s/g, "-") === params.projectName
  ) || projects[0]; // Fallback to first project if not found

  const toggleIframe = () => {
    setIsIframeVisible((prev) => !prev);
  };

  return (
    <LibraryContainer>
      <Header>
        <HeaderContent>
          <Title>Components Library - {selectedProject.name}</Title>
          <Description>
            Explore the reusable UI components in our library, categorized for web development needs. Toggle the preview to see the selected project in action.
          </Description>
          <ToggleButton onClick={toggleIframe}>
            {isIframeVisible ? "Hide Project Demo" : "Show Project Demo"}
          </ToggleButton>
          {isIframeVisible && (
            <IframeContainer>
              <ComponentIframe
                src={selectedProject.url}
                title={`${selectedProject.name} Demo`}
                loading="lazy"
              />
            </IframeContainer>
          )}
        </HeaderContent>
      </Header>

      <LibrarySection>
        <BlueprintGrid />
        <LibraryContent>
          {libraryComponents.map((category, catIndex) => (
            <CategorySection key={catIndex}>
              <CategoryHeader>{category.category}</CategoryHeader>
              <ComponentGrid>
                {category.components.map((component, compIndex) => (
                  <ComponentCard key={compIndex}>
                    {compIndex % 3 !== 2 && <VerticalSeparator />}
                    <Link
                      href={`/showcase/${params.projectName}/${component.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <ComponentLinkWrapper>
                        <ComponentInfo>
                          <ComponentName>{component.name}</ComponentName>
                          <ComponentDescription>{component.description}</ComponentDescription>
                        </ComponentInfo>
                      </ComponentLinkWrapper>
                    </Link>
                  </ComponentCard>
                ))}
              </ComponentGrid>
            </CategorySection>
          ))}
        </LibraryContent>
      </LibrarySection>
    </LibraryContainer>
  );
}