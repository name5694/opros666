"use client";
import { IconButton, Sheet, Tooltip } from "@mui/joy";
import React, { FC, useEffect, useRef, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const LinkClient: FC<{ subLink: string }> = ({ subLink }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const timerId = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [link, setLink] = useState("");
  useEffect(() => {
    setLink(`${window.origin}/${subLink}`);
  }, [subLink]);
  const onCopy = () => {
    navigator.clipboard.writeText(link);
    setTooltipOpen(true);
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      setTooltipOpen(false);
    }, 1000);
  };

  const onGoAway = () => {
    window.open(link, "_blank");
  };

  return (
    <Sheet
      variant="outlined"
      color="neutral"
      sx={{
        p: 1,
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 8,
      }}
    >
      <span className="break-all">{link}</span>

      <Tooltip
        title="Скопировано"
        variant="outlined"
        open={tooltipOpen}
        sx={{ borderRadius: 4 }}
        placement="top"
      >
        <IconButton variant="outlined" onClick={onCopy}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Перейти"
        variant="outlined"
        sx={{ borderRadius: 4 }}
        placement="top"
      >
        <IconButton variant="outlined" onClick={onGoAway}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
    </Sheet>
  );
};
