import { Link, Text, VStack } from "@chakra-ui/react";
import type { Options } from "react-lottie";
import Lottie from "react-lottie";
import animationData from "public/assets/animations/404_animation_lottie.json";
import NextLink from "next/link";

export default function Custom404() {
  const defaultOptions: Options = {
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
          height: "30%",
          width: "unset",
          pointerEvents: "none",
        }}
      />
      <Text fontSize={"6xl"}>Oops, Page not found</Text>
      <Text color={"gray.400"} fontSize={"xl"}>
        The page you are trying to reach does not exist
      </Text>
      <Text color={"gray.400"} fontSize={"xl"}>
        <Link fontWeight={"medium"} as={NextLink} href="/">
          Click here
        </Link>{" "}
        to go to the home page
      </Text>
    </VStack>
  );
}
