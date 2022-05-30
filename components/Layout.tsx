import Link from "next/link";

export const Layout = (props: { children: JSX.Element }) => {
  return (
    <>
      <div>
        <Link href="/pod-by-priority-class">Pod by priorityClass</Link>
        <Link href="/workload-by-priority-class">
          Workload by priorityClass
        </Link>
      </div>
      <div>{props.children}</div>
    </>
  );
};
