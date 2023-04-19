import { Icon } from "@chakra-ui/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import type { IconProps } from "@chakra-ui/react";
import { IoMailOpenOutline } from "react-icons/io5";
import { omit } from "lodash-es";

type Props = {
  provider: string;
} & IconProps;

export default function ProviderIcon(props: Props) {
  function getIcon(provider: string) {
    switch (provider.toLowerCase()) {
      case "google":
        return FaGoogle;
      case "github":
        return FaGithub;
      case "email":
        return IoMailOpenOutline;
      default:
        return null;
    }
  }

  return (
    <Icon
      as={getIcon(props.provider) ?? undefined}
      {...omit(props, "provider")}
    />
  );
}
