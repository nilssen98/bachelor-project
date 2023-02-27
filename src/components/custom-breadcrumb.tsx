import {
  Breadcrumb,
  BreadcrumbItem,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Props {
  templateId?: string;
}

export default function CustomBreadcrumb(props: Props) {
  const router = useRouter();

  const { data: templates } = api.template.getAll.useQuery();

  const handleCardClick = (templateId: string): Promise<boolean> => {
    return router.push(`/templates/${templateId}`);
  };

  const findTemplateName = () => {
    const id = props.templateId;
    if (id != undefined && templates != undefined) {
      const item = templates.find((t) => t.id == id);
      return item != undefined ? item.name : null;
    }
  };

  return (
    <>
      <Breadcrumb fontSize={"4xl"}>
        <BreadcrumbItem>
          <Text>Templates</Text>
        </BreadcrumbItem>
        {props.templateId != undefined ? (
          <BreadcrumbItem>
            <Menu size={"medium"}>
              <MenuButton>
                <HStack>
                  <Text>{findTemplateName()}</Text>
                  <RiArrowDropDownLine />
                </HStack>
              </MenuButton>
              <MenuList>
                {templates?.map((template, idx) => (
                  <MenuItem
                    onClick={() => void handleCardClick(template.id)}
                    key={idx}
                  >
                    {template.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </BreadcrumbItem>
        ) : null}
      </Breadcrumb>
      <Divider paddingTop={1} />
    </>
  );
}
