export const endpoints = {
  base: import.meta.env.VITE_URL_BACK || "http://localhost:3000",
  ChatBot: {
    ask: "/api/cancer-chatbot/ask",
    analyze: "/api/cancer-chatbot/analyze",
  },
};
