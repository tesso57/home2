<script setup lang="ts">
import PageContainer from "../components/Layout/PageContainer.vue";
import SectionContainer from "../components/Layout/SectionContainer.vue";
import ExternalLink from "../components/UI/ExternalLink.vue";
import Icon from "../components/UI/Icon.vue";
</script>

<template>
  <PageContainer :class="$style.container">
    <div :class="$style.title">
      <h1>tesso</h1>
      <p :class="$style.caption">@tesso57</p>
    </div>
    <SectionContainer>
      <template v-slot:header>
        <h2>Belonging</h2>
      </template>
      <ExternalLink href="https://trap.jp">
        <p>東京工業大学デジタル同好会traP</p>
      </ExternalLink>
    </SectionContainer>
    <SectionContainer>
      <template v-slot:header>
        <h2>About</h2>
      </template>
      <p>
        暗号とゲーム制作が好きです。大学では、数学とコンピュータの勉強してます。
      </p>
    </SectionContainer>
    <SectionContainer>
      <template v-slot:header>
        <h2>Skills</h2>
      </template>
      <p>C#</p>
      <p>C++</p>
      <p>JavaScript</p>
    </SectionContainer>
    <SectionContainer>
      <template v-slot:header>
        <h2>Likes</h2>
      </template>
      <p>プログラミング</p>
      <p>FPSゲーム</p>
    </SectionContainer>
    <SectionContainer>
      <template v-slot:header>
        <h2>Links</h2>
      </template>
      <ExternalLink href="https://github.com/tesso57">
        <Icon name="mdi:github" :class="[$style.icon, $style.github]" />
        <p>GitHub</p>
      </ExternalLink>
      <ExternalLink href="https://note.com/tesso57">
        <img src="@/assets/note.svg" :class="[$style.icon, $style.note]" alt="note" />
        <p>Note</p>
      </ExternalLink>
      <ExternalLink href="https://twitter.com/tesso57">
        <Icon name="mdi:twitter" :class="[$style.icon, $style.twitter]" />
        <p>twitter</p>
      </ExternalLink>
      <ExternalLink href="mailto:mail@tesso.dev">
        <Icon name="mdi:email" :class="$style.icon" />
        <p>mail@tesso.dev</p>
      </ExternalLink>
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
}

.icon {
  margin-right: 0.5rem;
}

.github {
  color: #171515;
}

.note {
  color: #41c9b4;
  width: 26px;
}

.twitter {
  color: #1da1f2;
}
</style>
