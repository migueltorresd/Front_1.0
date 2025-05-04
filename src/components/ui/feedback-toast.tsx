import React, { useEffect } from "react";
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { ToastData } from "@/types/appointment.types";

type FeedbackToastProps = ToastData & {
  onClose: () => void;
};

const FeedbackToast: React.FC<FeedbackToastProps> = ({ type, message, show, position = "bottom", onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  if (!show) return null;
  
  let bgClass = "bg-gradient-to-r";
  let icon = null;
  
  switch (type) {
    case "success":
      bgClass += " from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border-green-200/50 dark:border-green-800/30";
      icon = <FaCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      break;
    case "error":
      bgClass += " from-red-50 to-red-100/50 dark:from-red-900/30 dark:to-red-800/20 border-red-200/50 dark:border-red-800/30";
      icon = <FaExclamationCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      break;
    case "info":
    default:
      bgClass += " from-orange-50 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-800/20 border-orange-200/50 dark:border-orange-800/30";
      icon = <FaInfoCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
      break;
  }
  
  const positionClass = position === "top" 
    ? "fixed top-6 right-6 z-50 animate-in slide-in-from-right-3"
    : "fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-3";
  
  return (
    <div className={positionClass}>
      <div className={`p-4 rounded-xl ${bgClass} border backdrop-blur-sm shadow-md w-[90vw] max-w-md`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            {icon}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              className="inline-flex rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={onClose}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackToast;