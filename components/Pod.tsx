import { V1Pod } from "@kubernetes/client-node";

export const Pod = (props: { pod: V1Pod }) => {
  const { pod } = props;
  return <div>{pod.metadata?.name}</div>;
};
