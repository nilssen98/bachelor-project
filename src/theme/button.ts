import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  variants: {
    custom: {
      paddingLeft: 8,
      paddingRight: 8,
      color: "black",
      backgroundColor: "white",
      border: "1px solid white",
      transition: "all 0.2s ease-in-out",
      _hover: { bg: "black", color: "white" },
    },
  },
});
