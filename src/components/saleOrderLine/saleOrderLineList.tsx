import { HttpError, useList } from "@refinedev/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Table } from "src/components/table";
import { Box, Button, Card } from "@mantine/core";

export const SaleOrderLineList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  });
  const { data, isLoading } = useList({
    resource: "sale-order-lines",
    pagination: {
      current: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });
  const items = data?.data ?? [];

  const total = data?.meta?.total;
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "item.name", //access nested data with dot notation
        header: "Tên sản phẩm",
        size: 300,
      },
      {
        accessorKey: "unit_price",
        header: "Đơn giá",
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
      },
    ],
    []
  );
  return (
    <Table
      columns={columns}
      data={items}
      manualPagination
      rowCount={total}
      state={{
        pagination,
        isLoading: isLoading,
        showProgressBars: isLoading,
      }}
      onPaginationChange={setPagination}
    />
  );
};
