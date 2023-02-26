import {
  Button,
  Divider,
  Icon,
  keyframes,
  Stack,
  StackDivider,
  Tag,
  Text,
} from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import { range } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { useConfiguration } from "./configuration-provider";

export default function ConfigurationContent() {
  const { navigate, path, content } = useConfiguration();
  const [displayedContent, setDisplayedContent] = useState<Prisma.JsonObject[]>(
    [...(content.length === 1 ? [...content, {}] : content)]
  );
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (content.length <= 2) {
      setOffsetX(0);
    } else {
      setOffsetX((content.length - 2) * -50);
    }
    setDisplayedContent(content);
  }, [content]);

  const isHidden = (idx: number) => {
    if (content.length - 1 === idx) return false;
    if (content.length - 2 === idx) return false;
    return true;
  };

  console.log(content);

  // console.log(content.filter(Boolean));

  return (
    <>
      <Stack
        transform={`translateX(${offsetX}%)`}
        transition={"all 0.3s ease-in-out"}
        direction={"row"}
        spacing={0}
        flex={1}
      >
        {displayedContent.map((item, idx) => (
          <Stack
            transform={`translateX(${idx * 100}%)`}
            hidden={isHidden(idx)}
            key={idx}
            py={2}
            width={"50%"}
            spacing={2}
            position={"absolute"}
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

  if (typeof value === "object") {
    return (
      <ConfigurationFieldNavigation
        active={props.active}
        onClick={props.onClick}
        name={name}
        value={value}
      />
    );
  }

  return <ConfigurationFieldGeneric name={name} value={value} />;
}

function ConfigurationFieldGeneric(props: ConfigurationFieldProps) {
  const valueType = useMemo(() => typeof props.value, [props]);

  return (
    <>
      <Stack p={2} px={4} spacing={1} direction={"row"}>
        <Text>{props.name}: </Text>
        {props.value ? (
          <Text>
            {props.value.toString()} <Tag>{valueType}</Tag>
          </Text>
        ) : (
          <Text color={"gray.500"}>
            undefined <Tag>{valueType}</Tag>
          </Text>
        )}
      </Stack>
    </>
  );
}

function ConfigurationFieldNavigation(props: ConfigurationFieldProps) {
  const valueType = useMemo(() => {
    if (Array.isArray(props.value)) {
      return `array (${props.value.length})`;
    }
    return typeof props.value;
  }, [props]);

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
          {props.name} <Tag>{valueType}</Tag>
        </Text>
        <Icon as={MdArrowRight} fontSize={"xl"} />
      </Stack>
    </>
  );
}
