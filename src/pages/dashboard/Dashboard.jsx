import { useEffect, useState } from "react";
import { Alert, Paper, Snackbar } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Calculator } from "../../components/calculator/Calculator.jsx";
import { AuthedLayout } from "../../components/layout/AuthedLayout.jsx";
import { InformationBox } from "../../components/informationBox/InformationBox.jsx";
import { fetchLastRecord, submitRecord } from "../../api/records.js";
import { Loading } from "../../components/loading/Loading.jsx";

export const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [operationResult, setOperationResult] = useState("0.00");
  const [userBalance, setUserBalance] = useState(0);
  const [lastCost, setLastCost] = useState(0);
  const [selectedOperationType, setSelectedOperationType] = useState("none");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: dashboardState = [], isLoading } = useQuery({
    queryKey: ["lastRecord"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return fetchLastRecord(accessToken);
    },
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    select: (response) => {
      const { data } = response;
      return data;
    },
  });

  useEffect(() => {
    if (dashboardState.userBalance) {
      setUserBalance(dashboardState?.userBalance[0].user_balance);
    }
  }, [dashboardState]);

  const getOperationById = (id) => {
    return dashboardState.operations.find((operation) => operation.id === id);
  };

  const recordMutation = useMutation({
    mutationFn: async (record) => {
      const accessToken = await getAccessTokenSilently();
      return submitRecord(accessToken, record);
    },
    onSuccess: (response) => {
      const { data } = response.data;
      setOperationResult(data.operationResult);
      setUserBalance(data.userBalance);
      setLastCost(data.amount);
      setSelectedOperationType(getOperationById(data.operationId).type);
    },
    onError: (error) => {
      setErrorMessage(error.response.data);
      setShowError(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lastRecord"] });
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
                operations={dashboardState.operations}
                onSubmit={(record) => {
                  recordMutation.mutate(record);
                }}
              />
              <InformationBox
                isPending={recordMutation.isPending}
                operationResult={operationResult}
                userBalance={userBalance}
                lastCost={lastCost}
                selectedOperationType={selectedOperationType}
              />
            </>
          </Paper>
        </>
      )}
    </AuthedLayout>
  );
};
