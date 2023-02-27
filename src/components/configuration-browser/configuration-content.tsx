import { Icon, Stack, Tag, Text } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { generateColor } from "../../utils/colorUtils";
import { useConfiguration } from "./configuration-provider";

export default function ConfigurationContent() {
  const { navigate, path, content } = useConfiguration();
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (content.length <= 2) {
      setOffsetX(0);
    } else {
      setOffsetX((content.length - 2) * -50);
    }
  }, [content]);

  const filteredContent = useMemo(() => {
    return [...(content.length === 1 ? [...content, {}] : content)];
  }, [content]);

  return (
    <>
      <Stack
        transform={`translateX(${offsetX}%)`}
        transition={"all 0.3s ease-in-out"}
        direction={"row"}
        spacing={0}
        flex={1}
      >
        {filteredContent.map((item, idx) => (
          <Stack
            transform={`translateX(${idx * 100}%)`}
            key={idx}
            py={2}
            width={"50%"}
            height={"100%"}
            spacing={2}
            position={"absolute"}
            borderRight={filteredContent.length - 1 === idx ? 0 : "1px solid"}
            borderColor={"gray.600"}
            overflowY={"auto"}
          >
            {Object.entries(item).map(([key, value], idx) => (
              <ConfigurationField
                onClick={() => navigate(key)}
                key={idx}
                name={key}
                active={path[path.length - 1] === key}
                value={value as Prisma.JsonObject}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </>
  );
}

interface ConfigurationFieldProps {
  name: string;
  value?: Prisma.JsonValue;
  active?: boolean;
  onClick?: () => void;
}

function ConfigurationField(props: ConfigurationFieldProps) {
  const { name, value } = props;

  const valueType = useMemo(() => {
    if (Array.isArray(props.value)) {
      return "array";
    }
    return typeof props.value;
  }, [props]);

  const getColor = (type: string) => {
    return generateColor(type, 80, 30);
  };

  if (valueType !== "object") {
    return (
      <Stack p={2} px={4} spacing={1} direction={"row"}>
        <Text>{name}: </Text>
        {value ? (
          <Text>
            {value.toString()} <Tag bg={getColor(valueType)}>{valueType}</Tag>
          </Text>
        ) : (
          <Text color={"gray.500"}>
            undefined <Tag>{valueType}</Tag>
          </Text>
        )}
      </Stack>
    );
  }

  return (
    <>
      <Stack
        onClick={props.onClick}
        p={2}
        px={4}
        sx={{
          "&:hover": { bg: "gray.700" },
          bg: props.active ? "gray.700" : "default",
        }}
        direction={"row"}
        alignItems={"center"}
        cursor={"pointer"}
        justifyContent={"space-between"}
      >
        <Text>
          {props.name}{" "}
          <Tag bg={getColor(valueType)}>{`${valueType} (${
            Array.isArray(props.value)
              ? props.value.length
              : Object.values(props.value).length
          })`}</Tag>
        </Text>
        <Icon as={MdArrowRight} fontSize={"xl"} />
      </Stack>
    </>
  );
}
