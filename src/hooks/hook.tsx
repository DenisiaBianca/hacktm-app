import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useMount } from "react-use";

interface ICapabilities {
  webp: boolean;
  mobile: boolean;
  cookies: any;
}

const defaultCapabilities = {
  webp: false,
  mobile: false,
  cookies: {},
};

type Options = {
  breakpoint?: Breakpoint;
};

const CapabilitiesContext = createContext<ICapabilities>(defaultCapabilities);

const useMobile = (options?: Options): boolean => {
  const [isMounted, setIsMounted] = useState(false);
  const { mobile: isMobileServer } = useContext(CapabilitiesContext);
  const isMobileClient = useMediaQuery(
    useTheme().breakpoints.down(options?.breakpoint ?? "sm"),
    { noSsr: true }
  );

  useMount(() => {
    setIsMounted(true);
  });

  return isMounted ? isMobileClient : isMobileServer;
};

export default useMobile;
