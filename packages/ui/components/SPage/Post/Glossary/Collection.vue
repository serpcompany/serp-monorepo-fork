<script setup lang="ts">
  import type { PostIndex } from '@serp/types/types';

  const router = useRouter();

  const data = await usePosts(1, 1000000, '', 'Glossary');
  if (!data) {
    router.push('/404');
  }

  const characters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  characters.push('*');

  const getTermsByFirstChar = (character: string) => {
    if (character === '*') {
      return data.posts.filter(
        (term: PostIndex) => !/^[a-z]/i.test(term.keyword || term.title)
      );
    }
    return data.posts.filter((term: PostIndex) => {
      return term.keyword
        ? term.keyword.toLowerCase().startsWith(character.toLowerCase())
        : term.title.toLowerCase().startsWith(character.toLowerCase());
    });
  };

  // computed property to filter characters that have terms
  const filteredCharacters = computed(() => {
    return characters.filter(
      (character) => getTermsByFirstChar(character).length > 0
    );
  });

  useSeoMeta({
    title: 'Glossary'
  });
</script>

<template>
  <div>
    <section>
      <SectionHeroOne title="Glossary" />
      <FirstCharacterJumpLinkNav
        :characters="characters"
        :filtered-characters="filteredCharacters"
      />
    </section>

    <!-- character section (character + cards) -->
    <main>
      <div class="px-6 lg:px-8">
        <div
          v-for="character in filteredCharacters"
          :id="character"
          :key="character"
          class="pt-12 lg:pt-24"
        >
          <div>
            <!-- character section top (character) -->
            <h2 class="text-4xl font-semibold">{{ character }}</h2>

            <!-- character section bottom (cards) -->
            <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
              <GlossaryTermCard
                v-for="term in getTermsByFirstChar(character)"
                :key="term.slug"
                :term="term"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    <NewsletterSignupPageSection />
  </div>
</template>
