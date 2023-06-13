import { HttpError, useList } from "@refinedev/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { Table } from "src/components/table";
import {
  Box,
  Button,
  Card,
  Group,
  HoverCard,
  Space,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { ProductionOrderCreate } from "src/components/saleOrder";
import { SaleOrder } from "src/interface";

interface IItem {
  name: string;
  uom: {
    name: string;
  };
  price: number;
  cost: number;
  purchase_uom: {
    name: string;
  };
}
import useCopy from "use-copy";

export const SaleOrderList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  });

  const { data, isLoading } = useList<SaleOrder, HttpError>({
    resource: "sale-orders",
    pagination: {
      current: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });
  const saleOrders = data?.data ?? [];

  const total = data?.meta?.total;
  const columns = useMemo<MRT_ColumnDef<SaleOrder>[]>(
    () => [
      {
        accessorKey: "id",
        header: "#",
      },
      {
        accessorKey: "customer.name", //access nested data with dot notation
        header: "Khách hàng",
        size: 300,
      },
      {
        accessorKey: "productableSaleLineCount",
        header: "Số mặt hàng cần sản xuất",
      },
      {
        accessorKey: "productionOrderCount",
        header: "Số lệnh sản xuất",
        Cell: ({ row }) => {
          return (
            <Group>
              <HoverCard openDelay={1000} width={280} shadow="md">
                <HoverCard.Target>
                  <div>{row.original.productionOrderCount}</div>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm">
                    Hover card is revealed when user hovers over target element,
                    it will be hidden once mouse is not over both target and
                    dropdown elements
                  </Text>
                </HoverCard.Dropdown>
              </HoverCard>
              <Button
                compact
                variant="light"
                onClick={() => {
                  modals.open({
                    title: "Dòng đơn hàng",
                    children: (
                      <ProductionOrderCreate saleOrderId={row.original.id} />
                    ),
                    size: "auto",
                  });
                }}
              >
                Tạo lệnh sx
              </Button>
            </Group>
          );
        },
      },
    ],
    []
  );
  return (
    <Table
      enableRowSelection
      columns={columns}
      data={saleOrders}
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
