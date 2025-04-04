"use client";

import { useEffect, useState } from "react";

export default function RequestTimeDelta({
  requestTime,
  name,
}: {
  requestTime: number;
  name: string;
}) {
  const [timeDelta, setTimeDelta] = useState<number>(0);

  useEffect(() => {
    setTimeDelta((Date.now() - requestTime) / 1000.0);
  }, [requestTime]);

  return (
    <span suppressHydrationWarning>
      {name}: {timeDelta.toFixed(0)} seconds
    </span>
  );
}
