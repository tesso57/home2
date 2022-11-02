<script setup lang="ts">
import PageContainer from "@/components/Layout/PageContainer.vue";
import WorkList from "@/components/Works/WorkList.vue";
import type { Work } from "@/lib/work";

import NoImage from "@/assets/Image.png";
import Portfolio from "@/assets/portfolio.png";
import PrestoRay from "@/assets/prestoray.svg";

const mock: Work[] = [
  {
    title: "Portfolio",
    description:
      "Vue.JSを用いて作成したPortfolio。tessoが今まで作成したものがわかる。",
    tags: ["Vue", "TypeScript", "SCSS"],
    link: "https://tesso.dev",
    imageUrl: Portfolio,
    duration: {
      since: new Date(2022, 7, 13),
    },
  },
  {
    title: "PrestoRay",
    description:
      "大学１年生で、サークルで製作したゲーム。プログラム担当の一人。",
    tags: ["Unity", "C#"],
    link: "https://trap.jp/post/1458/",
    imageUrl: PrestoRay,
    duration: {
      since: new Date(2020, 8, 30),
    },
  },
  {
    title: "Title",
    description: "Description",
    tags: ["Vue", "TypeScript", "SCSS"],
    link: "https://tesso.dev",
    imageUrl: NoImage,
    duration: {
      since: new Date(),
    },
  },
  {
    title: "Title",
    description: "Description",
    tags: ["Vue", "TypeScript", "SCSS"],
    link: "https://tesso.dev",
    imageUrl: NoImage,
    duration: {
      since: new Date(),
    },
  },
];
</script>

<template>
  <PageContainer>
    <WorkList :works="mock" />
  </PageContainer>
</template>
