"use client"

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "@/components/Navbar";
import Sidebar from "./Sidebar";
import CopyButton from "../tutorial/CopyButton";
import { PROMPT_EXAMPLES } from "./PromptsLibrary";

const PromptsContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  margin: 0;
  width: 100vw; /* Ensure the container fits the viewport width */
  overflow-x: hidden; /* Prevent horizontal scrolling at the container level */
`;

const MainContent = styled.main<{ isSidebarOpen: boolean }>`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  position: relative;
  transition: margin-left 0.3s ease-in-out;
  width: calc(100vw - 250px); /* Adjust width based on sidebar */
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: ${(props) => (props.isSidebarOpen ? "200px" : "0")};
    padding: 1rem;
    width: ${(props) => (props.isSidebarOpen ? "calc(100vw - 200px)" : "100vw")};
  }

@media (max-width: 640px) {
    margin-left: 0;
    padding: 1rem;
    width: 100vw;
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
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const PromptDescription = styled.p`
  margin-bottom: 1rem;
  color: #4b5563;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  z-index: 0;
  width: 100%;
  box-sizing: border-box;

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
  width: 100%;
  overflow-x: auto; /* Allow horizontal scrolling for code blocks if necessary */
`;

const CodeBlockContent = styled.div`
  white-space: pre-wrap; /* Allow text to wrap within the code block */
  word-break: break-word; /* Break long words to prevent overflow */
  min-width: 0; /* Ensure the content can shrink to fit the container */
`;

export default function PromptsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      { rootMargin: "-100px 0px -50% 0px" }
    );

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.current?.observe(section));

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section));
      observer.current?.disconnect();
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <PromptsContainer>
        <Sidebar activeSection={activeSection} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <MainContent isSidebarOpen={isSidebarOpen}>
          <BlueprintGrid />
          <ContentWrapper>
            <Section id="prompts-introduction">
              <SectionTitle>Prompts Library</SectionTitle>
              <p>
                Welcome to the Prompts Library! This page provides a collection of prompt templates to help you interact with a language model (LLM) about the Blueprint Component Library. Use these prompts to learn about components, troubleshoot issues, customize components, and more. Each prompt can be copied and used in your LLM conversations.
              </p>
            </Section>

            {PROMPT_EXAMPLES.map((example, index) => (
              <Section key={index} id={`prompt-${index}`}>
                <SectionTitle>{example.title}</SectionTitle>
                <PromptDescription>{example.description}</PromptDescription>
                <CodeBlockWrapper>
                  <CodeBlockContainer>
                    <CopyButton code={example.prompt} />
                    <SyntaxHighlighter
                      language="plaintext"
                      style={vscDarkPlus}
                      customStyle={{
                        marginTop: "1rem",
                        borderRadius: "4px",
                        padding: "1rem",
                        backgroundColor: "#1f2937",
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      PreTag={CodeBlockContent}
                    >
                      {example.prompt}
                    </SyntaxHighlighter>
                  </CodeBlockContainer>
                </CodeBlockWrapper>
              </Section>
            ))}
          </ContentWrapper>
        </MainContent>
      </PromptsContainer>
    </>
  );
}