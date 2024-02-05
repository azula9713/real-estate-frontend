import { Label, TextInput } from "flowbite-react";

type Props = {
  label: string;
  placeholder: string;
  id: string;
  type?: string;
  isRequired?: boolean;
};

function TextField({
  label,
  placeholder,
  id,
  type = "text",
  isRequired = false,
}: Readonly<Props>) {
  return (
    <div className="w-full p-3 sm:w-1/2">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <TextInput
        id={id}
        type={type}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
}

export default TextField;
