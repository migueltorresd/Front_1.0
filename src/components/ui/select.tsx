import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "@/lib/utils";

type SelectContextType = {
  value?: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select provider");
  }
  return context;
}

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}

const Select = ({
  children,
  value,
  onValueChange,
  defaultValue,
  disabled = false,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(
    value || defaultValue || "",
  );

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: string) => {
    if (disabled) return;

    setInternalValue(newValue);
    onValueChange(newValue);
    setOpen(false);
  };

  const handleSetOpen = (isOpen: boolean) => {
    if (disabled) return;
    setOpen(isOpen);
  };

  return (
    <SelectContext.Provider
      value={{
        value: internalValue,
        onValueChange: handleValueChange,
        open,
        setOpen: handleSetOpen,
        disabled,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  children: React.ReactNode;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, disabled } = useSelectContext();

    return (
      <button
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2",
          "text-sm ring-offset-white placeholder:text-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        onClick={() => setOpen(!open)}
        type="button"
        aria-expanded={open}
        disabled={disabled}
        {...props}
      >
        {children}
        <FaChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
    );
  },
);
SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps {
  placeholder?: string;
}

const SelectValue = ({ placeholder }: SelectValueProps) => {
  const { value } = useSelectContext();

  return (
    <span className="text-sm">
      {value
        ? value
        : placeholder && <span className="text-gray-500">{placeholder}</span>}
    </span>
  );
};
SelectValue.displayName = "SelectValue";

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent = ({ className, ...props }: SelectContentProps) => {
  const { open, setOpen } = useSelectContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[180px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md",
        "animate-in fade-in-80 mt-1",
        className,
      )}
      {...props}
    />
  );
};
SelectContent.displayName = "SelectContent";

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange, disabled } = useSelectContext();
    const isSelected = selectedValue === value;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex select-none items-center rounded-sm px-3 py-2 text-sm",
          "hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
          isSelected ? "bg-gray-100 font-medium" : "",
          disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
          className,
        )}
        onClick={() => !disabled && onValueChange(value)}
        aria-disabled={disabled}
        {...props}
      >
        <span>{children}</span>
      </div>
    );
  },
);
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
