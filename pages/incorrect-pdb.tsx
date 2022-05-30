import { NextPage } from "next";
import { NamespaceSelector } from "../components/NamespaceSelector";
import { useState } from "react";
import {
  useDaemonSets,
  useDeployments,
  usePdbs,
  usePods,
  usePriorityClasses,
  useStatefulSets,
} from "../hooks/resources";
import { groupBy } from "lodash";
import { Deployment } from "../components/Deployment";
import { StatefulSet } from "../components/StatefulSet";
import { DaemonSet } from "../components/DaemonSet";
import { Panel } from "../components/Panel";

const IncorrectPdb: NextPage = () => {
  const [namespace, setNamespace] = useState<string>("");
  const { data: deployments, error: deploymentsError } =
    useDeployments(namespace);
  const { data: statefulSets, error: statefulSetsError } =
    useStatefulSets(namespace);
  const { data: daemonSets, error: daemonSetsError } = useDaemonSets(namespace);
  const { data: pdbs, error: pdbsError } = usePdbs(namespace);

  if (deploymentsError || statefulSetsError || daemonSetsError || pdbsError) {
    return (
      <div>
        Loading error:{" "}
        {deploymentsError?.err ||
          statefulSetsError?.err ||
          daemonSetsError?.err ||
          pdbsError?.err}
      </div>
    );
  }

  if (!deployments || !statefulSets || !daemonSets || !pdbs) {
    return <div>Loading</div>;
  }

  const groupedDeployments = groupBy(deployments.items, (resource) => {
    return resource.spec?.template?.spec?.priorityClassName || "none";
  });
  const groupedStatefulSets = groupBy(statefulSets.items, (resource) => {
    return resource.spec?.template?.spec?.priorityClassName || "none";
  });
  const groupedDaemonSets = groupBy(daemonSets.items, (resource) => {
    return resource.spec?.template?.spec?.priorityClassName || "none";
  });

  return (
    <>
      <Panel>
        <NamespaceSelector value={namespace} handleChange={setNamespace} />
      </Panel>
      <Panel>
        <>
          {pdbs.items.map((pdb) => {
            pdb.spec?.selector.return(
              <div key={pClass.metadata?.uid}>
                <div>
                  <strong>{pClass.metadata?.name}</strong>
                </div>
                <div>
                  <div>
                    {groupedDeployments[pClass.metadata!.name!]
                      ? groupedDeployments[pClass.metadata!.name!].map(
                          (resource) => (
                            <Deployment
                              key={resource.metadata?.uid}
                              deploy={resource}
                            />
                          )
                        )
                      : null}
                  </div>
                  <div>
                    {groupedStatefulSets[pClass.metadata!.name!]
                      ? groupedStatefulSets[pClass.metadata!.name!].map(
                          (resource) => (
                            <StatefulSet
                              key={resource.metadata?.uid}
                              sts={resource}
                            />
                          )
                        )
                      : null}
                  </div>
                  <div>
                    {groupedDaemonSets[pClass.metadata!.name!]
                      ? groupedDaemonSets[pClass.metadata!.name!].map(
                          (resource) => (
                            <DaemonSet
                              key={resource.metadata?.uid}
                              ds={resource}
                            />
                          )
                        )
                      : null}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </Panel>
    </>
  );
};

export default IncorrectPdb;
