import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";

type Props = {
  verify?: boolean;
} & InputProps;

export default function EmailInput(props: Props) {
  function isValid() {
    if (props.verify) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(props.value as string);
    }
    return true;
  }

  return (
    <>
      <InputGroup>
        <Input {...props} on isInvalid={!isValid()} placeholder={"Email"} />
        <InputLeftElement>
          <Icon as={MdOutlineEmail} />
        </InputLeftElement>
      </InputGroup>
    </>
  );
}
