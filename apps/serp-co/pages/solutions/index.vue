<script setup>
  const testimonials = [
    {
      quote:
        'Devin is one of the foremost experts in SEO. I am always looking forward to the info he provides and his strategies are consistently helping us get results',
      user: {
        name: 'Adriaan Van Swieten',
        businessName: '100 Danish',
        positionAtCompany: 'Director',
        avatar:
          'https://raw.githubusercontent.com/serpcompany/social-proof/refs/heads/main/linkedin/avatars/adriaan-van-swieten.png'
      }
    },
    {
      quote:
        'Devin is a fantastic person to work with. His technical understanding of SEO is what sets him apart from the rest. Along with that, he is extremely professional in his job and he delivers a fantastic service that has the results to match it.',
      user: {
        name: 'Alasdair Walker',
        businessName: 'How to Drink Wine',
        positionAtCompany: 'Director',
        avatar:
          'https://raw.githubusercontent.com/devinschumacher/social-proof/refs/heads/main/avatars/alasdair-walker.png'
      }
    },
    {
      quote:
        'Devin is changing the game of SEO and digital marketing. He is always on the forefront of search engine changes, and a pleasure to work with. If your business needs help getting more customers and online traffic, I highly recommend his company.',
      user: {
        name: 'Amine Bekkouch',
        businessName: 'CAPREIT',
        positionAtCompany: 'Operations Manager',
        avatar:
          'https://raw.githubusercontent.com/devinschumacher/social-proof/refs/heads/main/avatars/amine-bekkouch.png'
      }
    },
    {
      quote:
        "Devin is a killer SEO! It is essential that you work with someone like him, who stays ahead of the industry's every changing landscape. Work with him and you will make money. Highly recommend",
      user: {
        name: 'Ashley Usoh',
        businessName: 'Alkem Health & Fitness',
        positionAtCompany: 'Senior Marketing Manager',
        avatar:
          'https://raw.githubusercontent.com/devinschumacher/social-proof/refs/heads/main/avatars/ashley-usoh.png'
      }
    },
    {
      quote:
        'Devin is on of the few SEO experts I would recommend. He has a gift for generating leads and sales online through ranking websites in the search engines. If you are looking for someone to explode your leads and sales online, Devin is your man!',
      user: {
        name: 'Aston Scott',
        businessName: 'Source One International',
        positionAtCompany: 'Partner And CMO',
        avatar:
          'https://raw.githubusercontent.com/devinschumacher/social-proof/refs/heads/main/avatars/aston-scott.png'
      }
    },
    {
      quote:
        "Devin at SEO Firepower is more than just an 'SEO Specialist' - he's an artist. He takes SEO, an often formulaic and scientific feeling marketing tactic and brings a fresh holistic perspective to the game. Always inventive, and on the cutting edge of the search marketing industry, Devin's skills are a notch above the rest.",
      user: {
        name: 'Avram Gonzales',
        businessName: 'Digital Harvest',
        positionAtCompany: 'Founder',
        avatar:
          'https://raw.githubusercontent.com/devinschumacher/social-proof/refs/heads/main/avatars/avram-gonzales.png'
      }
    },
    {
      quote:
        'Devin has used his unique SEO skills to get me to the top of the Google rankings and he generated tons of business for me. I can not thank him enough. He is an expert in getting me leads on the net and delivers awesome results!',
      user: {
        name: 'Bill Raup',
        businessName: 'Bill Raup Search Engine Marketing, LLC',
        positionAtCompany: 'President',
        avatar:
          'https://raw.githubusercontent.com/devinschumacher/social-proof/refs/heads/main/avatars/bill-raup.png'
      }
    },
    {
      quote:
        'Devin is a true SEO industry leader and expert at driving traffic. Having collaborated with him on various ranking campaigns, we saw numerous Page 1 and #1 rankings for very competitive keywords in many different industries. I highly recommend him, and his firm SEO Firepower, to anyone looking to increase their online visibility.',
      user: {
        name: 'Brendan Monahan',
        businessName: 'Raleigh SEO Company',
        positionAtCompany: 'CEO',
        avatar:
          'https://raw.githubusercontent.com/devinschumacher/social-proof/refs/heads/main/avatars/brendan-monahan.png'
      }
    },
    {
      quote:
        'Devin is among the very best in the SEO industry. He is highly regarded not only by his clients for whom gets amazing results, but also his peers. His knowledge and insight is invaluable.',
      user: {
        name: "Brian O'Connell",
        businessName: 'Restaurant Ordering Systems',
        positionAtCompany: 'Owner',
        avatar:
          'https://raw.githubusercontent.com/devinschumacher/social-proof/refs/heads/main/avatars/brian-oconnell.png'
      }
    },
    {
      quote:
        'Devin and his team over-delivered. They are consummate professionals. It is hard to argue with the results. All of our business KPIs are up, and the traffic is through the roof!',
      user: {
        name: 'Caliph Herald',
        businessName: 'Herald Square Marketing',
        positionAtCompany: 'Principal Owner',
        avatar:
          'https://raw.githubusercontent.com/devinschumacher/social-proof/refs/heads/main/avatars/caliph-herald.png'
      }
    }
  ];
</script>

<template>
  <UMain>
    <UPageHero
      title="SERP Solutions"
      description="Growth & automation solutions that help brands success online."
      orientation="vertical"
    />

    <UPageColumns>

      <UPageCard
        v-for="(testimonial, index) in testimonials"
        :key="index"
        variant="subtle"
      >
        <template #default>
          <div class="flex flex-col">
            <!-- Testimonial header with avatar and user info -->
            <div class="mb-4">
              <!-- On mobile: Stack everything -->
              <div class="flex flex-col lg:hidden">
                <img
                  :src="testimonial.user.avatar"
                  :alt="testimonial.user.name"
                  class="mb-2 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p class="font-medium">{{ testimonial.user.name }}</p>
                  <p
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ testimonial.user.businessName }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ testimonial.user.positionAtCompany }}
                  </p>
                </div>
              </div>

              <!-- On large screens: Avatar | Name with business and position stacked under name -->
              <div class="hidden lg:flex">
                <img
                  :src="testimonial.user.avatar"
                  :alt="testimonial.user.name"
                  class="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p class="font-medium">{{ testimonial.user.name }}</p>
                  <p
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ testimonial.user.businessName }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ testimonial.user.positionAtCompany }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Testimonial text -->
            <p
              class="mt-2 text-sm before:content-[open-quote] after:content-[close-quote]"
            >
              {{ testimonial.quote }}
            </p>
          </div>
        </template>
      </UPageCard>
    </UPageColumns>
  </UMain>
</template>
