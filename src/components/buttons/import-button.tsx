import type { ButtonProps } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function ImportButton(props: ButtonProps) {
  return (
    <>
      <Button {...props}>Add new</Button>
    </>
  );
}
