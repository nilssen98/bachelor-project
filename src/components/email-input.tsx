import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";

type Props = InputProps;

export default function EmailInput(props: Props) {
  return (
    <>
      <InputGroup>
        <Input {...props} placeholder={"Email"} />
        <InputLeftElement>
          <Icon as={MdOutlineEmail} />
        </InputLeftElement>
      </InputGroup>
    </>
  );
}
