import { Avatar, HStack } from "@chakra-ui/react";
import Logo from "./logo";

interface Props {
  height: number;
}

export default function Navbar(props: Props) {
  return (
    <>
      <HStack
        as={"nav"}
        h={`${props.height}px`}
        p={1}
        justify={"space-between"}
      >
        <Logo fontSize={"1xl"} logoHeight={32} spacing={1.5} />
        <Avatar size={"sm"} />
      </HStack>
    </>
  );
}
