import { V1DaemonSet } from "@kubernetes/client-node";

export const DaemonSet = (props: { ds: V1DaemonSet }) => {
  const { ds } = props;
  return <div>ds/{ds.metadata?.name}</div>;
};
