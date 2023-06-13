import { Select } from "@mantine/core";
import { Partner } from "src/interface";
import { useSelect, useCreate } from "@refinedev/core";
import { useState } from "react";

interface PartnerSelectProps {
  [rest: string]: unknown;
}
export const PartnerSelect = (props: PartnerSelectProps) => {
  const [partner, setPartner] = useState<string | null>(null);
  const { options } = useSelect<Partner>({
    resource: "partners",
    filters: [{ field: "isCustomer", operator: "eq", value: true }],
    optionLabel: "name",
    optionValue: "id",
    debounce: 500,
  });
  const { mutate } = useCreate();
  return (
    <Select
      withinPortal
      zIndex={999}
      required
      onCreate={(query) => {
        mutate(
          {
            resource: "partners",
            values: {
              name: query,
              isCustomer: true,
            },
            meta: {
              select: "id, name",
            },
          },
          {
            onSuccess(data) {
              const newPartner = data?.data;
              const item = { value: newPartner?.id, label: newPartner?.name };
              setPartner(item.value as string);
            },
          }
        );
        return "25";
      }}
      value={partner}
      onChange={setPartner}
      mt={8}
      data={options}
      {...props}
      searchable
      filterDataOnExactSearchMatch
      clearable
      nothingFound="Không tìm thấy khách hàng"
      label="Khách hàng"
      placeholder="Công ty ABC"
      creatable
      getCreateLabel={(query) => `+ Thêm ${query}`}
    />
  );
};
