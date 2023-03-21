import { Button, Grid, GridItem } from "@chakra-ui/react";
import Chip from "./chip";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { initial } from "lodash-es";
import { useWindowResize } from "../hooks/useWindowResize";

interface Props {
  templateId?: string;
  configId?: string;
}

export default function ConfigurationSwitcher(props: Props) {
  const router = useRouter();

  const { data: configurations } = api.configuration.getAll.useQuery(
    { templateId: props.templateId || "" },
    {
      enabled: props.templateId !== undefined,
    }
  );
  const [expanded, setExpanded] = useState<boolean>(false);

  const [width] = useWindowResize();

  const [displayCount, setDisplayCount] = useState<number | undefined>(8);
  const [elementsRow, setElementsRow] = useState<number>(8);

  function findElementsPerRow() {
    console.log("Find elements called");
    const size = Math.floor((width - 32) / 130);
    setElementsRow(size > 8 ? 8 : size);
    calculateDisplayedChips();
  }

  useEffect(() => {
    findElementsPerRow();
  }, [width]);

  const handleChipClick = async (configurationId: string) => {
    await router.push(`/configurations/${configurationId}`);
  };

  const handleExpandButton = () => {
    console.log("Handled!");
    setExpanded(!expanded);
    calculateDisplayedChips();
  };

  function calculateDisplayedChips() {
    if (!expanded) {
      if (configurations != undefined && configurations.length == elementsRow)
        setDisplayCount(elementsRow);
      else {
        setDisplayCount(elementsRow - 1);
      }
    } else {
      setDisplayCount(undefined);
    }
    console.log("Expanded: ", expanded);
    console.log("Display count: ", displayCount);
    console.log("Elements per row", elementsRow);
  }

  function chipExpandButton() {
    if (configurations != undefined && configurations.length > elementsRow) {
      return (
        <Button size={"medium"} onClick={handleExpandButton}>
          {expanded ? "See less..." : "View more..."}
        </Button>
      );
    }
  }
  return (
    <>
      <Grid
        gap={2}
        w={"full"}
        paddingY={2}
        templateColumns={`repeat(${elementsRow}, 1fr)`}
      >
        {configurations?.slice(0, displayCount).map((configuration, idx) => (
          <GridItem w={"100%"} key={idx}>
            <Chip
              name={configuration.name}
              validated={configuration.valid}
              selected={props.configId == configuration.id}
              onClick={() => void handleChipClick(configuration.id)}
            />
          </GridItem>
        ))}
        {chipExpandButton()}
      </Grid>
    </>
  );
}
