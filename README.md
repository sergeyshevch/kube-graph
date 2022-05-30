# Kubernetes Helper

Kubernetes helper is a simple Next.js project that can help in daily cluster maintenance.
It can be used for better understanding cluster capacity, planning resource quotes, and other staff.

## Why next.js?

Next.js is a simple tool that allows creating SSR and providing backend queries required to use kubernetes-client.

## Why not golang?

Golang is the most common language to write any staff for k8s. But React allows me to create frontend faster than create separate frontend and backend applications.

## Maturity

This project will be developed from time to time. If you need some additional features, PR is welcome.


## Feature List
Dashboards:
- Pods grouped by priorityClass
- Workloads (Deploy, Sts, Ds) grouped by priorityClass

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This app will use your current kubeconfig with the current context. So you can switch contexts manually.

This app can be deployed directly in the cluster but it's not tested. I created it for local usage.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!