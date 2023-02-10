import { useState } from "react";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

type Props = InputProps;

export default function PasswordInput(props: Props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <InputGroup>
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
