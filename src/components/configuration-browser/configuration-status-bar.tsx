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
import type { ValidationError } from "../../utils/validator/types";
import {
  useConfiguration,
  useConfigurationRouter,
} from "./configuration-provider";

export default function ConfigurationStatusBar() {
  const { errors } = useConfiguration();
  const router = useConfigurationRouter();

  const handleClick = (error: ValidationError) => {
    router.set(error.path.split("/").filter((p) => p !== ""));
  };

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem border={0}>
          {errors &&
            errors.map((error, idx) => (
              <AccordionPanel
                p={0}
                onClick={() => handleClick}
                sx={{ borderBottom: "1px solid", borderColor: "gray.700" }}
                key={idx}
              >
                <AccordionButton
                  onClick={() => handleClick(error)}
                  sx={{ "&:hover": { background: "gray.900" } }}
                >
                  {idx}: {error.path === "" ? "root" : error.path} -{" "}
                  {error.message}
                </AccordionButton>
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
