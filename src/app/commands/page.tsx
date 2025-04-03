"use client"

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "@/components/Navbar";
import Sidebar from "./Sidebar";
import CopyButton from "../tutorial/CopyButton";

const CommandsContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff; /* Dark background to match the homepage */
  display: flex;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
`;

const MainContent = styled.main<{ isSidebarOpen: boolean }>`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  position: relative;
  transition: margin-left 0.3s ease-in-out;
  width: calc(100vw - 250px);
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

const ContentWrapper = styled.div`
  max-width: 80rem;
  width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 0.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333; /* White text to contrast with dark background */
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const CommandDescription = styled.p`
  margin-bottom: 1rem;
  color: #333; /* Light gray text for readability on dark background */

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
`;

const CodeBlockContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
`;

const CodeBlockContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`;

export default function CommandsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
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
      <CommandsContainer>
        <Sidebar activeSection={activeSection} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <MainContent isSidebarOpen={isSidebarOpen}>
          <ContentWrapper>
            <Section id="commands-introduction">
              <SectionTitle>Commands</SectionTitle>
              <CommandDescription>
                Welcome to the Commands page! This page provides a collection of useful commands for building a website with the Blueprint Component Library. You'll find commands for creating projects in different frameworks, managing development workflows, building and deploying your site, and troubleshooting common issues. Each command can be copied and used in your terminal.
              </CommandDescription>
            </Section>

            <Section id="create-project">
              <SectionTitle>Create a Project</SectionTitle>
              <CommandDescription>
                Below are commands to create a new project using different frameworks supported by the Blueprint Component Library.
              </CommandDescription>

              <h3 className="text-lg font-semibold text-white mb-2">Next.js</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npx create-next-app@latest my-blueprint-app" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npx create-next-app@latest my-blueprint-app
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Vite (React)</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npm create vite@latest my-blueprint-app -- --template react" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npm create vite@latest my-blueprint-app -- --template react
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Vue</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npm create vue@latest" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npm create vue@latest
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Create React App</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npx create-react-app my-blueprint-app" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npx create-react-app my-blueprint-app
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Angular</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="ng new my-blueprint-app" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    ng new my-blueprint-app
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Svelte</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npm create vite@latest my-blueprint-app -- --template svelte" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npm create vite@latest my-blueprint-app -- --template svelte
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>
            </Section>

            <Section id="development-commands">
              <SectionTitle>Development Commands</SectionTitle>
              <CommandDescription>
                These commands are useful during the development process, such as installing dependencies, running the development server, and managing your project.
              </CommandDescription>

              <h3 className="text-lg font-semibold text-white mb-2">Install Dependencies</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npm install" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npm install
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Run Development Server</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npm run dev" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npm run dev
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Install Styled-Components (for Blueprint)</h3>
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npm install styled-components
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>
            </Section>

            <Section id="build-deploy-commands">
              <SectionTitle>Build & Deploy Commands</SectionTitle>
              <CommandDescription>
                These commands help you build your project for production and deploy it to various platforms.
              </CommandDescription>

              <h3 className="text-lg font-semibold text-white mb-2">Build for Production (Next.js)</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npm run build" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npm run build
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Start Production Server (Next.js)</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npm run start" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npm run start
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Deploy to Vercel</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="vercel deploy" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    vercel deploy
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Deploy to Netlify</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="netlify deploy --prod" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    netlify deploy --prod
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>
            </Section>

            <Section id="troubleshooting-commands">
              <SectionTitle>Troubleshooting Commands</SectionTitle>
              <CommandDescription>
                These commands can help you resolve common issues during development, such as clearing caches or resetting your environment.
              </CommandDescription>

              <h3 className="text-lg font-semibold text-white mb-2">Clear Next.js Cache</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="rm -rf .next" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    rm -rf .next
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Clear Node Modules and Reinstall</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="rm -rf node_modules && npm install" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    rm -rf node_modules && npm install
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>

              <h3 className="text-lg font-semibold text-white mb-2">Clear npm Cache</h3>
              <CodeBlockWrapper>
                <CodeBlockContainer>
                  <CopyButton code="npm cache clean --force" />
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    PreTag={CodeBlockContent}
                  >
                    npm cache clean --force
                  </SyntaxHighlighter>
                </CodeBlockContainer>
              </CodeBlockWrapper>
            </Section>
          </ContentWrapper>
        </MainContent>
      </CommandsContainer>
    </>
  );
}