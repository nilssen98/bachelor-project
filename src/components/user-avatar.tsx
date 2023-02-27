import { Avatar } from "@chakra-ui/react";
import { useMemo } from "react";
import type { AvatarProps } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { generateColor } from "../utils/colorUtils";

type Props = AvatarProps;

export default function UserAvatar(props: Props) {
  const { data: session } = useSession();

  const bgColor = useMemo<string>(
    () => generateColor(session?.user?.email || ""),
    [session]
  );

  return (
    <>
      <Avatar
        {...props}
        bg={bgColor}
        src={session?.user?.image || undefined}
        sx={{
          cursor: "pointer",
          ...props.sx,
        }}
      />
    </>
  );
}
