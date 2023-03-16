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
   * Disable the disconnect button, used for providers that cannot be disconnected.
   */
  disabled?: boolean;
}

export default function ConnectionCard(props: Props) {
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
                label={`Cannot disconnect from the ${props.provider} provider`}
                isDisabled={!props.disabled}
              >
                <MenuButton
                  background={"none"}
                  as={IconButton}
                  isDisabled={props.disabled}
                  icon={<Icon boxSize={6} as={BiDotsVerticalRounded} />}
                />
              </Tooltip>
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
