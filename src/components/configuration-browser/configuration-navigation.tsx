import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useConfiguration } from "./configuration-provider";

export default function ConfigurationNavigation() {
  const { path, navigate } = useConfiguration();
  return (
    <>
      <Box p={4}>
        <Breadcrumb>
          <BreadcrumbItem onClick={() => navigate(0)}>
            <BreadcrumbLink>root</BreadcrumbLink>
          </BreadcrumbItem>
          {path.map((path, idx) => (
            <BreadcrumbItem onClick={() => navigate(idx + 1)} key={idx}>
              <BreadcrumbLink>{path}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Box>
    </>
  );
}
