import { Box } from "@chakra-ui/react";
import type { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Box
        minH={"100vh"}
        sx={{
          backgroundImage: `radial-gradient(#343a40 2px, transparent 2px), radial-gradient(#343a40 2px, transparent 2px)`,
          backgroundSize: "120px 120px",
          backgroundPosition: "0 0, 60px 60px",
        }}
      >
        {children}
      </Box>
    </>
  );
}
