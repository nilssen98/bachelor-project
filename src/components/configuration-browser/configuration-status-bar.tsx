import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  Icon,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";

interface Props {
  errors?: string[];
}

export default function ConfigurationStatusBar(props: Props) {
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem border={0}>
          {props.errors &&
            props.errors.map((error, idx) => (
              <AccordionPanel
                px={4}
                py={2}
                sx={{ borderBottom: "1px solid", borderColor: "gray.700" }}
                key={idx}
              >
                {idx} - {error}
              </AccordionPanel>
            ))}
          <AccordionButton>
            {props.errors && props.errors.length > 0 ? (
              <HStack>
                <Icon as={MdErrorOutline} color={"red.500"} />
                <Text>{props.errors.length} Errors found</Text>
              </HStack>
            ) : (
              <Text color={"gray.500"}>No errors found</Text>
            )}
          </AccordionButton>
        </AccordionItem>
      </Accordion>
    </>
  );
}
