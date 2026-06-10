export const FormField = ({id, label, type, placeholder, value, onChangeFn}) => {
  return (
    <div className="flex flex-col items-start mb-4">
      <label htmlFor={id} className="text-sm">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChangeFn(e.target.value)}
        className="h-[40px] w-[400px] p-2 border border-theme rounded-md"
      />
    </div>
  );
};