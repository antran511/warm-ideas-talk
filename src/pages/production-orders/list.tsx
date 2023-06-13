import { Page } from "src/components/page";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Table } from "src/components/table";
import { HttpError, useList } from "@refinedev/core";
import { ProductionOrder } from "src/interface";
import { Menu } from "@mantine/core";

export const ProductionOrderList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  });
  const { data, isLoading } = useList<ProductionOrder, HttpError>({
    resource: "production-orders",
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
        accessorKey: "id", //access nested data with dot notation
        header: "#",
      },
      {
        accessorKey: "saleOrder.customer.name",
        header: "Khách hàng",
      },
      {
        accessorKey: "item.name",
        header: "Sản phẩm",
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
      },
      {
        accessorKey: "item.uom.name", //normal accessorKey
        header: "Đơn vị tính",
      },
    ],
    []
  );

  return (
    <Page>
      <Table
        positionActionsColumn="last"
        enableRowActions
        renderRowActionMenuItems={({ row }) => [
          <Menu.Item onClick={() => console.info("Edit")}>Edit</Menu.Item>,
          <Menu.Item onClick={() => console.info("Delete")}>Delete</Menu.Item>,
        ]}
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
    </Page>
  );
};
