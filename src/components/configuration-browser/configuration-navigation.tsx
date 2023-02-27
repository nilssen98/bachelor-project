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
import { useConfiguration } from "./configuration-provider";

export default function ConfigurationNavigation() {
  const { path, navigate } = useConfiguration();
  return (
    <>
      <Box p={4} overflowX={"auto"}>
        <Breadcrumb>
          <BreadcrumbItem onClick={() => navigate(0)}>
            <BreadcrumbLink alignItems={"center"}>
              <Center>
                <Icon fontSize={"2xl"} as={MdHome} />
              </Center>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {path.map((path, idx) => (
            <BreadcrumbItem onClick={() => navigate(idx + 1)} key={idx}>
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
