import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router-dom";
import { Breadcrumbs, Anchor } from "@mantine/core";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <Breadcrumbs
      sx={{
        padding: "0 1rem",
      }}
    >
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <Anchor href={breadcrumb.href} key={index} size={10}>
            {breadcrumb.label}
          </Anchor>
        );
      })}
    </Breadcrumbs>
  );
};
