import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Filter({ options, placeholder, label, onChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event, newValue) => {
    setSelectedOptions(newValue);
    // calls the dispatch action for the filters state stored in redux
    onChange(
      placeholder,
      newValue.map((option) => option.label)
    );
  };

  return (
    <Autocomplete
      multiple
      id={`autocomplete-${label.replace(/\s+/g, "-")}`}
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      style={{ width: "100%", marginRight: 0, marginLeft: 0 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          fullWidth
        />
      )}
    />
  );
}
