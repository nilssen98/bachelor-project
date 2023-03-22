import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Icon,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import { useConfigurationRouter } from "./configuration-provider";

export default function ConfigurationNavigation() {
  const router = useConfigurationRouter();
  return (
    <>
      <Box p={4} overflowX={"auto"}>
        <Breadcrumb>
          <BreadcrumbItem onClick={() => router.set([])}>
            <BreadcrumbLink alignItems={"center"}>
              <Center>
                <Icon fontSize={"2xl"} as={MdHome} />
              </Center>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {router.path.map((path, idx) => (
            <BreadcrumbItem
              onClick={() => router.set(router.path.slice(idx + 1))}
              key={idx}
            >
              <BreadcrumbLink>
                <Tag>
                  <Text fontSize={"md"}>{path}</Text>
                </Tag>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Box>
    </>
  );
}
