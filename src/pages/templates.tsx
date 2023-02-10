import {
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import { api } from "../utils/api";

const TemplatesPage: NextPage = () => {
  const { data: templates } = api.template.getAll.useQuery();
  return (
    <>
      <VStack alignItems={"flex-start"} spacing={4} width={"full"}>
        <Text fontSize={"5xl"}>Templates</Text>
        <HStack width={"full"}>
          <Button>Add new</Button>
          <Input placeholder={"Search"} />
        </HStack>
        <Grid w={"full"} templateColumns="repeat(5, 1fr)" gap={4}>
          {templates?.map((template, idx) => (
            <GridItem w={"100%"} key={idx}>
              <Card p={4}>
                <Text>{template.name}</Text>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </>
  );
};

export default TemplatesPage;
