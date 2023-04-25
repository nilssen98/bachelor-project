import type { AvatarProps } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { omit } from "lodash-es";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { generateColor, generateSecondaryColor } from "../../utils/colorUtils";

type Props = {
  /**
   * The string to generate the avatar color from.
   */
  id?: string;
  /**
   * Should the avatar display a pointer cursor.
   */
  clickable?: boolean;
  /**
   * The icon to display in the avatar.
   */
  icon?: ReactNode;
} & AvatarProps;

export default function GradientAvatar(props: Props) {
  const avatarProps = omit(props, ["id", "icon", "clickable"]);

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
      sx={{
        cursor: `${props.clickable ? "pointer" : "default"}`,
        ...avatarProps.sx,
      }}
      {...avatarProps}
    />
  );
}
