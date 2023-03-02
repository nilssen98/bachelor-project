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
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdLinkOff } from "react-icons/md";
import { getProviderLogo } from "../pages/profile/connections";

interface Props {
  provider: string;
  onDisconnect: (provider: string) => void;
}

export default function ConnectionCard(props: Props) {
  return (
    <>
      <Card width={"full"} variant={"outline"}>
        <CardBody>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <HStack alignItems={"center"} spacing={2}>
              {getProviderLogo(props.provider)}
              <Text
                fontSize={"xl"}
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
                icon={<Icon boxSize={6} as={BiDotsVerticalRounded} />}
              />
              <MenuList>
                <MenuItem
                  color={"red.500"}
                  icon={<MdLinkOff />}
                  onClick={() => props.onDisconnect(props.provider)}
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
