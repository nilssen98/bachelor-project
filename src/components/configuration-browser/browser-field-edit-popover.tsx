import type { PopoverProps } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { HStack, Input } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { omit } from "lodash-es";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

type Props = {
  children: ReactNode;
  field: string;
  value: string;
  type: "string" | "number" | "boolean" | "null";
  errors?: string[];
  onCancel: () => void;
  onUpdate?: (
    field: string,
    value: string,
    type: "string" | "number" | "boolean" | "null"
  ) => void;
} & PopoverProps;

export default function BrowserFieldEditPopover(props: Props) {
  const [field, setField] = useState<string>(props.field);
  const [value, setValue] = useState<string>(props.value);
  const [type, setType] = useState<"string" | "number" | "boolean" | "null">(
    props.type
  );

  useEffect(() => {
    if (!props.isOpen) {
      setField(props.field);
      setValue(props.value);
      setType(props.type);
    }
  }, [props.field, props.isOpen, props.type, props.value]);

  const handleUpdate = () => {
    if (canUpdate && props.onUpdate) {
      props.onUpdate(field, value, type);
    }
  };

  const canUpdate = useMemo(() => {
    return ![field, value, type].some((v) => v.length === 0);
  }, [field, value, type]);

  const isInvalid = (val: string) => {
    const regex = /[\s!@#$%^&*()_+\-=[\]{};':"\\|,<>\/?]/;
    return regex.test(val);
  };

  return (
    <Popover {...omit(props, "children")}>
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <Portal>
        <PopoverContent minW={450} overflowY={"auto"}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <HStack flex={1}>
              <VStack align={"start"}>
                <Text fontSize={"sm"}>Field</Text>
                <Input
                  w={125}
                  isInvalid={isInvalid(field)}
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                />
              </VStack>
              <VStack align={"start"}>
                <Text fontSize={"sm"}>Type</Text>
                <Select
                  w={125}
                  value={type}
                  onChange={(e) =>
                    setType(
                      e.target.value as "string" | "number" | "boolean" | "null"
                    )
                  }
                >
                  <option value="string">string</option>
                  <option value="number">number</option>
                  <option value="boolean">boolean</option>
                  <option value="null">null</option>
                </Select>
              </VStack>
              {type !== "null" && (
                <VStack align={"start"}>
                  <Text fontSize={"sm"}>Value</Text>
                  <Input
                    w={"100%"}
                    isInvalid={isInvalid(value)}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </VStack>
              )}
            </HStack>
          </PopoverBody>
          <PopoverFooter>
            <HStack w={"full"} justify={"end"}>
              <Button onClick={props.onCancel} size={"sm"} variant={"ghost"}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} colorScheme={"blue"} size={"sm"}>
                Update
              </Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
