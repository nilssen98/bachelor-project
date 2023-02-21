import { Text, VStack } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "/public/assets/animations/404-page-not-found-animation-lottie.json";

export default function Custom404() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData as never,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <VStack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "full",
      }}
    >
      <Lottie
        options={defaultOptions}
        style={{
          height: "unset",
          width: "unset",
        }}
      />
      <Text fontSize={"7xl"}>404 - Page Not Found</Text>
    </VStack>
  );
}
