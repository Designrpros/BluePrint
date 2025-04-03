"use client"

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { libraryComponents } from "@/data/libraryComponents";
import Navbar from "@/components/Navbar";

// Styled Components for the Docs Page

const DocsContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  margin: 0; /* Ensure no margin causes a gap */
`;

const Sidebar = styled.aside`
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

const SidebarCategory = styled.div`
  margin-bottom: 1.5rem;
`;

const SidebarCategoryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
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

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px; /* Offset for the fixed sidebar width */
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    margin-left: 200px;
  }

  @media (max-width: 640px) {
    margin-left: 0;
    padding: 1rem;
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

const ContentWrapper = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const ComponentList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
`;

const ComponentItem = styled.li`
  font-size: 1rem;
  color: #1f2937;
  line-height: 1.5;
  margin-bottom: 0.5rem;

  a {
    color: #9d845d; /* Use brown color for links */
    text-decoration: none;
    transition: text-decoration 0.3s ease, color 0.3s ease;

    &:hover {
      text-decoration: underline;
      color: #7a6644; /* Slightly darker brown for hover */
    }
  }
`;

const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  z-index: 0;

  /* Reuse the blueprint grid for the code block background */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-repeat: repeat;
    background-size: 20px 20px;
    opacity: 0.08;
    pointer-events: none;
    background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
    z-index: 0;
  }
`;

const CodeBlockContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: #9d845d; /* Use brown color for the button */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a6644; /* Slightly darker brown for hover */
  }
`;

// Docs Page Component
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Set up IntersectionObserver to detect which section is in view
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -50% 0px" } // Adjust to detect when section is near the top
    );

    // Observe all sections and component items
    const sections = document.querySelectorAll("section[id]");
    const componentItems = document.querySelectorAll("li[id]");
    sections.forEach((section) => observer.current?.observe(section));
    componentItems.forEach((item) => observer.current?.observe(item));

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section));
      componentItems.forEach((item) => observer.current?.unobserve(item));
      observer.current?.disconnect();
    };
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy code: ", err);
    });
  };

  return (
    <>
      <Navbar />
      <DocsContainer>
        {/* Sidebar */}
        <Sidebar>
          <SidebarTitle>Documentation</SidebarTitle>
          {libraryComponents.map((category, index) => (
            <SidebarCategory key={index}>
              <SidebarCategoryTitle>{category.category}</SidebarCategoryTitle>
              {category.components.map((component, compIndex) => {
                const sectionId = component.name.toLowerCase().replace(/\s/g, "-");
                return (
                  <SidebarLink
                    key={compIndex}
                    href={`#${sectionId}`}
                    $isActive={activeSection === sectionId}>
                    {component.name}
                  </SidebarLink>
                );
              })}
            </SidebarCategory>
          ))}
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          <BlueprintGrid />
          <ContentWrapper>
            <Section id="introduction">
              <SectionTitle>Introduction</SectionTitle>
              <p>
                Welcome to the documentation for the Blueprint Component Library. This library provides a collection of reusable UI components designed with a blueprint aesthetic, featuring sharp borders and subtle line patterns. Each component is highly customizable and can be tailored to fit your project’s needs.
              </p>
            </Section>

            {libraryComponents.map((category, index) => (
              <Section key={index} id={category.category.toLowerCase().replace(/\s/g, "-")}>
                <SectionTitle>{category.category}</SectionTitle>
                <ComponentList>
                  {category.components.map((component, compIndex) => (
                    <ComponentItem
                      key={compIndex}
                      id={component.name.toLowerCase().replace(/\s/g, "-")}
                    >
                      <a href={`/templates/components/${component.name.toLowerCase().replace(/\s/g, "-")}`}>
                        {component.name}
                      </a>: {component.description}
                    </ComponentItem>
                  ))}
                </ComponentList>
              </Section>
            ))}

            <Section id="getting-started">
              <SectionTitle>Getting Started</SectionTitle>
              <p>
                To use a component in your project, you can copy its code from the component’s template page and customize it as needed. Here’s an example of how to use a component:
              </p>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton onClick={() => handleCopyCode(`
import styled from "styled-components";

const StyledButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: #9d845d;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a6644;
  }
\`;

export default function Button() {
  return <StyledButton>Click Me</StyledButton>;
}
                  `)}>
                    Copy Code
                  </CopyButton>
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{
                      marginTop: "1rem",
                      borderRadius: "4px",
                      padding: "1rem",
                      backgroundColor: "#1f2937",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {`
import styled from "styled-components";

const StyledButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: #9d845d;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a6644;
  }
\`;

export default function Button() {
  return <StyledButton>Click Me</StyledButton>;
}
                    `}
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>
            </Section>
          </ContentWrapper>
        </MainContent>
      </DocsContainer>
    </>
  );
}