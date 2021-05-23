
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  EuiDataGrid,EuiLoadingSpinner
} from '@elastic/eui';

const columns = [
  {   
    id:'account',
    defaultSortDirection: 'asc',
  },
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
  },
  {
    id: 'email',
    defaultSortDirection: 'asc',
  },
  {
    id: 'amount',
    isSortable: true,
  }
];
export default function AdminTable ({raw_data}) {
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
        if (columnId === 'amount') {
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
    amount: `Total: €${raw_data.reduce(
        (acc, { amount }) => acc + Number(amount),
        0
      ).toFixed(2)}`,
  };
  return (
    <EuiDataGrid
        aria-label="Data grid footer row demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
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