"use client";


export default function InputField({ label, id, name, type = "text", required = false }) {
  return (
    <div className="inputField">
      <label htmlFor={id} className="inputLabel">{label}</label>
      <input id={id} name={name} type={type} required={required} className="inputControl" />
    </div>
  );
}