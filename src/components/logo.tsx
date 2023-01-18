import { HStack, Text } from "@chakra-ui/react";
import logo from "../../public/logo.svg";
import Image from "next/image";

export default function Logo() {
  return (
    <HStack spacing={1} sx={{ userSelect: "none" }}>
      <Image color={"red"} height={56} width={56} alt={"logo"} src={logo} />
      <Text fontWeight={600} letterSpacing={3} fontSize={"4xl"}>
        CONFIGIFY
      </Text>
    </HStack>
  );
}
