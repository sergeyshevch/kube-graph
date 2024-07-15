import { V1Toleration } from "@kubernetes/client-node";

export const Toleration = (props: { toleration: V1Toleration }) => {
  const { toleration } = props;
  return (
    <div>
      {toleration.operator}/{toleration.key}={toleration.value}:
      {toleration.effect}
    </div>
  );
};
