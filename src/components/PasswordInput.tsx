import { useState } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";

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
        <InputRightElement width={"4.5rem"}>
          <Button size={"sm"} onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
}
