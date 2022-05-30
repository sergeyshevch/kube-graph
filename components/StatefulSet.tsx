import { V1StatefulSet } from "@kubernetes/client-node";

export const StatefulSet = (props: { sts: V1StatefulSet }) => {
  const { sts } = props;
  return <div>sts/{sts.metadata?.name}</div>;
};
