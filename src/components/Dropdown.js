import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      label: "",
    };
  }

  selectHandler = (e, item) => {
    let selectedOption = item;
    const { onChangeHandler, input, menuItems } = this.props;
    if (!selectedOption) {
      const { selectedIndex, value } = e.target;
      const targetEle = menuItems[selectedIndex - 1];
      const label = targetEle ? targetEle.label : "";
      selectedOption = { value, label };
    }
    const { value } = selectedOption;
    this.setState(selectedOption);
    input.onChange(value);
    onChangeHandler(value);
  };

  renderSelectField = () => {
    const { input, menuItems, placeholder, label } = this.props;
    const { value } = this.state;
    return (
      <React.Fragment>
        <label>{label}</label>
        <select
          {...input}
          value={value}
          onChange={this.selectHandler}
        >
          {placeholder && (
            <option value="" hidden>
              {placeholder}
            </option>
          )}
          {menuItems &&
            menuItems.map((item, i) => (
              <option key={i.toString()} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
      </React.Fragment>
    );
  };

  render() {
    const { meta } = this.props;
    const { touched, error } = meta;
    return (
      <div>
        {this.renderSelectField()}
        {touched &&
          error &&
          error.length > 0 && (
            <p>
              <span className="text-danger">{error}</span>
            </p>
          )}
      </div>
    );
  }
}

Dropdown.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
      ]),
    })
  ).isRequired,
  onChangeHandler: PropTypes.func,
  label: PropTypes.string,
  input: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  placeholder: PropTypes.string,
  meta: PropTypes.object,
};

Dropdown.defaultProps = {
  onChangeHandler: () => {},
  input: { onChange: () => {} },
  meta: {},
};

export default Dropdown;
