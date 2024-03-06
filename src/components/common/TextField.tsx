import { Label, TextInput } from "flowbite-react";
import { useRef } from "react";

type Props = {
  label: string;
  placeholder: string;
  id: string;
  type?: string;
  isRequired?: boolean;
  elementRef?: React.RefObject<HTMLInputElement>;
  errorMessage?: string;
};

function TextField({
  label,
  placeholder,
  id,
  errorMessage,
  elementRef: ref,
  type = "text",
  isRequired = false,
}: Readonly<Props>) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full p-3 lg:w-1/2">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <TextInput
        id={id}
        type={type}
        placeholder={placeholder}
        required={isRequired}
        ref={ref ?? inputRef}
      />
      {errorMessage && (
        <div className="mt-4 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default TextField;
