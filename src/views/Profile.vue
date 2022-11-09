<script setup lang="ts">
import PageContainer from "../components/Layout/PageContainer.vue";
import SectionContainer from "../components/Layout/SectionContainer.vue";
import ExternalLink from "../components/UI/ExternalLink.vue";
import Profile from "../assets/data/profile.json";
import Link from "@/components/Profile/Link.vue";
</script>

<template>
  <PageContainer :class="$style.container">
    <div :class="$style.title">
      <h1>{{ Profile.name }}</h1>
      <p :class="$style.caption">{{ Profile.id }}</p>
    </div>
    <SectionContainer>
      <template v-slot:header>
        <h2>Belonging</h2>
      </template>
      <ExternalLink :href="Profile.belonging.link">
        <p :class="$style.link">{{ Profile.belonging.name }}</p>
      </ExternalLink>
    </SectionContainer>
    <SectionContainer>
      <template v-slot:header>
        <h2>About</h2>
      </template>
      <p>
        {{ Profile.about }}
      </p>
    </SectionContainer>
    <SectionContainer>
      <template v-slot:header>
        <h2>Skills</h2>
      </template>
      <p v-for="(skill, id) in Profile.skills" :key="id">{{ skill }}</p>
    </SectionContainer>
    <SectionContainer>
      <template v-slot:header>
        <h2>Likes</h2>
      </template>
      <p v-for="(like, id) in Profile.likes" :key="id">{{ like }}</p>
    </SectionContainer>
    <SectionContainer>
      <template v-slot:header>
        <h2>Links</h2>
      </template>
      <Link
        v-for="(link, id) in Profile.links"
        :key="id"
        :icon="link.icon"
        :name="link.name"
        :href="link.url"
        :type="link.type"
        :color="link.color"
      />
    </SectionContainer>
  </PageContainer>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 1rem;
  background-color: $color-white;

  border: 3px solid $color-highlight;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
}

.title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.caption {
  font-size: 0.75rem;
  font-family: "Reem Kufi Fun", sans-serif;
  justify-content: flex-end;
}

.link {
  color: $color-secondary;
}
</style>
