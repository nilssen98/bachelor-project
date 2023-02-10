import { Center, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center h={"full"}>
      <Spinner size={"xl"} />
    </Center>
  );
}
