import React, { useEffect, FC, useState } from "react";
import { deleteSubscription, getAllSubscriptions, updateSubscriptionStatus } from "../../../../services/subscriptions";
import { ISubscription } from "../../../../types/subcription";
import MaterialTable from 'material-table'
import { dataModifier } from "./utils";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'react-simple-snackbar'
import { v4 as uuid } from "uuid";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { ESubscription, EUser } from "../../../../constants";
import { capitalizeFirstLetter } from "../../../../utils/strings";
import { SearchRounded } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';

const filterMap = [ESubscription.STATUS, 'subscriber', ESubscription.PERIOD]

const SubscriptionsTable: FC = () => {
  const history = useHistory();
  const [subscriptions, setSubscriptions] = useState<ReadonlyArray<ISubscription>>([]);
  const [openSnackbar, _] = useSnackbar()
  const [refresher, setRefresher] = useState<string>('');
  const [filter, setFilter] = useState<string>(filterMap[0]);

  const onEdit = (id: number) => {
    history.push({
      pathname: `/subscriptions/update/${id}`
    });
  };

  const onDelete = async (id: number) => {
    try {
      const res = await deleteSubscription(id)

      if (res.status === 'error') {
        openSnackbar(res.message)
        return
      }

      if (res.status === 'success') {
        openSnackbar(res.message as string)
        handleRefresher();
      }
    } catch (error) {
      openSnackbar(error);
    }
  };

  const handleRefresher = () =>
    setTimeout(() => {
      setRefresher(uuid());
    }, 400);

  useEffect(() => {
    async function get() {
      const res = await getAllSubscriptions({});
      console.log(res.data)
      setSubscriptions(res.data);
    }
    get();
  }, [refresher]);

  const handleUpdateStatus = async (id: number, status: any) => {
    try {
      const res = await updateSubscriptionStatus(id, { status })

      if (res.status === 'error') {
        openSnackbar(res.message.status)
        return
      }

      if (res.status === 'success') {
        openSnackbar(res.message as string)
        handleRefresher();
      }
    } catch (error) {
      openSnackbar(error);
    }
  }

  const handleChangeFilter = (event: React.ChangeEvent<{ value: string }>) => {
    setFilter(event.target.value);
  };

  const handleChangeSearch = async (event: React.ChangeEvent<{ value: string }>) => {
    const value = event.target.value
    let searchObj = { [filter]: value }
    if (value.length === 0) {
      searchObj = {}
    }
    const res = await getAllSubscriptions(searchObj)
    setSubscriptions(res.data)
  };


  return (
    <>
      <Box display="flex" justifyContent="flex-end" style={{ gap: 10 }}>
        <TextField
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
          onChange={handleChangeSearch}
        />
        <Select
          name="filter"
          label="Filter"
          value={filter}
          onChange={handleChangeFilter}
        >
          {
            filterMap.map((filter) => (
              <MenuItem key={uuid()} value={filter}>{capitalizeFirstLetter(filter)}</MenuItem>
            ))
          }
        </Select>
      </Box>
      <MaterialTable
        title="Subscriptions(click on status to change it) and real time search"
        options={{
          search: false
        }}
        columns={[
          { title: 'Subscriber', field: 'subscriber', editable: 'never' },
          { title: 'Creation date', field: 'created_at', editable: 'never' },
          { title: 'Category', field: 'category', editable: 'never' },
          { title: 'CPF', field: 'cpf', editable: 'never' },
          { title: 'UF', field: 'uf', editable: 'never' },
          {
            title: 'Status', field: 'status', editable: 'always'
          },
          { title: 'Total', field: 'total', editable: 'never' }
        ]}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Subscription',
            onClick: (event, rowData: { id: number }) => onEdit(rowData.id)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Subscription',
            onClick: (event, rowData: { id: number }) => onDelete(rowData.id)
          }]}
        cellEditable={{
          onCellEditApproved: async (newValue, oldValue, rowData, columnDef) => {
            await handleUpdateStatus(rowData.id, newValue)
          }
        }}
        data={dataModifier(subscriptions)}
      />
    </>
  );
};

export default SubscriptionsTable;
