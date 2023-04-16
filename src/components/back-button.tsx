import type { ButtonProps, IconProps, TypographyProps } from "@chakra-ui/react";
import { Button, Icon, Text } from "@chakra-ui/react";
import { omit } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdKeyboardArrowLeft } from "react-icons/md";

type Props = {
  href: string;
  disableText?: boolean;
  iconSize?: string;
} & ButtonProps;

BackButton.defaultProps = {
  iconSize: "1.4rem",
};

export default function BackButton(props: Props) {
  const router = useRouter();

  return (
    <Link href={props.href} passHref>
      <Button
        px={0}
        leftIcon={<Icon as={MdKeyboardArrowLeft} boxSize={props.iconSize} />}
        variant={"text"}
        {...omit(props, "href", "disableText")}
      >
        {!props.disableText && <Text alignSelf="center">Back</Text>}
      </Button>
    </Link>
  );
}
