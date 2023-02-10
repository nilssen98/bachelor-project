import { Button } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";

type Props = {
  onClick: () => void;
} & ButtonProps;

//TODO - Modify size to fit with template page when its ready
export default function ImportButton(props: Props) {
  return (
    <>
      <Button {...props} onClick={props.onClick}>
        Add new
      </Button>
    </>
  );
}
