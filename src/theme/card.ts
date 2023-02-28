import { defineStyleConfig } from "@chakra-ui/react";

export const Card = defineStyleConfig({
  baseStyle: {
    bg: "black",
  },
  defaultProps: {
    variant: "outline",
  },
});
