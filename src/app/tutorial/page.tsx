"use client"

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "@/components/Navbar";
import Sidebar from "./Sidebar";
import SetupInstructions from "./SetupInstructions";
import CopyButton from "./CopyButton";

const TutorialContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  margin: 0;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
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

const ClickableLink = styled.a`
  color: #9d845d;
  text-decoration: none;
  transition: text-decoration 0.3s ease, color 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #7a6644;
  }
`;

// Styled Components for the Setup Picker
const PickerContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PickerLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PickerSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #1f2937;
  background-color: #f9fafb;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #9d845d;
  }
`;

export default function Page() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedFramework, setSelectedFramework] = useState("nextjs");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
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

  const handleFrameworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const framework = event.target.value;
    setSelectedFramework(framework);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    setSelectedLanguage(language);
  };

  return (
    <>
      <Navbar />
      <TutorialContainer>
        <Sidebar activeSection={activeSection} />
        <MainContent>
          <BlueprintGrid />
          <ContentWrapper>
            {/* Introduction Section */}
            <Section id="introduction">
              <SectionTitle>Introduction</SectionTitle>
              <p>
                This tutorial will guide you through the process of using the Blueprint Component Library in your project. You’ll learn how to install the library, set it up in various frameworks, use its components, and customize them to fit your needs.
              </p>
            </Section>

            {/* Installation Section */}
            <Section id="installation">
              <SectionTitle>Installation</SectionTitle>
              <p>
                To get started, you’ll need to install the necessary dependencies. The Blueprint Component Library uses `styled-components` for styling, so you’ll need to install it in your project.
              </p>
              <p>Run the following command to install `styled-components`:</p>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npm install styled-components" />
                  <SyntaxHighlighter
                    language="bash"
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
                    npm install styled-components
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>
              <p>
                Next, ensure you have the component library files in your project. You can copy the components from the `src/templates/components/` directory into your project.
              </p>
            </Section>

            {/* Setup for Different Frameworks Section */}
            <Section id="setup-for-different-frameworks">
              <SectionTitle>Setup for Different Frameworks</SectionTitle>
              <p>
                The Blueprint Component Library can be used in various frameworks. Use the picker below to select your framework and language, and follow the setup instructions:
              </p>
              {/* Setup Picker directly in Page.tsx */}
              <PickerContainer>
                <PickerLabel>
                  Framework:
                  <PickerSelect value={selectedFramework} onChange={handleFrameworkChange}>
                    <option value="nextjs">Next.js</option>
                    <option value="vite">Vite (React)</option>
                    <option value="vue">Vue</option>
                    <option value="cra">Create React App</option>
                    <option value="angular">Angular</option>
                    <option value="svelte">Svelte</option>
                  </PickerSelect>
                </PickerLabel>
                <PickerLabel>
                  Language:
                  <PickerSelect value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="javascript">JavaScript/JSX</option>
                    <option value="typescript">TypeScript/TSX</option>
                  </PickerSelect>
                </PickerLabel>
              </PickerContainer>
              <SetupInstructions
                framework={selectedFramework}
                language={selectedLanguage}
              />
            </Section>

            {/* Using Components Section */}
            <Section id="using-components">
              <SectionTitle>Using Components</SectionTitle>
              <p>
                To use a component, import it into your project and render it in your JSX (or equivalent syntax for your framework). Here’s an example of using a button component in a React-based project:
              </p>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code={`
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
                  `} />
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

            {/* Customizing Components Section */}
            <Section id="customizing-components">
              <SectionTitle>Customizing Components</SectionTitle>
              <p>
                Each component in the Blueprint Component Library is built with `styled-components`, making it easy to customize. You can modify the styles by adjusting the styled-components definitions. For example, to change the button’s background color:
              </p>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code={`
import styled from "styled-components";

const StyledButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: #ff6347; /* Changed to red */
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5533d;
  }
\`;

export default function Button() {
  return <StyledButton>Click Me</StyledButton>;
}
                  `} />
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
  background-color: #ff6347; /* Changed to red */
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5533d;
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

            {/* Next Steps Section */}
            <Section id="next-steps">
              <SectionTitle>Next Steps</SectionTitle>
              <p>
                Now that you’ve learned the basics of using the Blueprint Component Library, explore the <ClickableLink href="/docs">Docs</ClickableLink> to learn more about each component, or visit the <ClickableLink href="/showcase">Showcase</ClickableLink> to see the components in action.
              </p>
            </Section>
          </ContentWrapper>
        </MainContent>
      </TutorialContainer>
    </>
  );
}