import Paper from "@mui/material/Paper";
import { AuthedLayout } from "../../components/layout/AuthedLayout.jsx";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteRecord, fetchRecords } from "../../api/records.js";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Loading } from "../../components/loading/Loading.jsx";
import { useIsMount } from "../../hooks/useIsMount.jsx";

export const History = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderBy, setOrderBy] = useState("date");
  const [direction, setDirection] = useState("asc");
  const isMount = useIsMount();
  const queryClient = useQueryClient();
  const { data: recordsData = [], isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return fetchRecords(
        accessToken,
        currentPage,
        rowsPerPage,
        orderBy,
        direction,
      );
    },
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data;
    },
  });

  const recordsDataMutation = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return fetchRecords(
        accessToken,
        currentPage,
        rowsPerPage,
        orderBy,
        direction,
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["history"], data);
    },
  });

  const deleteRecordMutation = useMutation({
    mutationFn: async (recordId) => {
      const accessToken = await getAccessTokenSilently();
      return deleteRecord(accessToken, recordId);
    },
    onSuccess: () => {
      recordsDataMutation.mutate();
    },
  });

  useEffect(() => {
    if (!isMount) {
      recordsDataMutation.mutate();
    }
  }, [rowsPerPage, currentPage, direction, orderBy]);

  const columns = [
    {
      name: "operationType",
      label: "Operation",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cost",
      label: "Cost",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "result",
      label: "Result",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "balance",
      label: "Balance",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  return (
    <AuthedLayout>
      <Snackbar
        open={deleteRecordMutation.isSuccess}
        autoHideDuration={6000}
        // onClose={handleCloseError} //TODO: handle onClose event
      >
        <Alert
          // onClose={handleCloseError}
          severity="success"
          sx={{ width: "100%" }}
        >
          Record deleted successfully
        </Alert>
      </Snackbar>
      {isLoading ? (
        <Loading />
      ) : (
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
          <MUIDataTable
            title={
              <Typography variant="h6">
                Record history
                {(isLoading || recordsDataMutation.isPending) && (
                  <CircularProgress
                    size={24}
                    style={{ marginLeft: 15, position: "relative", top: 4 }}
                  />
                )}
              </Typography>
            }
            data={recordsData.records}
            columns={columns}
            options={{
              filterType: "checkbox",
              responsive: "vertical",
              download: false,
              print: false,
              filter: false,
              selectableRows: "single",
              serverSide: true,
              search: false,
              count: recordsData.count[0].total_count,
              rowsPerPage: rowsPerPage,
              rowsPerPageOptions: [5, 10, 15],
              onChangePage: (page) => {
                setCurrentPage(page);
              },
              onChangeRowsPerPage: (numberOfRows) => {
                setRowsPerPage(numberOfRows);
              },
              onColumnSortChange: (changedColumn, sortDirection) => {
                setDirection(sortDirection);
                setOrderBy(changedColumn);
              },
              onRowsDelete: (currentRowSelected) => {
                const recordId =
                  recordsData.records[currentRowSelected.data[0]?.dataIndex]
                    ?.id;
                deleteRecordMutation.mutate(recordId);
              },
            }}
          />
        </Paper>
      )}
    </AuthedLayout>
  );
};
