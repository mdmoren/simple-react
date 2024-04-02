import { useState } from "react";

function InputField({
  label,
  type,
  value,
  onChange,
  icon: Icon,
  additionalChildren,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative flex items-center p-3 rounded-md border-2 border-gray-300 bg-white group
        ${
          isFocused
            ? " border-blue-400"
            : value
            ? "border-green-300"
            : "hover:border-orange-300"
        }`}
    >
      {Icon && (
        <Icon className="text-lg mr-2 text-gray-400 group-hover:text-gray-500 duration-500" />
      )}

      <div className="flex-grow">
        <h1
          className={`absolute z-10 -top-3 left-3 bg-white  ${
            isFocused || value
              ? "text-gray-600 translate-y-0 text-sm px-2"
              : "text-gray-500 translate-y-8 translate-x-10"
          } transition-transform duration-500 ease-in-out pointer-events-none`}
        >
          {label}
        </h1>
        <input
          className="w-full h-10 pl-2 bg-transparent outline-none z-20"
          id={label.toLowerCase()}
          type={type}
          placeholder=""
          value={value}
          onChange={onChange}
          autocomplete="off"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {additionalChildren}
    </div>
  );
}

export default InputField;
