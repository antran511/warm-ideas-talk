import {
  HttpError,
  useApiUrl,
  useCustom,
  useCustomMutation,
  useInvalidate,
} from "@refinedev/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Table } from "src/components/table";
import { SaleOrderLine } from "src/interface";
import { randomId } from "@mantine/hooks";
import { isNotEmpty } from "@mantine/form";
import { Button, Group } from "@mantine/core";
import { modals } from "@mantine/modals";

interface ProductionOrderCreateProps {
  saleOrderId: number;
}

export const ProductionOrderCreate = ({
  saleOrderId,
}: ProductionOrderCreateProps) => {
  const apiUrl = useApiUrl();
  const [rowSelection, setRowSelection] = useState({});

  const { data, isLoading, isRefetching } = useCustom<
    SaleOrderLine[],
    HttpError
  >({
    url: `${apiUrl}/sale-orders/${saleOrderId}/lines`,
    method: "get",
    queryOptions: {
      onSuccess: (data) => {
        const saleOrderLines = data?.data ?? [];
        setRowSelection(
          saleOrderLines.reduce((acc, cur) => {
            acc[cur.id] = true;
            return acc;
          }, {} as Record<number, boolean>)
        );
      },
    },
  });
  const saleOrderLines: SaleOrderLine[] = data?.data ?? [];
  const columns = useMemo<MRT_ColumnDef<SaleOrderLine>[]>(
    () => [
      {
        accessorKey: "id",
        header: "#",
        hidden: true,
      },
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

  const { mutate, isLoading: isMutationLoading } = useCustomMutation();
  const invalidate = useInvalidate();

  return (
    <Table
      columns={columns}
      data={saleOrderLines}
      enablePagination={false}
      enableColumnFilters={false}
      enableRowSelection
      enableMultiRowSelection
      onRowSelectionChange={setRowSelection}
      getRowId={(originalRow) => String(originalRow?.id ?? randomId())}
      mantineSelectCheckboxProps={{
        size: "xs",
      }}
      mantineSelectAllCheckboxProps={{
        size: "xs",
      }}
      state={{
        isLoading: isLoading || isRefetching,
        rowSelection,
      }}
      renderBottomToolbar={() => (
        <Group position="right" pt="sm">
          <Button
            disabled={
              isMutationLoading || Object.keys(rowSelection).length === 0
            }
            onClick={() =>
              mutate(
                {
                  url: `${apiUrl}/production-orders/from-sale`,
                  method: "post",
                  values: {
                    saleLineIds: Object.keys(rowSelection),
                  },
                  successNotification: {
                    message: "Tạo lệnh sản xuất thành công",
                    type: "success",
                  },
                  errorNotification: {
                    message: "Tạo lệnh sản xuất thất bại",
                    type: "error",
                  },
                },
                {
                  onSuccess: () => {
                    modals.closeAll();
                    invalidate({
                      resource: "sale-orders",
                      invalidates: ["list", "many"],
                    });
                  },
                }
              )
            }
          >
            Tạo lệnh sản xuất
          </Button>
        </Group>
      )}
    />
  );
};
