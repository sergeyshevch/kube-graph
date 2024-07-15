import { V1Deployment, V1Taint } from "@kubernetes/client-node";

export const Taint = (props: { taint: V1Taint }) => {
  const { taint } = props;
  return (
    <div>
      {taint.key}={taint.value}:{taint.effect}
    </div>
  );
};
