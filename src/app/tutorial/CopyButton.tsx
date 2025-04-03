"use client"

import styled from "styled-components";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const CopyButtonStyled = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem;
  background-color: #9d845d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 10; /* Ensure the button is above the code block */
  transition: background-color 0.3s ease;
  display: flex; /* Ensure the icon is centered */
  align-items: center;
  justify-content: center;
  width: 32px; /* Fixed size for better visibility */
  height: 32px;

  &:hover {
    background-color: #7a6644;
  }

  &:disabled {
    background-color: #d1d5db; /* Grayed out when disabled */
    cursor: not-allowed;
  }
`;

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopyCode = () => {
    if (!isClient) {
      console.error("Cannot copy: Not running on the client side.");
      return;
    }

    try {
      // Create a temporary textarea to copy the text
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed"; // Avoid scrolling to bottom
      textarea.style.opacity = "0"; // Make it invisible
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (successful) {
        alert("Code copied to clipboard!");
      } else {
        alert("Failed to copy code. Please copy it manually.");
      }
    } catch (err) {
      console.error("Copy failed: ", err);
      alert("Failed to copy code. Please copy it manually.");
    }
  };

  return (
    <CopyButtonStyled onClick={handleCopyCode} disabled={!isClient}>
      <ClipboardIcon className="h-5 w-5" />
    </CopyButtonStyled>
  );
}