import React from "react";
import { useState } from "react";

const FormInput = ({
  inputAttributes = {
    type: "text",
    placeholder: "",
    name: "",
    label: "",
    value: "",
    checked: false,
    options: [],
  },
}) => {
  const { type, placeholder, name, label, value, checked, options } =
    inputAttributes[0];
  const [inputValue, setInputValue] = useState(
    type === "checkbox" || type === "radio" ? checked : value
  );
  const [isSelected, setIsSelected] = useState(checked);

  const handleChange = (e) => {
    switch (type) {
      case "checkbox":
      case "radio":
        setIsSelected(e.target.checked);
        break;
      case "select":
        setInputValue(e.target.value);
        break;
      default:
        setInputValue(e.target.value);
    }
  };

  if (type === "select") {
    return (
      <label>
        {label}
        <select name={name} value={inputValue} onChange={handleChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label>
      {label}
      <input
        type={type}
        name={name}
        key={name}
        value={type === "checkbox" || type === "radio" ? "" : inputValue}
        checked={type === "checkbox" || type === "radio" ? isSelected : false}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </label>
  );
};

export default FormInput;
