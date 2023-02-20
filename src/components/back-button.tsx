import type { ButtonProps } from "@chakra-ui/react";
import { Button, Icon, Text } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { useRouter } from "next/router";
import { MdKeyboardArrowLeft } from "react-icons/md";

type Props = {
  href?: string;
} & ButtonProps;

export default function BackButton(props: Props) {
  const router = useRouter();

  const handleClick = async () => {
    if (props.href) {
      await router.push(props.href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      px={0}
      leftIcon={<Icon as={MdKeyboardArrowLeft} />}
      variant={"text"}
      onClick={() => void handleClick()}
      {...omit(props, "href")}
    >
      <Text alignSelf="center">Back</Text>
    </Button>
  );
}
