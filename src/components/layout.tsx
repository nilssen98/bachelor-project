import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Box minH={"100vh"}>{children}</Box>
    </>
  );
}
