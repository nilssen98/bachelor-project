import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

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
    Card: {
      defaultProps: {
        variant: "outline",
      },
    },
  },
});

export default theme;
