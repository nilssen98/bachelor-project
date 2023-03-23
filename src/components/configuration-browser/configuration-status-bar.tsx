import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";
import { useConfiguration } from "./configuration-provider";

export default function ConfigurationStatusBar() {
  const { errors } = useConfiguration();
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem border={0}>
          {errors &&
            errors.map((error, idx) => (
              <AccordionPanel
                px={4}
                py={2}
                sx={{ borderBottom: "1px solid", borderColor: "gray.700" }}
                key={idx}
              >
                {idx}: {error.path === "" ? "root" : error.path} -{" "}
                {error.message}
              </AccordionPanel>
            ))}
          <AccordionButton>
            {errors && errors.length > 0 ? (
              <HStack>
                <Icon as={MdErrorOutline} color={"red.500"} />
                <Text>{errors.length} Errors found</Text>
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
