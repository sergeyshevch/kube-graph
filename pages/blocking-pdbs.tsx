import { NextPage } from "next";
import { NamespaceSelector } from "../components/NamespaceSelector";
import { useState } from "react";
import {
  fetcher,
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
import useSwr from "swr";
import { PodByPriorityClassResponse } from "./api/pod-by-priority-class";
import { K8sClientErrorResponse } from "./api/_types";
import * as React from "react";

const BlockingPdbs: NextPage = () => {
  const [namespace, setNamespace] = useState<string>("");
  const params = new URLSearchParams({
    namespace,
  });
  const { data, error } = useSwr<
    PodByPriorityClassResponse,
    K8sClientErrorResponse
  >(`/api/blocking-pdbs?${params}`, fetcher);

  if (error) {
    return (
      <Panel>
        <h2>Loading error: {error?.err}</h2>
      </Panel>
    );
  }

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

export default BlockingPdbs;
