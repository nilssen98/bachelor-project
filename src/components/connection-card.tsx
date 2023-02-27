import {
  Card,
  CardBody,
  HStack,
  Icon,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdLinkOff } from "react-icons/md";
import { api } from "../utils/api";

interface Props {
  provider: string;
}

function getLogo(provider: string): JSX.Element {
  const fontSize = "md";
  switch (provider.toLowerCase()) {
    case "google":
      return <Icon as={FaGoogle} fontSize={fontSize} />;
    case "email":
      return <Icon as={IoMailOpenOutline} fontSize={fontSize} />;
    default:
      return <Text>No logo</Text>;
  }
}

export default function ConnectionCard(props: Props) {
  const trpc = api.useContext();

  const { mutate: unlink } = api.me.unlink.useMutation({
    onSuccess: () => trpc.me.invalidate(),
  });

  function handleDisconnect() {
    unlink({ provider: props.provider.toLowerCase() });
  }

  return (
    <>
      <Card width={"full"} variant={"outline"}>
        <CardBody>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <HStack alignItems={"center"} spacing={2}>
              {getLogo(props.provider)}
              <Text
                fontSize={"1xl"}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {props.provider}
              </Text>
            </HStack>
            <Menu autoSelect={false}>
              <MenuButton
                background={"none"}
                as={IconButton}
                icon={<Icon fontSize={"md"} as={BiDotsVerticalRounded} />}
              />
              <MenuList>
                <MenuItem
                  color={"red.500"}
                  icon={<MdLinkOff />}
                  onClick={handleDisconnect}
                >
                  {`Disconnect ${props.provider}`}
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
}
