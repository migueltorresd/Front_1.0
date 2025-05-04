import { Button } from "@/components/ui/button";
import { Message } from "@/types/chatbot.types";

interface SuggestedQuestionsProps {
  isTyping: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  simulateQuestion: (question: string) => void;
}

const SuggestedQuestions = ({
  isTyping,
  simulateQuestion,
}: SuggestedQuestionsProps) => {
  const questions = [
    "¿Cuáles son los síntomas comunes del cáncer?",
    "¿Qué tratamientos existen para el cáncer?",
    "¿Cómo puedo prevenir el cáncer?",
    "¿Dónde puedo encontrar apoyo emocional?",
  ];

  return (
    <div className="mt-8 bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800/30">
      <h2 className="text-lg font-semibold text-orange-800 dark:text-orange-400 mb-4">
        Sugerencias de preguntas
      </h2>
      <div className="flex flex-wrap gap-3">
        {questions.map((question) => (
          <Button
            key={question}
            variant="outline"
            className="text-sm border-orange-300 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
            onClick={() => {
              if (!isTyping) {
                simulateQuestion(question);
              }
            }}
            disabled={isTyping}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
