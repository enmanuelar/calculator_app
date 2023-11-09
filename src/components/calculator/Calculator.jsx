import Box from "@mui/material/Box";
import { FormControl, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { FormInputText } from "../form/FormInputText.jsx";
import { FormInputOperationsDropdown } from "../form/FormInputOperationsDropdown.jsx";

export function Calculator(props) {
  const { handleSubmit, reset, control, setValue } = useForm();
  const onSubmit = (data) => {
    console.log("SUBMIT", data);
    props.onSubmit(data);
  };

  const handleGetRandomString = () => {
    props.onSubmit({
      operationId: getOperationByType("random_string").id,
    });
  };

  const getOperationByType = (type) => {
    return props.operations.find((operation) => operation.type === type);
  };

  return (
    <Box
      component="form"
      sx={{
        alignItems: "center",
        backgroundColor: "neutral.800",
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        color: "common.white",
        display: "flex",
        flex: {
          xs: "0 0 auto",
          md: "1 1 auto",
        },
        justifyContent: "center",
        p: {
          xs: 4,
          md: 8,
        },
      }}
    >
      <Paper
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
        }}
      >
        <Typography variant="h4">Calculator</Typography>
        <Typography variant="body2" color="text.secondary">
          Enter the values and select the operation type
        </Typography>
        <FormInputText
          name={"firstValue"}
          control={control}
          label={"First value"}
        />
        <FormInputText
          name={"secondValue"}
          control={control}
          label={"Second value"}
        />
        <FormInputOperationsDropdown
          name={"operationId"}
          control={control}
          label={"Operation"}
          operations={props.operations}
        />
        <FormControl>
          <Button onClick={handleGetRandomString}>
            Get Random String ({getOperationByType("random_string").cost}{" "}
            credits)
          </Button>
        </FormControl>
        <FormControl>
          <Button variant={"contained"} onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </FormControl>
      </Paper>
    </Box>
  );
}

Calculator.propTypes = {
  operations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      cost: PropTypes.number,
    }),
  ),
  onSubmit: PropTypes.func,
};
