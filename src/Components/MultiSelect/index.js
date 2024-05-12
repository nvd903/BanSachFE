import Select from "react-select";

function MultiSelect({ options, onChange, defaultValue, isMulti = true }) {
  return (
    <Select
      defaultValue={defaultValue}
      isMulti={isMulti}
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={onChange}
    />
  );
}

export default MultiSelect;
