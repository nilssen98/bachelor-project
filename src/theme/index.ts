import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Button } from "./button";
import { Card } from "./card";
import { Input } from "./input";

export const navbarHeight = "64px";

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
    Popover: {
      baseStyle: {
        content: {
          background: "black",
        },
      },
    },
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
    Modal: {
      baseStyle: {
        dialog: {
          background: "black",
          border: "1px solid",
          borderColor: "whiteAlpha.400",
        },
      },
    },
  },
};

export default extendTheme(overrides);
