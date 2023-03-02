import { defineStyleConfig } from "@chakra-ui/react";

export const Card = defineStyleConfig({
  defaultProps: {
    variant: "outline",
  },
  variants: {
    outline: {
      container: {
        transition: "all .1s ease-in-out",
        background: "black",
        borderColor: "whiteAlpha.400",
      },
    },
  },
});
