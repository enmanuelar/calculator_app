import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { FormControl } from "@mui/material";
export const FormInputText = ({ name, control, label }) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25ch" }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
          />
        )}
      />
    </FormControl>
  );
};

FormInputText.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  label: PropTypes.string,
};
