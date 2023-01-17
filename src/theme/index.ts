import {
  defineStyleConfig,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import { cardTheme } from "./card";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "#000000",
      },
    },
  },
  components: {
    Card: cardTheme,
  },
});

export default theme;
