export interface Partner {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  country?: string;
  is_customer?: boolean;
  is_supplier?: boolean;
}

export interface SaleOrder {
  id: number;
  customer: {
    id: number;
    name: string;
  };
  partners: Partner;
  productableSaleLineCount: string;
  productionOrderCount: string;
  sale_order_lines: SaleOrderLine[];
}

export interface ProductionOrder {
  id: number;
  saleOrder: SaleOrder;
  item: Item;
  quantity: number;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  cost: number;
  category: string;
  uom: {
    name: string;
  };
  type: "mould" | "material" | "product";
}

export interface SaleOrderLine {
  id: number;
  sale_order: {
    id: number;
  };
  item: Item;
  quantity: number;
  unit_price: number;
}
