import { Label, Textarea } from "flowbite-react";

type Props = {
  label: string;
  placeholder: string;
  id: string;
  lines?: number;
  isRequired?: boolean;
};

function TextArea({
  label,
  placeholder,
  id,
  lines = 3,
  isRequired = false,
}: Readonly<Props>) {
  return (
    <div className="w-full p-3 sm:w-1/2">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <Textarea
        id={id}
        placeholder={placeholder}
        required={isRequired}
        rows={lines}
      />
    </div>
  );
}

export default TextArea;
