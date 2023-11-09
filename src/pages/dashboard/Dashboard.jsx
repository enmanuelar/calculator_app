import { useState } from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Calculator } from "../../components/calculator/Calculator.jsx";
import { AuthedLayout } from "../../components/layout/AuthedLayout.jsx";
import { fetchOperations, submitOperation } from "../../api/operations";
import { InformationBox } from "../../components/informationBox/InformationBox.jsx";

export const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [informationBoxState, setInformationBoxState] = useState({
    result: "-",
    balance: "-",
  });

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

  const mutation = useMutation({
    mutationFn: async (record) => {
      const accessToken = await getAccessTokenSilently();
      return submitOperation(accessToken, record);
    },
    onSuccess: ({ data }) => {
      console.log("ON SUCCESS", data);
      setInformationBoxState({
        balance: data.userBalance,
        result: data.operationResult,
      });
    },
  });
  console.log("OPERATIONS data", data);
  return (
    <AuthedLayout>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
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
        )}
      </Box>
    </AuthedLayout>
  );
};
