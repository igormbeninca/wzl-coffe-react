
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

const columns = [
  {   
    id:'id',
    defaultSortDirection: 'asc',
    initialWidth: 60,
    isResizable: false,
  },
  {
    id: 'id_user',
    displayAsText: 'User ID',
    defaultSortDirection: 'asc',
    initialWidth: 80,
    isResizable: false,
  },
  {
    id: 'name',
    displayAsText: 'Product',
    defaultSortDirection: 'asc',
  },
  {
    id: 'time_stamp',
    defaultSortDirection: 'desc',
  },
  {
    id: 'quantity',
    isSortable: true,
  },
  {
    id: 'total',
    isSortable: true,
  },
];

export default function PurchaseTable ({raw_data}) {

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
                <h2>{rowData.id}</h2>
              </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <EuiDescriptionList>{details}</EuiDescriptionList>
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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 });
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
  const [sortingColumns, setSortingColumns] = useState([{ id: 'time_stamp', direction: 'desc' }]);
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
        if (columnId === 'total') {
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
    total: `Total: €${raw_data.reduce(
        (acc, { total }) => acc + Number(total),
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
        pageSizeOptions: [10, 15, 30],
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
        }}
        onColumnResize={(eventData) => {
        console.log(eventData);
        }}
        gridStyle={{
        border: 'horizontal',
        rowHover: 'highlight',
        stripes: true,
        header: 'underline',
        }}
    />
  );
};