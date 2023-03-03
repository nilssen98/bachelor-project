import { Button, Grid, GridItem } from "@chakra-ui/react";
import Chip from "./chip";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

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

  const nonExpandedDisplay =
    configurations != undefined && configurations.length > 8 ? 7 : 8;
  const [displayCount, setDisplayCount] = useState<number>(nonExpandedDisplay);

  const handleChipClick = async (configurationId: string) => {
    await router.push(`/configurations/${configurationId}`);
  };

  const handleExpandButton = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setDisplayCount(configurations != undefined ? configurations.length : 8);
    } else {
      setDisplayCount(nonExpandedDisplay);
    }
  };

  function chipExpandButton() {
    if (configurations != undefined && configurations.length > 8) {
      return (
        <Button size={"medium"} onClick={handleExpandButton}>
          {expanded ? "See less..." : "View more..."}
        </Button>
      );
    }
  }

  return (
    <>
      <Grid gap={2} w={"full"} paddingY={2} templateColumns={"repeat(8, 1fr)"}>
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
