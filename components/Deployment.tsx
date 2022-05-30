import { V1Deployment } from "@kubernetes/client-node";

export const Deployment = (props: { deploy: V1Deployment }) => {
  const { deploy } = props;
  return <div>deploy/{deploy.metadata?.name}</div>;
};
