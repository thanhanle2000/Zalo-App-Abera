import React from "react";

const TextFormContact = ({
  id,
  name,
  className,
  placeholder,
  value,
  onChange,
  showError,
  errorMessage,
}) => {
  return (
    <div className="col-address w-i-100">
      <input
        type="text"
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {showError && <span className="form-error-message">{errorMessage}</span>}
    </div>
  );
};

export default TextFormContact;
