import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectDropdown(props) {
  return (
    <div>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={props.value}
          onChange={props.onChange}
          label={props.label}
        //   {...props.register(props.name)}
        //   error={props.errors[props.name] ? true : false}
        //   helperText={
        //     props.errors[props.name] ? props.errors[props.name].message : null
        //   }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
