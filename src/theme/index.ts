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
    Menu: {
      baseStyle: {
        button: {},
        list: {
          background: "black",
        },
        item: {
          background: "black",
          _hover: {
            background: "whiteAlpha.400",
          },
        },
        groupTitle: {},
        command: {},
        divider: {},
      },
    },
  },
};

export default extendTheme(overrides);
