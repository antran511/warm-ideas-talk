import { Stack, Box, Title, Flex, Button } from "@mantine/core";
import { Breadcrumb } from "../breadcrumb";

type Props = {
  children: React.ReactNode;
  createButtonProps?: React.ComponentProps<typeof Button>;
  withPadding?: boolean;
};

export const Page: React.FC<Props> = ({
  children,
  createButtonProps,
  withPadding,
}) => {
  return (
    <Stack
      mah="inherit"
      sx={{
        overflow: "hidden",
        height: "100%",
        paddingTop: "1rem",
      }}
    >
      <Breadcrumb />
      <Flex
        justify="space-between"
        sx={{
          padding: "0 1rem",
        }}
      >
        <Title order={2}>Temporaty title</Title>
        <Button {...createButtonProps}>Tạo hàng hoá</Button>
      </Flex>
      <Box
        sx={{
          flex: "1 1 auto",
          overflow: "hidden",
          padding: withPadding ? "0 1rem" : "0",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
