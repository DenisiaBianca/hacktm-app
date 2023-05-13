import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useMount } from "react-use";
import Cookies from "universal-cookie";
import { ITokenUser } from "../interfaces/interfaces";

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

export const useMobile = (options?: Options): boolean => {
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

export const isLogged = (): boolean => {
  const cookies = new Cookies();
  return cookies.get("userToken") == null ? false : true;
};

export const getToken = (): string => {
  const cookies = new Cookies();
  return cookies.get("userToken");
};

export const parseJwt = (token: string): ITokenUser | undefined => {
  if (token === "" || !token) {
    return;
  }

  const base64Url = token.split(".")[1];
  if (!base64Url) {
    return;
  }

  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
