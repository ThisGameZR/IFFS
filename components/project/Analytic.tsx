import { useContainer } from "context/ContainerProvider";
import React from "react";

export default function Analytic() {
  const { toggleAnalytic } = useContainer();
  if (!toggleAnalytic) return <></>;
  return <div>Analytic</div>;
}
