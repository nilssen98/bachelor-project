import type { InputProps } from "@chakra-ui/react";
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import omit from "lodash-es/omit";

type Props = {
  verify?: boolean;
} & InputProps;

export default function EmailInput(props: Props) {
  function isValid() {
    if (props.verify && typeof props.value === "string") {
      if (props.value.length === 0) {
        return true;
      }
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(props.value);
    }
    return true;
  }

  return (
    <>
      <InputGroup>
        <Input
          {...omit(props, ["verify"])}
          type={"email"}
          placeholder={"Email"}
          isInvalid={!isValid()}
        />
        <InputLeftElement>
          <Icon as={MdOutlineEmail} />
        </InputLeftElement>
      </InputGroup>
    </>
  );
}
