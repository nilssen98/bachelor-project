import { Button, Icon, Text } from "@chakra-ui/react";
import router from "next/router";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function BackButton() {
  return (
    <Button
      px={0}
      leftIcon={<Icon as={MdKeyboardArrowLeft} />}
      variant={"text"}
      onClick={() => router.back()}
    >
      <Text alignSelf="center">Back</Text>
    </Button>
  );
}
