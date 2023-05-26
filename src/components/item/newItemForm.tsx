import { Select, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

export const NewItemForm = () => {
  const form = useForm({
    initialValues: {
      name: "",
      type: "product",
    },

    validate: {
      name: isNotEmpty("Tên hàng hoá bắt buộc"),
    },
  });
  return (
    <form>
      <Select
        label="Loại hàng hoá"
        placeholder="Chọn loại hàng hoá"
        data={[
          { value: "product", label: "Sản phẩm" },
          { value: "material", label: "Nguyên vật liệu" },
          { value: "service", label: "Dịch vụ" },
          { value: "mould", label: "Trục" },
        ]}
        withinPortal
        {...form.getInputProps("type")}
      />
      <TextInput label="Tên hàng hoá" {...form.getInputProps("name")} />
      <Select
        data={[]}
        label="Loại hàng hoá"
        placeholder="Chọn loại hàng hoá"
        withinPortal
        {...form.getInputProps("type")}
      />
    </form>
  );
};
