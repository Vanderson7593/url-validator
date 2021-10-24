import { Box } from "@material-ui/core";
import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { IUrl } from "../../types/url";
import { dataModifier } from "./utils";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 10 },
    {
        field: "label",
        headerName: "Label",
        width: 250,
        editable: false,
        sortable: false,
    },
    {
        field: "url",
        headerName: "Url",
        width: 300,
        editable: false,
        sortable: false,
    },
    {
        field: "is_processed",
        headerName: "Processed",
        type: "boolean",
        width: 150,
        editable: false,
        sortable: false,
    },
    {
        field: "status",
        headerName: "HTTP status",
        type: "number",
        width: 150,
        editable: false,
        sortable: false,
    },
    {
        field: "processed_at",
        headerName: "Processed at",
        type: "date",
        width: 150,
        editable: false,
        sortable: false,
    },
    {
        field: "created_at",
        headerName: "Created at",
        type: "date",
        width: 150,
        editable: false,
        sortable: false,
    },
    {
        field: "updated_at",
        headerName: "Updated at",
        type: "date",
        width: 150,
        editable: false,
        sortable: false,
    },
    {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: ({ id, value }) =>
            value !== null && <Button variant="contained">Show HTML</Button>,
    },
];

type TTableProps = {
    urls: Array<IUrl>;
    onClickCallback: (id: number) => void;
};

const Table: FC<TTableProps> = ({ urls, onClickCallback }) => (
    <>
        <Box height={700} width="90vw">
            <DataGrid
                rows={dataModifier(urls)}
                columns={columns}
                pageSize={20}
                disableSelectionOnClick
                onCellClick={(item) => onClickCallback(item.id as number)}
            />
        </Box>
    </>
);

export default Table;
