import { NextPage } from "next";
import { NamespaceSelector } from "../components/NamespaceSelector";
import * as React from "react";
import { useState } from "react";
import { usePods, usePriorityClasses } from "../hooks/resources";
import { groupBy } from "lodash";
import { Pod } from "../components/Pod";
import { Panel } from "../components/Panel";

const PodByPriorityClass: NextPage = () => {
  const [namespace, setNamespace] = useState<string>("");
  const { data: priorityClasses, error: priorityClassesError } =
    usePriorityClasses();
  const { data: pods, error: podsError } = usePods(namespace);

  if (priorityClassesError || podsError) {
    return (
        <Panel><h2>Loading error: {priorityClassesError?.err || podsError?.err}</h2></Panel>
    );
  }

  if (!priorityClasses || !pods) {
    return <Panel><h1>Loading</h1></Panel>;
  }

  const groupedPods = groupBy(pods.items, (pod) => {
    return pod.spec?.priorityClassName || "none";
  });

  return (
    <>
      <Panel>
        <NamespaceSelector value={namespace} handleChange={setNamespace} />
      </Panel>
      <Panel>
        <>
          {priorityClasses.items
            .sort((a, b) => (a.value > b.value ? -1 : 1))
            .map((pClass) => {
              return (
                <div key={pClass.metadata?.uid}>
                  <div>
                    <strong>{pClass.metadata?.name}</strong>
                  </div>
                  <div>
                    {groupedPods[pClass.metadata!.name!]
                      ? groupedPods[pClass.metadata!.name!].map((pod) => (
                          <Pod key={pod.metadata?.uid} pod={pod} />
                        ))
                      : null}
                  </div>
                </div>
              );
            })}
        </>
      </Panel>
    </>
  );
};

export default PodByPriorityClass;
