import type { AvatarProps } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { omit } from "lodash-es";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { HiDocumentText } from "react-icons/hi";
import { generateColor, generateSecondaryColor } from "../utils/colorUtils";

type Props = {
  id?: string;
  icon?: ReactNode;
} & AvatarProps;

export default function GradientAvatar(props: Props) {
  const colors: string[] = useMemo(() => {
    return [
      generateColor(props.id || ""),
      generateSecondaryColor(props.id || ""),
    ];
  }, [props]);

  return (
    <Avatar
      w={10}
      h={10}
      background={`linear-gradient(135deg, ${colors[0]!} 10%, ${colors[1]!} 90%)`}
      icon={props.icon || <></>}
      {...omit(props, "icon", "id")}
    />
  );
}
