/// <reference types="vite/client" />

interface Window {
  turnstile?: {
    reset: () => void;
  };
}
