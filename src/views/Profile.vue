<script setup lang="ts">
import Profile from "@/assets/data/profile.json";
import Link from "@/components/Profile/Link.vue";
import { format, formatDuration } from "@/lib/date";
import { computed } from "vue";
import PageContainer from "../components/Layout/PageContainer.vue";
import SectionContainer from "../components/Layout/SectionContainer.vue";
import ExternalLink from "../components/UI/ExternalLink.vue";
import Icon from "../components/UI/Icon.vue";

const sortedSkills = computed(() =>
	[...(Profile.skills as { name: string; level: number }[])].sort(
		(a, b) => b.level - a.level,
	),
);
</script>

<template>
  <PageContainer>
    <div :class="$style.container">
      <div :class="$style.title">
        <h1>{{ Profile.name }}</h1>
        <p :class="$style.caption">{{ Profile.id }}</p>
      </div>
      <SectionContainer>
        <template v-slot:header>
          <h2>Belonging</h2>
        </template>
        <ExternalLink
          v-for="(belonging, id) in Profile.belongings"
          :key="id"
          :href="belonging.link"
        >
          <p :class="$style.link">
            {{ belonging.name }}
            (
            {{
              formatDuration(
                {
                  since: new Date(belonging.since),
                  until: belonging.until
                    ? new Date(belonging.until)
                    : undefined,
                },
                true,
              )
            }})
          </p>
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
        <p v-for="(skill, id) in sortedSkills" :key="id">
          {{ skill.name }}
          <Icon
            v-for="n in 5"
            :key="n"
            name="mdi:star"
            :size="16"
            :class="[$style.star, n > skill.level && $style.faded]"
          />
        </p>
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
    </div>
  </PageContainer>
</template>

<style lang="scss" module>
@use "sass:color";
.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 1rem;
  background-color: $color-white;

  border: 3px solid $color-card-background;
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

.star {
  color: $color-highlight;
}

.faded {
  color: color.adjust($color-highlight, $lightness: 30%);
}
</style>
