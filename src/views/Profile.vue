<script setup lang="ts">
import PageTitle from "../components/Layout/PageTitle.vue"
import PageContainter from "../components/Layout/PageContainter.vue"
import SectionContainer from "../components/Layout/SectionContainer.vue"
import ExternalLink from "../components/UI/ExternalLink.vue"
import Icon from "../components/UI/Icon.vue"
</script>

<template>
  <PageContainter :class="$style.container">
    <PageTitle />
    <SectionContainer name="Name">
      <p>tesso(てっそ)</p>
      <p>tesso57</p>
    </SectionContainer>
    <SectionContainer name="Belonging">
      <ExternalLink href="https://trap.jp">
        <p>東京工業大学デジタル同好会traP</p>
      </ExternalLink>
    </SectionContainer>
    <SectionContainer name="About">
      <p>
        暗号とゲーム制作が好きです。大学では、数学とコンピュータの勉強してます。
      </p>
    </SectionContainer>
    <SectionContainer name="Skills">
      <p>C#</p>
      <p>C++</p>
      <p>JavaScript</p>
    </SectionContainer>
    <SectionContainer name="Likes">
      <p>プログラミング</p>
      <p>FPSゲーム</p>
    </SectionContainer>
    <SectionContainer name="Linkes">
      <ExternalLink href="https://github.com/tesso57">
        <Icon name="mdi:github" :class="[$style.icon, $style.github]" />
        <p>GitHub</p>
      </ExternalLink>
      <ExternalLink href="https://note.com/tesso57">
        <img src="@/assets/note.svg" :class="[$style.icon, $style.note]" />
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
  </PageContainter>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
