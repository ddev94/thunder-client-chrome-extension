import { useDebouncedCallback } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { useCollection } from "./use-collection";

export const useRequestCookie = () => {
  const { updateRequestItemById, item } = useCollection();
  const [cookieView, setCookieView] = useState<"key-value" | "view-raw">(
    "key-value"
  );
  const [rawCookies, setRawCookies] = useState("");
  const cookies = useMemo(() => {
    return item?.request?.cookies || [];
  }, [item]);

  const addCookie = () => {
    updateRequestItemById({
      cookies: [...cookies, { key: "", value: "", isDisabled: false }],
    });
  };

  const removeCookie = (index: number) => {
    const newCookies = [...cookies];
    newCookies.splice(index, 1);
    updateRequestItemById({
      cookies: newCookies,
    });
  };
  const disableCookie = (index: number) => {
    const newCookies = [...cookies];
    newCookies[index] = {
      ...newCookies[index],
      isDisabled: !newCookies[index].isDisabled,
    };
    updateRequestItemById({
      cookies: newCookies,
    });
  };

  const onKeyChange = useDebouncedCallback((index: number, newKey: string) => {
    const newCookies = [...cookies];
    newCookies[index] = { ...newCookies[index], key: newKey };
    updateRequestItemById({
      cookies: newCookies,
    });
  }, 500);
  const onValueChange = useDebouncedCallback((index: number, newValue: string) => {
    const newCookies = [...cookies];
    newCookies[index] = { ...newCookies[index], value: newValue };
    updateRequestItemById({
      cookies: newCookies,
    });
  }, 500);

  const importRawCookies = () => {
    const newCookies = rawCookies
      .split(";")
      .map((cookie) => cookie.trim())
      .map((cookie) => {
        const [key, value] = cookie.split("=");
        return { key: key.trim(), value: value.trim(), isDisabled: false };
      });

    updateRequestItemById({
      cookies: newCookies,
    });
  };

  return {
    cookies,
    addCookie,
    removeCookie,
    disableCookie,
    onKeyChange,
    onValueChange,
    cookieView,
    setCookieView,
    rawCookies,
    setRawCookies,
    importRawCookies,
  };
};
