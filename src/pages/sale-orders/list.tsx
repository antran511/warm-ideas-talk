import { useNavigation } from "@refinedev/core";
import { Page } from "src/components/page";
import { SaleOrderList as SaleComponent } from "src/components/saleOrder";
import { SaleOrderLineList as SaleLineComponent } from "src/components/saleOrderLine";
import { Tabs } from "@mantine/core";

export const SaleOrderList = () => {
  const { create } = useNavigation();
  return (
    <Page
      createButtonProps={{
        onClick: () => create("sale-orders"),
      }}
    >
      <SaleComponent />
    </Page>
  );
};
