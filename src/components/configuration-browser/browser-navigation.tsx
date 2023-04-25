import type { StackProps } from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Icon,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { range } from "lodash-es";
import { MdHome } from "react-icons/md";
import { useBrowserRouter } from "./hooks/useBrowserRouter";

export default function BrowserNavigation(props: StackProps) {
  const router = useBrowserRouter();

  const handleClick = (idx: number) => {
    const newPath = [...router.path];
    range(idx + 1, newPath.length).forEach((_) => newPath.pop());
    router.set(newPath);
  };

  return (
    <>
      <Stack
        align={"start"}
        w={"full"}
        px={4}
        py={2}
        overflowX={"auto"}
        {...props}
      >
        <Breadcrumb>
          <BreadcrumbItem onClick={() => router.set([])}>
            <BreadcrumbLink alignItems={"center"}>
              <Center>
                <Icon fontSize={"2xl"} as={MdHome} />
              </Center>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {router.path.map((path, idx) => (
            <BreadcrumbItem onClick={() => handleClick(idx)} key={idx}>
              <BreadcrumbLink>
                <Tag>
                  <Text fontSize={"md"}>{path}</Text>
                </Tag>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Stack>
    </>
  );
}
