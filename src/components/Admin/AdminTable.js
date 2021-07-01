
import React, { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import {
  EuiDataGrid,
  EuiFlexGroup,
  EuiFlexItem, 
  EuiPopover,
  EuiPopoverTitle,
  EuiButtonIcon,
  EuiSpacer,
  EuiPortal,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiTitle,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiButton,
} from '@elastic/eui';

import { AdminUserForm } from "../../components";

const columns = [
  {   
    id:'id',
    defaultSortDirection: 'asc',
  },
  {
    id: 'full_name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
  },
  {
    id: 'email',
    defaultSortDirection: 'asc',
  },
  {
    id: 'rfid',
    isSortable: false,
  },
  {
    id: 'is_active',
    isSortable: false,
  },
  {
    id: 'is_superuser',
    isSortable: false,
  },
  {
    id: 'saldo',
    isSortable: true,
  },
];

export default function AdminTable ({raw_data}) {

  const FlyoutRowCell = (rowIndex) => {
    let flyout;
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    if (isFlyoutOpen) {
      const rowData = raw_data[rowIndex.rowIndex];
  
      const details = Object.entries(rowData).map(([key, value]) => {
        return (
          <Fragment>
            <EuiDescriptionListTitle>{key}</EuiDescriptionListTitle>
            <EuiDescriptionListDescription>{value}</EuiDescriptionListDescription>
          </Fragment>
        );
      });
  
      flyout = (
        <EuiPortal>
          <EuiFlyout size="s" ownFocus onClose={() => setIsFlyoutOpen(!isFlyoutOpen)}>
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2>{rowData.full_name}</h2>
              </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <AdminUserForm current_user={rowData}/>
              {/* <EuiDescriptionList>{details}</EuiDescriptionList> */}
              {/* <EuiButton 
                color="primary" 
                fill
                iconSide="left"
                iconType="crosshairs"
                >
                Close
              </EuiButton> */}
            </EuiFlyoutBody>
          </EuiFlyout>
        </EuiPortal>
      );
    }
  
    return (
      <Fragment>
        <EuiButtonIcon
          color="text"
          iconType="eye"
          iconSize="s"
          aria-label="View details"
          onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}
        />
        {flyout}
      </Fragment>
    );
  };
  const leadingControlColumns = [
    {
      id: 'View',
      width: 36,
      headerCellRender: () => null,
      rowCellRender: FlyoutRowCell,
    }
  ];
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const onChangeItemsPerPage = useCallback(
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    [setPagination]
  );
  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );
  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); 
  

  const renderFooterCellValue = useCallback(
    ({ columnId }) => footerCellValues[columnId] || null,
    []
  );
  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );
  // initialize to the full set of columns
  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId, setCellProps }) => {
      useEffect(() => {
        if (columnId === 'saldo') {
          if (raw_data.hasOwnProperty(rowIndex)) {
            const numeric = parseFloat(
              raw_data[rowIndex][columnId]
            ).toFixed(0);
            setCellProps({
              style: {
                backgroundColor: `rgba(0, 255, 0, ${numeric * 0.002})`,
              },
            });
          }
        }
      }, [rowIndex, columnId, setCellProps]);
      return raw_data.hasOwnProperty(rowIndex)
        ? raw_data[rowIndex][columnId]
        : null;
    };
  }, []);

  const footerCellValues = {
    saldo: `Total: €${raw_data.reduce(
        (acc, { saldo }) => acc + Number(saldo),
        0
      ).toFixed(2)}`,
  };
  return (
    <EuiDataGrid
        aria-label="Data grid footer row demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        leadingControlColumns={leadingControlColumns}
        //trailingControlColumns={trailingControlColumns}
        rowCount={raw_data.length}
        renderCellValue={renderCellValue}
        inMemory={{ level: 'sorting' }}
        sorting={{ columns: sortingColumns, onSort }}
        renderFooterCellValue={renderFooterCellValue}
        pagination={{
        ...pagination,
        pageSizeOptions: [10, 15, 20],
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
        }}
        onColumnResize={(eventData) => {
        console.log(eventData);
        }}
        gridStyle={{
        border: 'horizontal',
        rowHover: 'highlight',
        header: 'underline',
        }}
    />
  );
};