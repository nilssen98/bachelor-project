import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Card } from "./card";

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
  },
};

export default extendTheme(overrides);
