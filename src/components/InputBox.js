import React from 'react';
import PropTypes from 'prop-types';

const changeHandler = (event, input) => {
  const { target } = event;
  const { value } = target;
  input.onChange(value);
};

const TextInput = (props) => {
  const {
    input, label, meta, type, placeholder, id, min, value
  } = props;
  const {
    touched, error
  } = meta;

  return (
    <div>
      {label && <label htmlFor={id} dangerouslySetInnerHTML={{ __html: label }} />}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...input}
        onChange={(event) => changeHandler(event, input)}
        min={min}
      />
      {(touched && error && error.length > 0 && <span className="error-message text-danger">{error}</span>)}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  input: {},
  meta: {},
};

export default TextInput;
