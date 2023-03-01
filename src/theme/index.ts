import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Button } from "./button";
import { Card } from "./card";
import { Input } from "./input";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const overrides = {
  config,
  styles: {
    global: {
      body: {
        bg: "#000000",
      },
    },
  },
  components: {
    Card,
    Button,
    Input,
    Divider: {
      baseStyle: {
        borderColor: "whiteAlpha.400",
      },
    },
    StackDivider: {
      baseStyle: {
        borderColor: "whiteAlpha.400",
      },
    },
  },
};

export default extendTheme(overrides);
