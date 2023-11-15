import { useState } from "react";
import { Alert, Paper, Snackbar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Calculator } from "../../components/calculator/Calculator.jsx";
import { AuthedLayout } from "../../components/layout/AuthedLayout.jsx";
import { fetchOperations } from "../../api/operations";
import { InformationBox } from "../../components/informationBox/InformationBox.jsx";
import { submitRecord } from "../../api/records.js";
import { Loading } from "../../components/loading/Loading.jsx";

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

  const { data: operationsData = [], isLoading } = useQuery({
    queryKey: ["operations"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return fetchOperations(accessToken);
    },
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data;
    },
  });

  const getOperationById = (id) => {
    return operationsData.find((operation) => operation.id === id);
  };

  const recordMutation = useMutation({
    mutationFn: async (record) => {
      const accessToken = await getAccessTokenSilently();
      return submitRecord(accessToken, record);
    },
    onSuccess: (response) => {
      const { data } = response.data;
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

  function handleCloseError() {
    return () => setShowError(false);
  }

  return (
    <AuthedLayout>
      {isLoading ? (
        <Loading />
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
                operations={operationsData}
                onSubmit={(record) => {
                  recordMutation.mutate(record);
                }}
              />
              <InformationBox
                isPending={recordMutation.isPending}
                informationBoxState={informationBoxState}
              />
            </>
          </Paper>
        </>
      )}
    </AuthedLayout>
  );
};
