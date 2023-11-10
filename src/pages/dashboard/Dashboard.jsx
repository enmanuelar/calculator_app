import { useState } from "react";
import { Alert, CircularProgress, Paper, Snackbar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Calculator } from "../../components/calculator/Calculator.jsx";
import { AuthedLayout } from "../../components/layout/AuthedLayout.jsx";
import { fetchOperations } from "../../api/operations";
import { InformationBox } from "../../components/informationBox/InformationBox.jsx";
import Box from "@mui/material/Box";
import { submitRecord } from "../../api/records.js";

export const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [informationBoxState, setInformationBoxState] = useState({
    result: "-",
    balance: "-",
    lastCost: "",
    operationType: "",
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data = [], isLoading } = useQuery(
    ["operations"],
    async () => {
      const accessToken = await getAccessTokenSilently();
      return fetchOperations(accessToken);
    },
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data.data;
      },
    },
  );

  const getOperationById = (id) => {
    return data.find((operation) => operation.id === id);
  };

  const mutation = useMutation({
    mutationFn: async (record) => {
      const accessToken = await getAccessTokenSilently();
      return submitRecord(accessToken, record);
    },
    onSuccess: ({ data }) => {
      setInformationBoxState({
        balance: data.userBalance,
        result: data.operationResult,
        lastCost: data.amount,
        operationType: getOperationById(data.operationId).type,
      });
    },
    onError: ({ response }) => {
      setErrorMessage(response.data);
      setShowError(true);
    },
  });
  console.log("OPERATIONS data", data);

  function handleCloseError() {
    return () => setShowError(false);
  }

  return (
    <AuthedLayout>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
            width: "100%",
          }}
        >
          <CircularProgress
            sx={{
              display: "flex",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
            }}
          />
        </Box>
      ) : (
        <>
          <Snackbar
            open={showError}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
          <Paper
            elevation={1}
            sx={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              maxWidth: 900,
              alignSelf: "center",
            }}
          >
            <>
              <Calculator
                operations={data}
                onSubmit={(record) => {
                  mutation.mutate(record);
                }}
              />
              <InformationBox
                mutation={mutation}
                informationBoxState={informationBoxState}
              />
            </>
          </Paper>
        </>
      )}
    </AuthedLayout>
  );
};
