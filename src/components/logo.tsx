import { HStack, Text } from "@chakra-ui/react";
import type { StackProps, TypographyProps } from "@chakra-ui/react";
import Image from "next/image";
import omit from "lodash-es/omit";
import logo from "../../public/logo.svg";

type Props = {
  logoHeight?: number;
  fontSize?: TypographyProps["fontSize"];
} & StackProps;

export default function Logo(props: Props) {
  const hStackBaseProps = omit(props, ["logoHeight", "fontSize"]);

  return (
    <HStack spacing={4} sx={{ userSelect: "none" }} {...hStackBaseProps}>
      <Image
        color={"red"}
        alt={"logo"}
        src={logo as string}
        draggable={false}
        style={{
          height: props.logoHeight || 42,
          width: props.logoHeight || 42,
        }}
      />
      <Text letterSpacing={3} fontSize={props.fontSize || "4xl"}>
        CONFIGIFY
      </Text>
    </HStack>
  );
}
