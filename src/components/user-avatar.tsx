import { Avatar } from "@chakra-ui/react";
import { useMemo } from "react";
import omit from "lodash-es/omit";
import type { AvatarProps } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { generateColor } from "../utils/colorUtils";

type Props = {
  /**
   * Should the avatar display a pointer cursor.
   */
  clickable?: boolean;
} & AvatarProps;

export default function UserAvatar(props: Props) {
  const avatarProps = omit(props, ["clickable"]);

  const { data: session } = useSession();

  const bgColor = useMemo<string>(
    () => generateColor(session?.user?.email || ""),
    [session]
  );

  return (
    <>
      <Avatar
        {...avatarProps}
        bg={bgColor}
        src={session?.user?.image || undefined}
        sx={{
          cursor: `${props.clickable ? "pointer" : "default"}`,
          ...avatarProps.sx,
        }}
      />
    </>
  );
}
