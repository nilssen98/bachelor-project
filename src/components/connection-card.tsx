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
  Tooltip,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdLinkOff } from "react-icons/md";
import ProviderIcon from "./provider-icon";

interface Props {
  provider: string;
  onDisconnect: (provider: string) => void;
  /**
   * Number of connections that the user has.
   */
  connections: number;
}

export default function ConnectionCard(props: Props) {
  const disconnectDisabled =
    props.connections < 2 || props.provider.toLowerCase() === "email";

  function getLabel() {
    if (props.connections < 2 && !(props.provider.toLowerCase() === "email")) {
      return "You must have at least one connection!";
    }
    return `Cannot disconnect from the ${props.provider} provider`;
  }

  return (
    <>
      <Card width={"full"} variant={"outline"}>
        <CardBody>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <HStack alignItems={"center"} spacing={2}>
              {<ProviderIcon provider={props.provider} />}
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
              <Tooltip
                hasArrow
                label={getLabel()}
                isDisabled={!disconnectDisabled}
              >
                <MenuButton
                  background={"none"}
                  as={IconButton}
                  isDisabled={disconnectDisabled}
                  icon={<Icon boxSize={6} as={BiDotsVerticalRounded} />}
                />
              </Tooltip>
              <MenuList>
                <MenuItem
                  color={"red.600"}
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
