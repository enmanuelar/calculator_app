import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export const FormInputOperationsDropdown = ({
  name,
  control,
  label,
  operations,
}) => {
  const generateSingleOptions = () => {
    return operations.map((option) => {
      if (option.type !== "random_string") {
        return (
          <MenuItem key={option.id} value={option.id}>
            {option.type} ({option.cost} credits)
          </MenuItem>
        );
      }
    });
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25ch" }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        defaultValue={""}
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

FormInputOperationsDropdown.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  label: PropTypes.string,
  operations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      cost: PropTypes.number,
    }),
  ),
};
