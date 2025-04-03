"use client"

import Link from "next/link";
import styled from "styled-components";
import { projects } from "@/data/projects";

// Styled Components with Adjusted Design

const ShowcaseContainer = styled.div`
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

const ShowcaseSection = styled.section`
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

const ShowcaseContent = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #9ca3af;
  border-radius: 0; /* Removed rounded borders */
  padding: 1.5rem;
`;

const ProjectGrid = styled.div`
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

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #9ca3af;
  border-radius: 0; /* Removed rounded borders */
  position: relative;
  background-color: white;

  &:hover {
    background-color: #f3f4f6; /* Gray hover effect background */
  }
`;

const ProjectLinkWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const IframeContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 0; /* Removed rounded borders */
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

const ProjectIframe = styled.iframe`
  width: 100% !important;
  height: 100% !important;
  border: none;
  border-radius: 0; /* Removed rounded borders */
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d1d5db;
  margin: 0.75rem 0;
`;

const ProjectInfo = styled.div`
  padding: 0.5rem;
`;

const ProjectName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
`;

const ProjectCategory = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.25;
`;

// ShowcasePage Component

export default function ShowcasePage() {
  return (
    <ShowcaseContainer>
      <Header>
        <HeaderContent>
          <Title>My Project Showcase</Title>
          <Description>
            A collection of projects I’ve built, showcasing a range of
            applications from community initiatives to professional portfolios.
            Explore the components of each project below.
          </Description>
        </HeaderContent>
      </Header>

      <ShowcaseSection>
        <BlueprintGrid />
        <ShowcaseContent>
          <ProjectGrid>
            {projects.map((project, index) => (
              <ProjectCard key={index}>
                {index % 3 !== 2 }
                <Link
                  href={`/showcase/${project.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <ProjectLinkWrapper>
                    <IframeContainer>
                      <ProjectIframe
                        src={project.url}
                        title={project.name}
                        loading="lazy"
                      />
                    </IframeContainer>
                    <Divider />
                    <ProjectInfo>
                      <ProjectName>{project.name}</ProjectName>
                      <ProjectCategory>{project.category}</ProjectCategory>
                    </ProjectInfo>
                  </ProjectLinkWrapper>
                </Link>
              </ProjectCard>
            ))}
          </ProjectGrid>
        </ShowcaseContent>
      </ShowcaseSection>
    </ShowcaseContainer>
  );
}