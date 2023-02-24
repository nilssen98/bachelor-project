import { Card, CardBody, HStack, Text } from "@chakra-ui/react";
import { getLogo } from "../pages/auth/signin";

interface Props {
  provider: string;
}
export default function ConnectionCard(props: Props) {
  return (
    <>
      <Card width={"full"} height={16} variant={"outline"}>
        <CardBody>
          <HStack alignItems={"center"} spacing={2}>
            {getLogo(props.provider)}
            <Text
              fontSize={"sm"}
              fontWeight={"bold"}
              sx={{
                textTransform: "capitalize",
              }}
            >
              {props.provider}
            </Text>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
}
