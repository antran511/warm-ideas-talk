import { Box, Flex } from "@mantine/core";
import {
  MRT_GlobalFilterTextInput,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  MantineReactTableProps,
} from "mantine-react-table";
import { IconNewSection } from "@tabler/icons-react";
export const Table = ({ columns, data, ...rest }: MantineReactTableProps) => {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      mantineTopToolbarProps={{
        sx: {
          padding: "0px",
          minHeight: "2.2rem",
          div: {
            padding: "0px",
          },
          position: "absolute",
        },
      }}
      initialState={{
        showGlobalFilter: true,
        ...rest.initialState,
      }}
      {...rest}
      mantineBottomToolbarProps={{
        sx: {
          position: "fixed",
          bottom: "0px",
        },
      }}
      mantineTableBodyCellProps={{
        sx: {
          padding: "0.5rem 0rem !important",
          border: "none",
        },
      }}
      mantinePaperProps={{
        withBorder: false,
        shadow: "none",
      }}
      mantineTableContainerProps={{
        sx: {
          flex: "1 1 auto",
          overflow: "auto",
        },
      }}
      mantineTableHeadCellProps={{
        sx: {
          "& .mantine-TableHeadCell-Content": {
            justifyContent: "space-between",
          },
          padding: "0.75rem 0 !important",
        },
      }}
      mantineTableProps={{
        sx: {
          border: "none",
        },
      }}
      mantineTableBodyRowProps={{
        sx: {
          border: "none",
        },
      }}
      mantineSearchTextInputProps={{
        variant: "default",
        placeholder: "Tìm kiếm",
      }}
      renderTopToolbar={({ table }) => (
        <Flex justify="space-between">
          <Box></Box>
          <Flex>
            <MRT_ToggleFiltersButton table={table} />
            <MRT_ShowHideColumnsButton table={table} />
            <MRT_GlobalFilterTextInput table={table} />
          </Flex>
        </Flex>
      )}
      enableStickyHeader={true}
    />
  );
};
