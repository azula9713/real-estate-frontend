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
};

function DropDown({
  label,
  id,
  items,
  isRequired = false,
  value,
  onChange,
}: Readonly<Props>) {
  return (
    <div className="w-full p-3 sm:w-1/2">
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
    </div>
  );
}

export default DropDown;
