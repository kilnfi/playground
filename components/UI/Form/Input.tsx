type Props = {
  name: string,
  label?: string | undefined;
  placeholder?: string;
  onChange: (e: any) => void;
  value: string | number | undefined;
  type?: "number" | "password" | "email" | "text";
  required?: boolean,
};

const Input = ({ label, name, placeholder, onChange, value, type = 'text', required = false }: Props) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name}>{label}</label>
      )}
      <input
        id={name}
        name={name}
        className={`
           px-2.5
           py-2.5
           rounded
           leading-normal
           block
           w-full
           border
           border-gray-300
           text-black
           bg-white
           font-sans
           text-left
           appearance-none
           relative
           focus:outline-none
           focus:ring-2
           focus:ring-primary
         `}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
