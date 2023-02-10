import { useState } from "react";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import { BsKeyFill } from "react-icons/bs";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

type Props = InputProps;

export default function PasswordInput(props: Props) {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <InputGroup>
        <InputLeftElement>
          <Icon as={BsKeyFill} />
        </InputLeftElement>
        <Input
          {...props}
          type={show ? "text" : "password"}
          placeholder={"Password"}
        />
        <InputRightElement>
          <Button variant={"ghost"} onClick={handleClick}>
            {show ? <Icon as={IoEyeOutline} /> : <Icon as={IoEyeOffOutline} />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
}
