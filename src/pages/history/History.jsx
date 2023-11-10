import Paper from "@mui/material/Paper";
import { AuthedLayout } from "../../components/layout/AuthedLayout.jsx";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteRecord, fetchRecords } from "../../api/records.js";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const pageNumber = 0;

export const History = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRecordId, setSelectedRecordId] = useState("");
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useQuery(
    ["history"],
    async () => {
      const accessToken = await getAccessTokenSilently();
      return fetchRecords(accessToken, pageNumber, rowsPerPage);
    },
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data.data;
      },
    },
  );

  const paginateMutation = useMutation({
    mutationFn: async (pageNumber) => {
      const accessToken = await getAccessTokenSilently();
      return fetchRecords(accessToken, pageNumber, rowsPerPage);
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
    onSuccess: (data) => {
      paginateMutation.mutate(currentPage);
    },
  });

  useEffect(() => {
    handleChangePage(currentPage);
  }, [rowsPerPage, currentPage]);

  console.log("DATA", data);

  const handleChangePage = (page) => {
    paginateMutation.mutate(page);
  };
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
                {(isLoading || paginateMutation.isLoading) && (
                  <CircularProgress
                    size={24}
                    style={{ marginLeft: 15, position: "relative", top: 4 }}
                  />
                )}
              </Typography>
            }
            data={data.records}
            columns={columns}
            options={{
              filterType: "checkbox",
              responsive: "vertical",
              download: false,
              selectableRows: "single",
              serverSide: true,
              count: data.count[0].total_count,
              rowsPerPage: rowsPerPage,
              onTableChange: (action, tableState) => {
                console.log(action, tableState);
                switch (action) {
                  case "changePage":
                    // handleChangePage(tableState.page);
                    setCurrentPage(tableState.page);
                    break;
                  case "changeRowsPerPage":
                    setRowsPerPage(tableState.rowsPerPage);
                    break;
                  case "rowSelectionChange":
                    setSelectedRecordId(
                      data.records[tableState.selectedRows.data[0]?.dataIndex]
                        ?.id,
                    );
                    break;
                  case "rowDelete":
                    deleteRecordMutation.mutate(selectedRecordId);
                    break;
                  default:
                    console.log("action not handled.");
                }
              },
            }}
          />
        </Paper>
      )}
    </AuthedLayout>
  );
};
