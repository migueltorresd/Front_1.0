export const endpoints = {
  base: import.meta.env.VITE_URL_BACK || "http://localhost:3000",
  ChatBot: {
    ask: "/cancer-chatbot/ask",
    analyze: "/cancer-chatbot/analyze",
  },
};
