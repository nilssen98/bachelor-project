import { Button, Grid, GridItem, Show } from "@chakra-ui/react";
import Chip from "./chip";
import exp from "constants";
import { api } from "../utils/api";
import { cond, template } from "lodash-es";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "./loading";

interface Props {
  templateId: string;
  configId?: string;
}

export default function ConfigurationNavigator(props: Props) {
  const router = useRouter();

  const { data: configurations, isLoading } = api.configuration.getAll.useQuery(
    { templateId: props.templateId || "" },
    {
      enabled: props.templateId !== undefined,
    }
  );
  const [expanded, setExpanded] = useState<boolean>(false);

  const nonExpandedDisplay = configurations.length > 8 ? 7 : 8;
  const [displayCount, setDisplayCount] = useState<number>(nonExpandedDisplay);

  const handleCardClick = async (configurationId: string) => {
    await router.push(`/configurations/${configurationId}`);
  };

  const handleExpandButton = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setDisplayCount(configurations.length);
    } else {
      setDisplayCount(nonExpandedDisplay);
    }
  };

  function chipExpandButton() {
    if (configurations.length > 8) {
      return (
        <Button onClick={handleExpandButton}>
          {expanded ? "See less..." : "View more..."}
        </Button>
      );
    }
  }

  return (
    <>
      <Grid gap={2} w={"full"} templateColumns={"repeat(8, 1fr)"}>
        {configurations?.slice(0, displayCount).map((configuration, idx) => (
          <GridItem w={"100%"} key={idx}>
            <Chip
              name={configuration.name}
              validated={configuration.valid}
              selected={props.configId == configuration.id}
              onClick={() => void handleCardClick(configuration.id)}
            />
          </GridItem>
        ))}
        {chipExpandButton()}
      </Grid>
    </>
  );
}
