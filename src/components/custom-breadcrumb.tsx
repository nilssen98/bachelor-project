import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import Chip from "./chip";

export default function CustomBreadcrumb() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Chip name={"Template"}></Chip>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
}
