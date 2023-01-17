import { Stack, Button, Text } from "@chakra-ui/react";
import { useSession, signOut, signIn } from "next-auth/react";

export default function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <Stack>
      {sessionData && <Text>Logged in as {sessionData.user?.name}</Text>}
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </Stack>
  );
}
