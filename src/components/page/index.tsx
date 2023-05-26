import { Stack, Box, Title, Flex, Button } from "@mantine/core";
import { Breadcrumb } from "../breadcrumb";

type Props = {
  children: React.ReactNode;
  createButtonProps?: React.ComponentProps<typeof Button>;
};

export const Page: React.FC<Props> = ({ children, createButtonProps }) => {
  return (
    <Stack
      mah="inherit"
      sx={{
        overflow: "hidden",
      }}
    >
      <Breadcrumb />
      <Flex justify="space-between">
        <Title order={2}>Temporaty title</Title>
        <Button {...createButtonProps}>Tạo hàng hoá</Button>
      </Flex>
      <Box
        sx={{
          flex: "1 1 auto",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
