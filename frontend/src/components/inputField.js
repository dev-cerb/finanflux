"use client";

export default function InputField({
  label,
  id,
  name,
  type = "text",
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm text-purple-200"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="
          w-full
          bg-color-dark 
          text-white 
          border border-purple-700 
          rounded-lg 
          px-3 py-2
          placeholder-purple-400
          focus:outline-none 
          focus:ring-2 
          focus:ring-color-purple
        "
      />
    </div>
  );
}
