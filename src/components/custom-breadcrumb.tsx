import { Breadcrumb, BreadcrumbItem, Divider } from "@chakra-ui/react";
import Chip from "./chip";
import Link from "next/link";

function createConfigChips() {}

export default function CustomBreadcrumb() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem></BreadcrumbItem>
        <BreadcrumbItem>
          <Chip
            name={"Template"}
            validated={false}
            selected={false}
            onClick={() => null}
          ></Chip>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider></Divider>
    </>
  );
}
