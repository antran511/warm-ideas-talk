import { useLogout, useMenu } from "@refinedev/core";
import { NavLink } from "react-router-dom";
import { Box, NavLink as MantineLink } from "@mantine/core";

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems } = useMenu();

  return (
    <nav className="menu">
      {/* <Box>
        {menuItems.map((item) => (
          <NavLink to={item.route} key={item.key}>
            <MantineLink label={item.label} />
          </NavLink>
        ))}
      </Box> */}
    </nav>
  );
};
