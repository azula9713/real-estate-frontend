import { Label, Select } from "flowbite-react";

type Props = {
  label: string;
  id: string;
  items: {
    label: string;
    value: number | string;
  }[];
  isRequired?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
};

function DropDown({
  label,
  id,
  items,
  isRequired = false,
  value,
  onChange,
  errorMessage,
}: Readonly<Props>) {
  return (
    <div className="w-full p-3 lg:w-1/2">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <Select id={id} required={isRequired} value={value} onChange={onChange}>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      {errorMessage && (
        <div className="mt-4 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default DropDown;
