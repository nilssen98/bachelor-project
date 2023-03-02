import type { ReactElement } from "react";
import {
  Button,
  Card,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { MdDelete, MdLogout } from "react-icons/md";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profile-sidebar-layout";
import UserAvatar from "../../components/user-avatar";
import { api } from "../../utils/api";

const GeneralPage: NextPageWithLayout = () => {
  const session = useSession();

  const { mutate: deleteAccount } = api.me.delete.useMutation({
    onSuccess: () => signOut(),
  });

  return (
    <>
      <Text fontSize={"3xl"} my={4}>
        General
      </Text>
      <VStack spacing={4} p={2}>
        <Card width={"full"}>
          <HStack p={4} justifyContent={"space-between"}>
            <HStack spacing={4}>
              <UserAvatar
                sx={{
                  height: "52px",
                  width: "52px",
                }}
              />
              <Text fontSize={"2xl"}>
                {session.data?.user?.email || "No email"}
              </Text>
            </HStack>
            <Button
              variant={"text"}
              color={"red.300"}
              _hover={{ color: "red.400", bg: "red.900" }}
              onClick={() => void signOut()}
              leftIcon={<MdLogout />}
            >
              Sign out
            </Button>
          </HStack>
        </Card>
        <Card>
          <Stack spacing={0} divider={<StackDivider />}>
            <Heading size={"md"} p={4}>
              Delete account
            </Heading>
            <Text p={4}>
              Permanently remove your account and all of its contents. This
              action is not reversible, please continue with caution.
            </Text>
            <Button
              variant={"outline"}
              alignSelf={"end"}
              borderColor={"red.300"}
              m={4}
              color={"red.300"}
              onClick={() => deleteAccount()}
              leftIcon={<MdDelete />}
            >
              Delete
            </Button>
          </Stack>
        </Card>
      </VStack>
    </>
  );
};

GeneralPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileSidebarLayout>{page}</ProfileSidebarLayout>;
};

export default GeneralPage;
