# TypeScript Error Analysis

Total errors found: 1323

## Error Summary by Type

- **TS2339** (394 errors): Property does not exist on type
- **TS2532** (170 errors): Object is possibly undefined
- **TS18046** (130 errors): Value is of type unknown
- **TS2353** (106 errors): Object literal unknown properties
- **TS2322** (88 errors): Type is not assignable to type
- **TS7006** (80 errors): Parameter implicitly has any type
- **TS2769** (79 errors): No overload matches this call
- **TS2345** (66 errors): Argument type mismatch
- **TS2578** (44 errors): Unknown error type
- **TS2304** (28 errors): Cannot find name/type
- **TS18047** (24 errors): Value is possibly null
- **TS7053** (18 errors): Element implicitly has any type (no index signature)
- **TS6307** (12 errors): Unknown error type
- **TS18049** (10 errors): Value is possibly null or undefined
- **TS2554** (8 errors): Unknown error type
- **TS2307** (8 errors): Cannot find module
- **TS2540** (8 errors): Unknown error type
- **TS2740** (6 errors): Unknown error type
- **TS2352** (6 errors): Unknown error type
- **TS2614** (6 errors): Unknown error type
- **TS18048** (6 errors): Value is possibly undefined
- **TS2741** (4 errors): Unknown error type
- **TS2739** (4 errors): Unknown error type
- **TS7008** (4 errors): Unknown error type
- **TS2365** (4 errors): Unknown error type
- **TS7034** (2 errors): Variable implicitly has any type
- **TS7005** (2 errors): Variable implicitly has any type
- **TS2367** (2 errors): Unknown error type
- **TS2571** (2 errors): Unknown error type
- **TS2531** (2 errors): Unknown error type

## Detailed Breakdown

### TS2339: Property does not exist on type (394 errors)

**../../packages/api/server/api/comments/[id].post.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/comments/[id].put.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entities/all-for-category.ts**

- Line 20,6: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.
- Line 20,6: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.

**../../packages/api/server/api/entities/index.ts**

- Line 30,25: Property 'entities' does not exist on type '{}'.
- Line 64,19: Property 'siteId' does not exist on type 'User'.
- Line 64,48: Property 'siteId' does not exist on type 'User'.
- Line 76,30: Property 'entities' does not exist on type '{}'.
- Line 173,17: Property 'siteId' does not exist on type 'User'.
- Line 173,46: Property 'siteId' does not exist on type 'User'.
- Line 190,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.
- Line 30,25: Property 'entities' does not exist on type '{}'.
- Line 64,19: Property 'siteId' does not exist on type 'User'.
- Line 64,48: Property 'siteId' does not exist on type 'User'.
- Line 76,30: Property 'entities' does not exist on type '{}'.
- Line 173,17: Property 'siteId' does not exist on type 'User'.
- Line 173,46: Property 'siteId' does not exist on type 'User'.
- Line 190,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.

**../../packages/api/server/api/entities/search.ts**

- Line 47,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[] | QueryValue[]'.
- Line 47,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[] | QueryValue[]'.

**../../packages/api/server/api/entities/verified.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 14,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 14,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.

**../../packages/api/server/api/entity/[slug].ts**

- Line 23,24: Property 'id' does not exist on type '{}'.
- Line 55,19: Property 'siteId' does not exist on type 'User'.
- Line 55,48: Property 'siteId' does not exist on type 'User'.
- Line 140,17: Property 'siteId' does not exist on type 'User'.
- Line 140,46: Property 'siteId' does not exist on type 'User'.
- Line 146,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.
- Line 182,7: Property 'verification' does not exist on type '{ id: number; createdAt: Date; updatedAt: Date; name: string; slug: string; module: string; featured?: boolean | undefined; featuredOrder?: number | undefined; categories?: Category[] | undefined; ... 16 more ...; usersCurrentVote?: boolean | undefined; }'.
- Line 23,24: Property 'id' does not exist on type '{}'.
- Line 55,19: Property 'siteId' does not exist on type 'User'.
- Line 55,48: Property 'siteId' does not exist on type 'User'.
- Line 140,17: Property 'siteId' does not exist on type 'User'.
- Line 140,46: Property 'siteId' does not exist on type 'User'.
- Line 146,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.
- Line 182,7: Property 'verification' does not exist on type '{ id: number; createdAt: Date; updatedAt: Date; name: string; slug: string; module: string; featured?: boolean | undefined; featuredOrder?: number | undefined; categories?: Category[] | undefined; ... 16 more ...; usersCurrentVote?: boolean | undefined; }'.

**../../packages/api/server/api/entity/check-if-valid-feature-placement.ts**

- Line 32,31: Property 'where' does not exist on type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; categories: PgColumn<...>; }, ......'.
- Line 32,31: Property 'where' does not exist on type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; categories: PgColumn<...>; }, ......'.

**../../packages/api/server/api/entity/claim/[id].post.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 9,34: Property 'email' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 9,34: Property 'email' does not exist on type 'User'.

**../../packages/api/server/api/entity/claims.get.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 14,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[] | QueryValue[]'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 14,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[] | QueryValue[]'.

**../../packages/api/server/api/entity/edit.get.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/edit.post.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/edit.put.ts**

- Line 14,35: Property 'siteId' does not exist on type 'User'.
- Line 14,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/featured-subscriptions.get.ts**

- Line 12,35: Property 'siteId' does not exist on type 'User'.
- Line 18,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.
- Line 12,35: Property 'siteId' does not exist on type 'User'.
- Line 18,8: Property 'split' does not exist on type 'string | number | boolean | Record<string, any> | QueryValue[]'.

**../../packages/api/server/api/entity/flag-review.delete.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/flag-review.post.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/reserve-featured-spot.ts**

- Line 11,33: Property 'siteId' does not exist on type 'User'.
- Line 11,33: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/submit-verify-backlink.post.ts**

- Line 10,33: Property 'siteId' does not exist on type 'User'.
- Line 10,33: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/submit.get.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/submit.post.ts**

- Line 14,35: Property 'siteId' does not exist on type 'User'.
- Line 14,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/verify/email.post.ts**

- Line 11,33: Property 'siteId' does not exist on type 'User'.
- Line 11,33: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/entity/verify/email/initiate.post.ts**

- Line 15,35: Property 'siteId' does not exist on type 'User'.
- Line 15,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/reviews/[id].delete.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/reviews/[id].get.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 70,34: Property 'name' does not exist on type 'User'.
- Line 71,35: Property 'image' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 70,34: Property 'name' does not exist on type 'User'.
- Line 71,35: Property 'image' does not exist on type 'User'.

**../../packages/api/server/api/reviews/[id].post.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/reviews/[id].put.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/api/server/api/vote.post.ts**

- Line 8,35: Property 'siteId' does not exist on type 'User'.
- Line 8,35: Property 'siteId' does not exist on type 'User'.

**../../packages/tools/utils/combineCsvs.ts**

- Line 30,35: Property 'read' does not exist on type '{ version: string; }'.
- Line 32,25: Property 'utils' does not exist on type '{ version: string; }'.
- Line 30,35: Property 'read' does not exist on type '{ version: string; }'.
- Line 32,25: Property 'utils' does not exist on type '{ version: string; }'.

**../../packages/ui/components/AdContainer.vue**

- Line 26,49: Property 'publisherId' does not exist on type '{}'.

**../../packages/ui/components/AlbumsLinkHub.vue**

- Line 19,44: Property 'artistCreditName' does not exist on type 'ReleaseGroupIndex'.
- Line 19,44: Property 'artistCreditName' does not exist on type 'ReleaseGroupIndex'.

**../../packages/ui/components/BookmarkButton.vue**

- Line 30,27: Property 'email' does not exist on type 'User'.
- Line 45,55: Property 'email' does not exist on type 'User'.
- Line 47,47: Property 'email' does not exist on type 'User'.
- Line 50,49: Property 'email' does not exist on type 'User'.
- Line 30,27: Property 'email' does not exist on type 'User'.
- Line 45,55: Property 'email' does not exist on type 'User'.
- Line 47,47: Property 'email' does not exist on type 'User'.
- Line 50,49: Property 'email' does not exist on type 'User'.

**../../packages/ui/components/CommentWrapper.vue**

- Line 39,55: Property 'id' does not exist on type 'never'.
- Line 69,21: Property 'siteId' does not exist on type 'User'.
- Line 69,70: Property 'isAdmin' does not exist on type 'User'.
- Line 132,42: Property 'focus' does not exist on type 'Element'.
- Line 143,24: Property 'focus' does not exist on type 'Element'.
- Line 174,20: Property 'siteId' does not exist on type 'User'.
- Line 175,21: Property 'isAdmin' does not exist on type 'User'.
- Line 262,20: Property 'siteId' does not exist on type 'User'.
- Line 263,21: Property 'isAdmin' does not exist on type 'User'.
- Line 293,62: Property 'message' does not exist on type 'Ref<FetchError<any> | null, FetchError<any> | null>'.
- Line 344,42: Property 'siteId' does not exist on type 'User'.
- Line 390,31: Property 'siteId' does not exist on type 'User'.
- Line 391,28: Property 'name' does not exist on type 'User'.
- Line 392,29: Property 'image' does not exist on type 'User'.
- Line 587,29: Property 'image' does not exist on type 'User'.
- Line 594,26: Property 'name' does not exist on type 'User'.
- Line 632,29: Property 'id' does not exist on type 'never'.
- Line 642,48: Property 'id' does not exist on type 'never'.
- Line 39,55: Property 'id' does not exist on type 'never'.
- Line 69,21: Property 'siteId' does not exist on type 'User'.
- Line 69,70: Property 'isAdmin' does not exist on type 'User'.
- Line 132,42: Property 'focus' does not exist on type 'Element'.
- Line 143,24: Property 'focus' does not exist on type 'Element'.
- Line 174,20: Property 'siteId' does not exist on type 'User'.
- Line 175,21: Property 'isAdmin' does not exist on type 'User'.
- Line 262,20: Property 'siteId' does not exist on type 'User'.
- Line 263,21: Property 'isAdmin' does not exist on type 'User'.
- Line 293,62: Property 'message' does not exist on type 'Ref<FetchError<any> | null, FetchError<any> | null>'.
- Line 344,42: Property 'siteId' does not exist on type 'User'.
- Line 390,31: Property 'siteId' does not exist on type 'User'.
- Line 391,28: Property 'name' does not exist on type 'User'.
- Line 392,29: Property 'image' does not exist on type 'User'.
- Line 587,29: Property 'image' does not exist on type 'User'.
- Line 594,26: Property 'name' does not exist on type 'User'.
- Line 632,29: Property 'id' does not exist on type 'never'.
- Line 642,48: Property 'id' does not exist on type 'never'.

**../../packages/ui/components/CommentsContainer.vue**

- Line 85,16: Property 'style' does not exist on type 'Element'.
- Line 86,16: Property 'blur' does not exist on type 'Element'.
- Line 103,23: Property 'siteId' does not exist on type 'User'.
- Line 143,33: Property 'siteId' does not exist on type 'User'.
- Line 144,30: Property 'name' does not exist on type 'User'.
- Line 145,31: Property 'image' does not exist on type 'User'.
- Line 178,69: Property 'offsetWidth' does not exist on type 'Element'.
- Line 305,27: Property 'image' does not exist on type 'User'.
- Line 306,27: Property 'image' does not exist on type 'User'.
- Line 85,16: Property 'style' does not exist on type 'Element'.
- Line 86,16: Property 'blur' does not exist on type 'Element'.
- Line 103,23: Property 'siteId' does not exist on type 'User'.
- Line 143,33: Property 'siteId' does not exist on type 'User'.
- Line 144,30: Property 'name' does not exist on type 'User'.
- Line 145,31: Property 'image' does not exist on type 'User'.
- Line 178,69: Property 'offsetWidth' does not exist on type 'Element'.
- Line 305,27: Property 'image' does not exist on type 'User'.
- Line 306,27: Property 'image' does not exist on type 'User'.

**../../packages/ui/components/CompanyVerificationButton.vue**

- Line 30,22: Property 'email' does not exist on type 'User'.
- Line 52,34: Property 'siteId' does not exist on type 'ComputedRef<User | null>'.
- Line 91,15: Property 'ok' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; requestId?: undefined; error?: undefined; }> | SerializeObject<{ ok: boolean; requestId: number; status?: undefined; message?: undefined; error?: undefined; }> | SerializeObject<...>>'.
- Line 103,55: Property 'error' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; requestId?: undefined; error?: undefined; }> | SerializeObject<{ ok: boolean; requestId: number; status?: undefined; message?: undefined; error?: undefined; }> | SerializeObject<...>>'.
- Line 147,30: Property 'email' does not exist on type 'User'.
- Line 30,22: Property 'email' does not exist on type 'User'.
- Line 52,34: Property 'siteId' does not exist on type 'ComputedRef<User | null>'.
- Line 91,15: Property 'ok' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; requestId?: undefined; error?: undefined; }> | SerializeObject<{ ok: boolean; requestId: number; status?: undefined; message?: undefined; error?: undefined; }> | SerializeObject<...>>'.
- Line 103,55: Property 'error' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; requestId?: undefined; error?: undefined; }> | SerializeObject<{ ok: boolean; requestId: number; status?: undefined; message?: undefined; error?: undefined; }> | SerializeObject<...>>'.
- Line 147,30: Property 'email' does not exist on type 'User'.

**../../packages/ui/components/Embeds/SPage/SerpShieldBadgeCustomizer.vue**

- Line 38,33: Property 'categorySlug' does not exist on type '{ categoryName: string; productDomain: string; }'.
- Line 44,110: Property 'categorySlug' does not exist on type '{ categoryName: string; productDomain: string; }'.
- Line 38,33: Property 'categorySlug' does not exist on type '{ categoryName: string; productDomain: string; }'.
- Line 44,110: Property 'categorySlug' does not exist on type '{ categoryName: string; productDomain: string; }'.

**../../packages/ui/components/Embeds/SvgBase/SerpShieldBadge.vue**

- Line 63,43: Property 'productSlug' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<{}, {}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, ... 16 more ..., {}>'.
- Line 72,48: Property 'categoryName' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<{}, {}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, ... 16 more ..., {}>'.
- Line 63,43: Property 'productSlug' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<{}, {}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, ... 16 more ..., {}>'.
- Line 72,48: Property 'categoryName' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<{}, {}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, ... 16 more ..., {}>'.

**../../packages/ui/components/ProfileDropdown.client.vue**

- Line 53,21: Property 'image' does not exist on type 'User'.
- Line 77,32: Property 'image' does not exist on type 'User'.
- Line 79,22: Property 'name' does not exist on type 'User'.
- Line 53,21: Property 'image' does not exist on type 'User'.
- Line 77,32: Property 'image' does not exist on type 'User'.
- Line 79,22: Property 'name' does not exist on type 'User'.

**../../packages/ui/components/ReviewModal.vue**

- Line 67,25: Property 'email' does not exist on type 'User'.
- Line 67,25: Property 'email' does not exist on type 'User'.

**../../packages/ui/components/SFooter.vue**

- Line 33,34: Property 'name' does not exist on type '{ text: string; slug: string; }'.
- Line 34,31: Property 'href' does not exist on type '{ text: string; slug: string; }'.
- Line 33,34: Property 'name' does not exist on type '{ text: string; slug: string; }'.
- Line 34,31: Property 'href' does not exist on type '{ text: string; slug: string; }'.

**../../packages/ui/components/SHeader.vue**

- Line 7,21: Property 'submitOptions' does not exist on type '{ socialLinks: { name: string; href: string; icon: string; }[]; headerNavItems: { label: string; children: { label: string; to: string; }[]; }[]; footerColumns: { title: string; id: number; slug: string; items: { text: string; slug: string; }[]; }[]; legalLinks: { ...; }[]; }'.
- Line 7,21: Property 'submitOptions' does not exist on type '{ socialLinks: { name: string; href: string; icon: string; }[]; headerNavItems: { label: string; children: { label: string; to: string; }[]; }[]; footerColumns: { title: string; id: number; slug: string; items: { text: string; slug: string; }[]; }[]; legalLinks: { ...; }[]; }'.

**../../packages/ui/components/SPage/Album/Single.vue**

- Line 232,40: Property 'cover_art_urls' does not exist on type '{ name: string; slug: string; artists: any; date: string | null; type: string | null; secondaryTypes: string[] | null; coverArt: any; recordings: any; }'.
- Line 233,40: Property 'cover_art_urls' does not exist on type '{ name: string; slug: string; artists: any; date: string | null; type: string | null; secondaryTypes: string[] | null; coverArt: any; recordings: any; }'.
- Line 232,40: Property 'cover_art_urls' does not exist on type '{ name: string; slug: string; artists: any; date: string | null; type: string | null; secondaryTypes: string[] | null; coverArt: any; recordings: any; }'.
- Line 233,40: Property 'cover_art_urls' does not exist on type '{ name: string; slug: string; artists: any; date: string | null; type: string | null; secondaryTypes: string[] | null; coverArt: any; recordings: any; }'.

**../../packages/ui/components/SPage/Company/Single.vue**

- Line 13,53: Property 'siteId' does not exist on type 'User'.
- Line 26,11: Property 'companyId' does not exist on type '{ reviews: Reviews; }'.
- Line 35,13: Property 'companyId' does not exist on type '{ reviews: Reviews; }'.
- Line 79,57: Property 'length' does not exist on type 'Reviews'.
- Line 13,53: Property 'siteId' does not exist on type 'User'.
- Line 26,11: Property 'companyId' does not exist on type '{ reviews: Reviews; }'.
- Line 35,13: Property 'companyId' does not exist on type '{ reviews: Reviews; }'.
- Line 79,57: Property 'length' does not exist on type 'Reviews'.

**../../packages/ui/components/SPage/Generic/ServiceProvider.vue**

- Line 14,53: Property 'siteId' does not exist on type 'User'.
- Line 41,11: Property 'serviceProviderId' does not exist on type '{ reviews: Reviews; }'.
- Line 51,13: Property 'serviceProviderId' does not exist on type '{ reviews: Reviews; }'.
- Line 14,53: Property 'siteId' does not exist on type 'User'.
- Line 41,11: Property 'serviceProviderId' does not exist on type '{ reviews: Reviews; }'.
- Line 51,13: Property 'serviceProviderId' does not exist on type '{ reviews: Reviews; }'.

**../../packages/ui/components/SPage/Generic/Single.vue**

- Line 25,17: Property 'verification' does not exist on type 'Entity'.
- Line 25,46: Property 'siteId' does not exist on type 'User'.
- Line 34,19: Property 'basicInfo' does not exist on type 'Entity'.
- Line 35,23: Property 'contracts' does not exist on type 'Entity'.
- Line 36,21: Property 'pricing' does not exist on type 'Entity'.
- Line 37,22: Property 'services' does not exist on type 'Entity'.
- Line 38,24: Property 'industries' does not exist on type 'Entity'.
- Line 39,30: Property 'businessesServed' does not exist on type 'Entity'.
- Line 40,26: Property 'supportSetup' does not exist on type 'Entity'.
- Line 41,21: Property 'ratings' does not exist on type 'Entity'.
- Line 52,11: Property 'entityId' does not exist on type '{ reviews: Reviews; }'.
- Line 62,13: Property 'entityId' does not exist on type '{ reviews: Reviews; }'.
- Line 108,24: Property 'oneLiner' does not exist on type 'Entity'.
- Line 108,41: Property 'description' does not exist on type 'Entity'.
- Line 109,18: Property 'sections' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<\_\_VLS_Props, {}>, { module: Ref<string, string>; baseSlug: Ref<string, string>; categoryBaseSlug: Ref<string, string>; ... 7 more ...; copyToClipboard: (sectionId: string) => Promise<...>; }, ... 23 more ..., {}>'.
- Line 111,20: Property 'image' does not exist on type 'Entity'.
- Line 111,34: Property 'logo' does not exist on type 'Entity'.
- Line 111,47: Property 'logoUrl' does not exist on type 'Entity'.
- Line 112,26: Property 'serplyLink' does not exist on type 'Entity'.
- Line 120,35: Property 'verification' does not exist on type 'Entity'.
- Line 25,17: Property 'verification' does not exist on type 'Entity'.
- Line 25,46: Property 'siteId' does not exist on type 'User'.
- Line 34,19: Property 'basicInfo' does not exist on type 'Entity'.
- Line 35,23: Property 'contracts' does not exist on type 'Entity'.
- Line 36,21: Property 'pricing' does not exist on type 'Entity'.
- Line 37,22: Property 'services' does not exist on type 'Entity'.
- Line 38,24: Property 'industries' does not exist on type 'Entity'.
- Line 39,30: Property 'businessesServed' does not exist on type 'Entity'.
- Line 40,26: Property 'supportSetup' does not exist on type 'Entity'.
- Line 41,21: Property 'ratings' does not exist on type 'Entity'.
- Line 52,11: Property 'entityId' does not exist on type '{ reviews: Reviews; }'.
- Line 62,13: Property 'entityId' does not exist on type '{ reviews: Reviews; }'.
- Line 108,24: Property 'oneLiner' does not exist on type 'Entity'.
- Line 108,41: Property 'description' does not exist on type 'Entity'.
- Line 109,18: Property 'sections' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<\_\_VLS_Props, {}>, { module: Ref<string, string>; baseSlug: Ref<string, string>; categoryBaseSlug: Ref<string, string>; ... 7 more ...; copyToClipboard: (sectionId: string) => Promise<...>; }, ... 23 more ..., {}>'.
- Line 111,20: Property 'image' does not exist on type 'Entity'.
- Line 111,34: Property 'logo' does not exist on type 'Entity'.
- Line 111,47: Property 'logoUrl' does not exist on type 'Entity'.
- Line 112,26: Property 'serplyLink' does not exist on type 'Entity'.
- Line 120,35: Property 'verification' does not exist on type 'Entity'.

**../../packages/ui/components/SPage/Post/CategoryCollection.vue**

- Line 32,26: Property 'category' does not exist on type 'Posts'.
- Line 41,22: Property 'category' does not exist on type 'Posts'.
- Line 32,26: Property 'category' does not exist on type 'Posts'.
- Line 41,22: Property 'category' does not exist on type 'Posts'.

**../../packages/ui/components/SPage/ServiceProvider/CategoryCollection.vue**

- Line 59,34: Property 'companies' does not exist on type 'ServiceProviders'.
- Line 59,34: Property 'companies' does not exist on type 'ServiceProviders'.

**../../packages/ui/components/SPage/ServiceProvider/Collection.vue**

- Line 91,19: Property 'faqItems' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<{}, {}>, { page: Ref<number, number>; limit: Ref<number, number>; categories: Category[]; data: ServiceProviders; }, ... 23 more ..., {}>'.
- Line 91,19: Property 'faqItems' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<{}, {}>, { page: Ref<number, number>; limit: Ref<number, number>; categories: Category[]; data: ServiceProviders; }, ... 23 more ..., {}>'.

**../../packages/ui/components/SPage/ServiceProvider/Single.vue**

- Line 12,53: Property 'siteId' does not exist on type 'User'.
- Line 39,11: Property 'serviceProviderId' does not exist on type '{ reviews: Reviews; }'.
- Line 49,13: Property 'serviceProviderId' does not exist on type '{ reviews: Reviews; }'.
- Line 97,57: Property 'length' does not exist on type 'Reviews'.
- Line 12,53: Property 'siteId' does not exist on type 'User'.
- Line 39,11: Property 'serviceProviderId' does not exist on type '{ reviews: Reviews; }'.
- Line 49,13: Property 'serviceProviderId' does not exist on type '{ reviews: Reviews; }'.
- Line 97,57: Property 'length' does not exist on type 'Reviews'.

**../../packages/ui/components/SPage/Users/Featured/Companies.vue**

- Line 28,71: Property 'slug' does not exist on type 'never'.
- Line 37,42: Property 'entities' does not exist on type '{}'.
- Line 38,41: Property 'entities' does not exist on type '{}'.
- Line 39,46: Property 'entities' does not exist on type '{}'.
- Line 42,51: Property 'availablePlacements' does not exist on type '{}'.
- Line 57,55: Property 'slug' does not exist on type 'never'.
- Line 58,38: Property 'id' does not exist on type 'never'.
- Line 28,71: Property 'slug' does not exist on type 'never'.
- Line 37,42: Property 'entities' does not exist on type '{}'.
- Line 38,41: Property 'entities' does not exist on type '{}'.
- Line 39,46: Property 'entities' does not exist on type '{}'.
- Line 42,51: Property 'availablePlacements' does not exist on type '{}'.
- Line 57,55: Property 'slug' does not exist on type 'never'.
- Line 58,38: Property 'id' does not exist on type 'never'.

**../../packages/ui/components/SPage/Users/Submit/Companies.vue**

- Line 32,30: Property 'id' does not exist on type 'never'.
- Line 35,35: Property 'isPriority' does not exist on type 'never'.
- Line 40,28: Property 'approved' does not exist on type 'never'.
- Line 41,45: Property 'domain' does not exist on type 'never'.
- Line 42,60: Property 'id' does not exist on type 'never'.
- Line 46,34: Property 'logo' does not exist on type 'never'.
- Line 47,34: Property 'logo' does not exist on type 'never'.
- Line 52,31: Property 'name' does not exist on type 'never'.
- Line 52,54: Property 'domain' does not exist on type 'never'.
- Line 54,35: Property 'description' does not exist on type 'never'.
- Line 55,31: Property 'description' does not exist on type 'never'.
- Line 60,30: Property 'approved' does not exist on type 'never'.
- Line 62,34: Property 'reviewedAt' does not exist on type 'never'.
- Line 67,35: Property 'reviewedAt' does not exist on type 'never'.
- Line 68,44: Property 'reviewedAt' does not exist on type 'never'.
- Line 70,35: Property 'reviewedNotes' does not exist on type 'never'.
- Line 71,45: Property 'reviewedNotes' does not exist on type 'never'.
- Line 73,35: Property 'reviewedBy' does not exist on type 'never'.
- Line 74,44: Property 'reviewedBy' does not exist on type 'never'.
- Line 77,43: Property 'createdAt' does not exist on type 'never'.
- Line 32,30: Property 'id' does not exist on type 'never'.
- Line 35,35: Property 'isPriority' does not exist on type 'never'.
- Line 40,28: Property 'approved' does not exist on type 'never'.
- Line 41,45: Property 'domain' does not exist on type 'never'.
- Line 42,60: Property 'id' does not exist on type 'never'.
- Line 46,34: Property 'logo' does not exist on type 'never'.
- Line 47,34: Property 'logo' does not exist on type 'never'.
- Line 52,31: Property 'name' does not exist on type 'never'.
- Line 52,54: Property 'domain' does not exist on type 'never'.
- Line 54,35: Property 'description' does not exist on type 'never'.
- Line 55,31: Property 'description' does not exist on type 'never'.
- Line 60,30: Property 'approved' does not exist on type 'never'.
- Line 62,34: Property 'reviewedAt' does not exist on type 'never'.
- Line 67,35: Property 'reviewedAt' does not exist on type 'never'.
- Line 68,44: Property 'reviewedAt' does not exist on type 'never'.
- Line 70,35: Property 'reviewedNotes' does not exist on type 'never'.
- Line 71,45: Property 'reviewedNotes' does not exist on type 'never'.
- Line 73,35: Property 'reviewedBy' does not exist on type 'never'.
- Line 74,44: Property 'reviewedBy' does not exist on type 'never'.
- Line 77,43: Property 'createdAt' does not exist on type 'never'.

**../../packages/ui/components/SPage/Users/Submit/Company.vue**

- Line 54,26: Property 'approved' does not exist on type '{}'.
- Line 55,48: Property 'domain' does not exist on type '{}'.
- Line 57,35: Property 'formData' does not exist on type '{}'.
- Line 58,37: Property 'formData' does not exist on type '{}'.
- Line 59,39: Property 'formData' does not exist on type '{}'.
- Line 61,24: Property 'formData' does not exist on type '{}'.
- Line 62,24: Property 'formData' does not exist on type '{}'.
- Line 63,28: Property 'formData' does not exist on type '{}'.
- Line 65,41: Property 'formData' does not exist on type '{}'.
- Line 66,44: Property 'formData' does not exist on type '{}'.
- Line 67,43: Property 'formData' does not exist on type '{}'.
- Line 68,26: Property 'formData' does not exist on type '{}'.
- Line 72,37: Property 'formData' does not exist on type '{}'.
- Line 73,40: Property 'formData' does not exist on type '{}'.
- Line 74,26: Property 'formData' does not exist on type '{}'.
- Line 76,29: Property 'formData' does not exist on type '{}'.
- Line 77,41: Property 'formData' does not exist on type '{}'.
- Line 78,41: Property 'formData' does not exist on type '{}'.
- Line 249,24: Property 'email' does not exist on type 'User'.
- Line 313,44: Property 'verified' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; error?: undefined; verified?: undefined; }> | SerializeObject<{ ok: boolean; error: string; status?: undefined; message?: undefined; verified?: undefined; }> | SerializeObject<...>>'.
- Line 54,26: Property 'approved' does not exist on type '{}'.
- Line 55,48: Property 'domain' does not exist on type '{}'.
- Line 57,35: Property 'formData' does not exist on type '{}'.
- Line 58,37: Property 'formData' does not exist on type '{}'.
- Line 59,39: Property 'formData' does not exist on type '{}'.
- Line 61,24: Property 'formData' does not exist on type '{}'.
- Line 62,24: Property 'formData' does not exist on type '{}'.
- Line 63,28: Property 'formData' does not exist on type '{}'.
- Line 65,41: Property 'formData' does not exist on type '{}'.
- Line 66,44: Property 'formData' does not exist on type '{}'.
- Line 67,43: Property 'formData' does not exist on type '{}'.
- Line 68,26: Property 'formData' does not exist on type '{}'.
- Line 72,37: Property 'formData' does not exist on type '{}'.
- Line 73,40: Property 'formData' does not exist on type '{}'.
- Line 74,26: Property 'formData' does not exist on type '{}'.
- Line 76,29: Property 'formData' does not exist on type '{}'.
- Line 77,41: Property 'formData' does not exist on type '{}'.
- Line 78,41: Property 'formData' does not exist on type '{}'.
- Line 249,24: Property 'email' does not exist on type 'User'.
- Line 313,44: Property 'verified' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; error?: undefined; verified?: undefined; }> | SerializeObject<{ ok: boolean; error: string; status?: undefined; message?: undefined; verified?: undefined; }> | SerializeObject<...>>'.

**../../packages/ui/components/SinglePosts/GlossaryPost.vue**

- Line 15,27: Property 'comments' does not exist on type 'Comment[]'.
- Line 44,56: Property 'index' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<\_\_VLS_Props, {}>, { useAuth: boolean; data: any; comments: any; setVideoRef: (el: HTMLElement | null, index: number) => void; }, ... 23 more ..., {}>'.
- Line 15,27: Property 'comments' does not exist on type 'Comment[]'.
- Line 44,56: Property 'index' does not exist on type 'CreateComponentPublicInstanceWithMixins<ToResolvedProps<\_\_VLS_Props, {}>, { useAuth: boolean; data: any; comments: any; setVideoRef: (el: HTMLElement | null, index: number) => void; }, ... 23 more ..., {}>'.

**../../packages/ui/components/SinglePosts/Post.vue**

- Line 22,29: Property 'comments' does not exist on type 'Comment[]'.
- Line 22,29: Property 'comments' does not exist on type 'Comment[]'.

**../../packages/ui/components/SongsLinkHub.vue**

- Line 19,42: Property 'artistCreditName' does not exist on type 'RecordingIndex'.
- Line 19,42: Property 'artistCreditName' does not exist on type 'RecordingIndex'.

**../../packages/ui/components/StripeCard.vue**

- Line 38,15: Property 'clientSecret' does not exist on type 'unknown'.
- Line 38,33: Property 'error' does not exist on type 'unknown'.
- Line 38,15: Property 'clientSecret' does not exist on type 'unknown'.
- Line 38,33: Property 'error' does not exist on type 'unknown'.

**../../packages/ui/components/UpvoteButton.vue**

- Line 30,27: Property 'email' does not exist on type 'User'.
- Line 45,54: Property 'email' does not exist on type 'User'.
- Line 47,47: Property 'email' does not exist on type 'User'.
- Line 50,48: Property 'email' does not exist on type 'User'.
- Line 30,27: Property 'email' does not exist on type 'User'.
- Line 45,54: Property 'email' does not exist on type 'User'.
- Line 47,47: Property 'email' does not exist on type 'User'.
- Line 50,48: Property 'email' does not exist on type 'User'.

**../../packages/ui/components/VerificationButton.vue**

- Line 30,22: Property 'email' does not exist on type 'User'.
- Line 52,34: Property 'siteId' does not exist on type 'ComputedRef<User | null>'.
- Line 91,15: Property 'ok' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; requestId?: undefined; error?: undefined; }> | SerializeObject<{ ok: boolean; requestId: number; status?: undefined; message?: undefined; error?: undefined; }> | SerializeObject<...>>'.
- Line 103,55: Property 'error' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; requestId?: undefined; error?: undefined; }> | SerializeObject<{ ok: boolean; requestId: number; status?: undefined; message?: undefined; error?: undefined; }> | SerializeObject<...>>'.
- Line 147,30: Property 'email' does not exist on type 'User'.
- Line 30,22: Property 'email' does not exist on type 'User'.
- Line 52,34: Property 'siteId' does not exist on type 'ComputedRef<User | null>'.
- Line 91,15: Property 'ok' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; requestId?: undefined; error?: undefined; }> | SerializeObject<{ ok: boolean; requestId: number; status?: undefined; message?: undefined; error?: undefined; }> | SerializeObject<...>>'.
- Line 103,55: Property 'error' does not exist on type 'Simplify<SerializeObject<{ status: number; message: string; ok?: undefined; requestId?: undefined; error?: undefined; }> | SerializeObject<{ ok: boolean; requestId: number; status?: undefined; message?: undefined; error?: undefined; }> | SerializeObject<...>>'.
- Line 147,30: Property 'email' does not exist on type 'User'.

**../../packages/ui/components/VoteButton.vue**

- Line 36,25: Property 'siteId' does not exist on type 'User'.
- Line 36,25: Property 'siteId' does not exist on type 'User'.

**server/routes/sitemap/albums/[page].xml.ts**

- Line 11,22: Property 'map' does not exist on type '{}'.

**server/routes/sitemap/artists/[page].xml.ts**

- Line 11,22: Property 'map' does not exist on type '{}'.

**server/routes/sitemap/songs/[page].xml.ts**

- Line 11,22: Property 'map' does not exist on type '{}'.

---

### TS2532: Object is possibly undefined (170 errors)

**../../packages/api/server/api/**sitemap**/[module]/categories.ts**

- Line 17,30: Object is possibly 'undefined'.
- Line 28,28: Object is possibly 'undefined'.
- Line 17,30: Object is possibly 'undefined'.
- Line 28,28: Object is possibly 'undefined'.

**../../packages/api/server/api/**sitemap**/[module]/index.ts**

- Line 17,30: Object is possibly 'undefined'.
- Line 28,26: Object is possibly 'undefined'.
- Line 17,30: Object is possibly 'undefined'.
- Line 28,26: Object is possibly 'undefined'.

**../../packages/api/server/api/**sitemap**/[module]/topics.ts**

- Line 17,30: Object is possibly 'undefined'.
- Line 28,24: Object is possibly 'undefined'.
- Line 17,30: Object is possibly 'undefined'.
- Line 28,24: Object is possibly 'undefined'.

**../../packages/api/server/api/categories.ts**

- Line 15,17: Object is possibly 'undefined'.
- Line 15,17: Object is possibly 'undefined'.

**../../packages/api/server/api/comments/[id].get.ts**

- Line 64,26: Object is possibly 'undefined'.
- Line 64,26: Object is possibly 'undefined'.

**../../packages/api/server/api/comments/[id].post.ts**

- Line 32,28: Object is possibly 'undefined'.
- Line 32,28: Object is possibly 'undefined'.

**../../packages/api/server/api/comments/[id].put.ts**

- Line 27,34: Object is possibly 'undefined'.
- Line 27,34: Object is possibly 'undefined'.

**../../packages/api/server/api/entities/all-for-category.ts**

- Line 12,21: Object is possibly 'undefined'.
- Line 55,43: Object is possibly 'undefined'.
- Line 12,21: Object is possibly 'undefined'.
- Line 55,43: Object is possibly 'undefined'.

**../../packages/api/server/api/entities/index.ts**

- Line 32,31: Object is possibly 'undefined'.
- Line 55,32: Object is possibly 'undefined'.
- Line 137,21: Object is possibly 'undefined'.
- Line 226,22: Object is possibly 'undefined'.
- Line 230,27: Object is possibly 'undefined'.
- Line 32,31: Object is possibly 'undefined'.
- Line 55,32: Object is possibly 'undefined'.
- Line 137,21: Object is possibly 'undefined'.
- Line 226,22: Object is possibly 'undefined'.
- Line 230,27: Object is possibly 'undefined'.

**../../packages/api/server/api/entities/search.ts**

- Line 96,27: Object is possibly 'undefined'.
- Line 96,27: Object is possibly 'undefined'.

**../../packages/api/server/api/entities/verified.ts**

- Line 25,36: Object is possibly 'undefined'.
- Line 25,36: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/[slug].ts**

- Line 25,27: Object is possibly 'undefined'.
- Line 49,25: Object is possibly 'undefined'.
- Line 61,27: Object is possibly 'undefined'.
- Line 104,21: Object is possibly 'undefined'.
- Line 25,27: Object is possibly 'undefined'.
- Line 49,25: Object is possibly 'undefined'.
- Line 61,27: Object is possibly 'undefined'.
- Line 104,21: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/check-if-valid-feature-placement.ts**

- Line 23,21: Object is possibly 'undefined'.
- Line 50,27: Object is possibly 'undefined'.
- Line 70,30: Object is possibly 'undefined'.
- Line 23,21: Object is possibly 'undefined'.
- Line 50,27: Object is possibly 'undefined'.
- Line 70,30: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/claim/[id].post.ts**

- Line 17,32: Object is possibly 'undefined'.
- Line 30,38: Object is possibly 'undefined'.
- Line 71,28: Object is possibly 'undefined'.
- Line 17,32: Object is possibly 'undefined'.
- Line 30,38: Object is possibly 'undefined'.
- Line 71,28: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/claims.get.ts**

- Line 25,39: Object is possibly 'undefined'.
- Line 25,39: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/edit.get.ts**

- Line 20,21: Object is possibly 'undefined'.
- Line 27,21: Object is possibly 'undefined'.
- Line 20,21: Object is possibly 'undefined'.
- Line 27,21: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/edit.post.ts**

- Line 40,32: Object is possibly 'undefined'.
- Line 66,28: Object is possibly 'undefined'.
- Line 81,34: Object is possibly 'undefined'.
- Line 97,11: Object is possibly 'undefined'.
- Line 40,32: Object is possibly 'undefined'.
- Line 66,28: Object is possibly 'undefined'.
- Line 81,34: Object is possibly 'undefined'.
- Line 97,11: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/edit.put.ts**

- Line 26,29: Object is possibly 'undefined'.
- Line 40,27: Object is possibly 'undefined'.
- Line 74,11: Object is possibly 'undefined'.
- Line 82,32: Object is possibly 'undefined'.
- Line 114,34: Object is possibly 'undefined'.
- Line 141,30: Object is possibly 'undefined'.
- Line 157,36: Object is possibly 'undefined'.
- Line 26,29: Object is possibly 'undefined'.
- Line 40,27: Object is possibly 'undefined'.
- Line 74,11: Object is possibly 'undefined'.
- Line 82,32: Object is possibly 'undefined'.
- Line 114,34: Object is possibly 'undefined'.
- Line 141,30: Object is possibly 'undefined'.
- Line 157,36: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/featured-subscriptions.get.ts**

- Line 22,27: Object is possibly 'undefined'.
- Line 22,27: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/flag-review.delete.ts**

- Line 20,34: Object is possibly 'undefined'.
- Line 32,11: Object is possibly 'undefined'.
- Line 20,34: Object is possibly 'undefined'.
- Line 32,11: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/flag-review.post.ts**

- Line 23,34: Object is possibly 'undefined'.
- Line 35,11: Object is possibly 'undefined'.
- Line 23,34: Object is possibly 'undefined'.
- Line 35,11: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/reserve-featured-spot.ts**

- Line 27,21: Object is possibly 'undefined'.
- Line 58,27: Object is possibly 'undefined'.
- Line 81,31: Object is possibly 'undefined'.
- Line 27,21: Object is possibly 'undefined'.
- Line 58,27: Object is possibly 'undefined'.
- Line 81,31: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/submit-verify-backlink.post.ts**

- Line 14,25: Object is possibly 'undefined'.
- Line 85,11: Object is possibly 'undefined'.
- Line 14,25: Object is possibly 'undefined'.
- Line 85,11: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/submit.get.ts**

- Line 14,29: Object is possibly 'undefined'.
- Line 33,29: Object is possibly 'undefined'.
- Line 14,29: Object is possibly 'undefined'.
- Line 33,29: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/submit.post.ts**

- Line 30,32: Object is possibly 'undefined'.
- Line 58,28: Object is possibly 'undefined'.
- Line 73,34: Object is possibly 'undefined'.
- Line 97,40: Object is possibly 'undefined'.
- Line 129,13: Object is possibly 'undefined'.
- Line 139,13: Object is possibly 'undefined'.
- Line 30,32: Object is possibly 'undefined'.
- Line 58,28: Object is possibly 'undefined'.
- Line 73,34: Object is possibly 'undefined'.
- Line 97,40: Object is possibly 'undefined'.
- Line 129,13: Object is possibly 'undefined'.
- Line 139,13: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/verify/email.post.ts**

- Line 23,23: Object is possibly 'undefined'.
- Line 52,23: Object is possibly 'undefined'.
- Line 61,9: Object is possibly 'undefined'.
- Line 23,23: Object is possibly 'undefined'.
- Line 52,23: Object is possibly 'undefined'.
- Line 61,9: Object is possibly 'undefined'.

**../../packages/api/server/api/entity/verify/email/initiate.post.ts**

- Line 31,29: Object is possibly 'undefined'.
- Line 43,25: Object is possibly 'undefined'.
- Line 64,25: Object is possibly 'undefined'.
- Line 31,29: Object is possibly 'undefined'.
- Line 43,25: Object is possibly 'undefined'.
- Line 64,25: Object is possibly 'undefined'.

**../../packages/api/server/api/newsletter/subscribe.post.ts**

- Line 18,11: Object is possibly 'undefined'.
- Line 18,11: Object is possibly 'undefined'.

**../../packages/api/server/api/reviews/[id].delete.ts**

- Line 17,34: Object is possibly 'undefined'.
- Line 29,11: Object is possibly 'undefined'.
- Line 17,34: Object is possibly 'undefined'.
- Line 29,11: Object is possibly 'undefined'.

**../../packages/api/server/api/reviews/[id].get.ts**

- Line 21,27: Object is possibly 'undefined'.
- Line 49,36: Object is possibly 'undefined'.
- Line 58,33: Object is possibly 'undefined'.
- Line 21,27: Object is possibly 'undefined'.
- Line 49,36: Object is possibly 'undefined'.
- Line 58,33: Object is possibly 'undefined'.

**../../packages/api/server/api/reviews/[id].post.ts**

- Line 32,34: Object is possibly 'undefined'.
- Line 47,11: Object is possibly 'undefined'.
- Line 32,34: Object is possibly 'undefined'.
- Line 47,11: Object is possibly 'undefined'.

**../../packages/api/server/api/reviews/[id].put.ts**

- Line 32,34: Object is possibly 'undefined'.
- Line 46,11: Object is possibly 'undefined'.
- Line 32,34: Object is possibly 'undefined'.
- Line 46,11: Object is possibly 'undefined'.

**../../packages/api/server/api/svg/badge.ts**

- Line 24,25: Object is possibly 'undefined'.
- Line 24,25: Object is possibly 'undefined'.

**../../packages/api/server/api/topics.ts**

- Line 15,17: Object is possibly 'undefined'.
- Line 15,17: Object is possibly 'undefined'.

**../../packages/api/server/api/vote.post.ts**

- Line 28,32: Object is possibly 'undefined'.
- Line 39,15: Object is possibly 'undefined'.
- Line 45,15: Object is possibly 'undefined'.
- Line 54,13: Object is possibly 'undefined'.
- Line 28,32: Object is possibly 'undefined'.
- Line 39,15: Object is possibly 'undefined'.
- Line 45,15: Object is possibly 'undefined'.
- Line 54,13: Object is possibly 'undefined'.

**../../packages/auth/server/utils/oauth.ts**

- Line 30,9: Object is possibly 'undefined'.
- Line 75,26: Object is possibly 'undefined'.
- Line 30,9: Object is possibly 'undefined'.
- Line 75,26: Object is possibly 'undefined'.

---

### TS18046: Value is of type unknown (130 errors)

**../../packages/api/server/api/comments/[id].get.ts**

- Line 106,36: 'error' is of type 'unknown'.
- Line 106,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/comments/[id].post.ts**

- Line 44,36: 'error' is of type 'unknown'.
- Line 44,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/comments/[id].put.ts**

- Line 48,36: 'error' is of type 'unknown'.
- Line 48,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/entities/verified.ts**

- Line 41,15: 'err' is of type 'unknown'.
- Line 42,16: 'err' is of type 'unknown'.
- Line 41,15: 'err' is of type 'unknown'.
- Line 42,16: 'err' is of type 'unknown'.

**../../packages/api/server/api/entity/claim/[id].post.ts**

- Line 81,36: 'error' is of type 'unknown'.
- Line 81,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/claims.get.ts**

- Line 39,36: 'error' is of type 'unknown'.
- Line 39,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/edit.get.ts**

- Line 37,15: 'error' is of type 'unknown'.
- Line 38,16: 'error' is of type 'unknown'.
- Line 37,15: 'error' is of type 'unknown'.
- Line 38,16: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/edit.post.ts**

- Line 113,15: 'error' is of type 'unknown'.
- Line 114,16: 'error' is of type 'unknown'.
- Line 113,15: 'error' is of type 'unknown'.
- Line 114,16: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/edit.put.ts**

- Line 188,15: 'err' is of type 'unknown'.
- Line 189,16: 'err' is of type 'unknown'.
- Line 188,15: 'err' is of type 'unknown'.
- Line 189,16: 'err' is of type 'unknown'.

**../../packages/api/server/api/entity/featured-subscriptions.get.ts**

- Line 53,15: 'error' is of type 'unknown'.
- Line 54,16: 'error' is of type 'unknown'.
- Line 53,15: 'error' is of type 'unknown'.
- Line 54,16: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/flag-review.delete.ts**

- Line 48,36: 'error' is of type 'unknown'.
- Line 48,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/flag-review.post.ts**

- Line 49,36: 'error' is of type 'unknown'.
- Line 49,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/reserve-featured-spot.ts**

- Line 165,21: 'error' is of type 'unknown'.
- Line 165,21: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/submit.get.ts**

- Line 61,15: 'error' is of type 'unknown'.
- Line 62,16: 'error' is of type 'unknown'.
- Line 61,15: 'error' is of type 'unknown'.
- Line 62,16: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/submit.post.ts**

- Line 167,15: 'error' is of type 'unknown'.
- Line 168,16: 'error' is of type 'unknown'.
- Line 167,15: 'error' is of type 'unknown'.
- Line 168,16: 'error' is of type 'unknown'.

**../../packages/api/server/api/entity/verify/email/initiate.post.ts**

- Line 89,21: 'error' is of type 'unknown'.
- Line 89,21: 'error' is of type 'unknown'.

**../../packages/api/server/api/newsletter/subscribe.post.ts**

- Line 60,15: 'error' is of type 'unknown'.
- Line 61,16: 'error' is of type 'unknown'.
- Line 60,15: 'error' is of type 'unknown'.
- Line 61,16: 'error' is of type 'unknown'.

**../../packages/api/server/api/reviews/[id].delete.ts**

- Line 36,36: 'error' is of type 'unknown'.
- Line 36,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/reviews/[id].get.ts**

- Line 88,36: 'error' is of type 'unknown'.
- Line 88,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/reviews/[id].post.ts**

- Line 62,36: 'error' is of type 'unknown'.
- Line 62,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/reviews/[id].put.ts**

- Line 60,36: 'error' is of type 'unknown'.
- Line 60,36: 'error' is of type 'unknown'.

**../../packages/api/server/api/vote.post.ts**

- Line 67,36: 'error' is of type 'unknown'.
- Line 67,36: 'error' is of type 'unknown'.

**../../packages/notifications/server/utils/providers/slack.ts**

- Line 41,14: 'error' is of type 'unknown'.
- Line 41,14: 'error' is of type 'unknown'.

**../../packages/ui/components/BookmarkButton.vue**

- Line 44,13: 'response.value' is of type 'unknown'.
- Line 63,26: 'response.value' is of type 'unknown'.
- Line 44,13: 'response.value' is of type 'unknown'.
- Line 63,26: 'response.value' is of type 'unknown'.

**../../packages/ui/components/CommentWrapper.vue**

- Line 242,22: 'error' is of type 'unknown'.
- Line 312,22: 'error' is of type 'unknown'.
- Line 425,22: 'error' is of type 'unknown'.
- Line 242,22: 'error' is of type 'unknown'.
- Line 312,22: 'error' is of type 'unknown'.
- Line 425,22: 'error' is of type 'unknown'.

**../../packages/ui/components/CommentsContainer.vue**

- Line 91,43: 'comment' is of type 'unknown'.
- Line 161,24: 'error' is of type 'unknown'.
- Line 353,17: 'item' is of type 'unknown'.
- Line 360,36: 'item' is of type 'unknown'.
- Line 91,43: 'comment' is of type 'unknown'.
- Line 161,24: 'error' is of type 'unknown'.
- Line 353,17: 'item' is of type 'unknown'.
- Line 360,36: 'item' is of type 'unknown'.

**../../packages/ui/components/Embeds/Forms/ShieldBadgeCustomizer.vue**

- Line 41,32: 'companiesForCategory' is of type 'unknown'.
- Line 41,32: 'companiesForCategory' is of type 'unknown'.

**../../packages/ui/components/ReviewModal.vue**

- Line 103,22: 'err' is of type 'unknown'.
- Line 103,22: 'err' is of type 'unknown'.

**../../packages/ui/components/SPage/Generic/ServiceProvider.vue**

- Line 78,19: 'h2' is of type 'unknown'.
- Line 78,19: 'h2' is of type 'unknown'.

**../../packages/ui/components/SPage/Users/Featured/Companies.vue**

- Line 99,11: 'data' is of type 'unknown'.
- Line 99,11: 'data' is of type 'unknown'.

**../../packages/ui/components/SPage/Users/Submit/Company.vue**

- Line 217,30: 'err' is of type 'unknown'.
- Line 286,22: 'error' is of type 'unknown'.
- Line 333,22: 'error' is of type 'unknown'.
- Line 217,30: 'err' is of type 'unknown'.
- Line 286,22: 'error' is of type 'unknown'.
- Line 333,22: 'error' is of type 'unknown'.

**../../packages/ui/components/SaasLanding.vue**

- Line 15,15: 'props.page' is of type 'unknown'.
- Line 16,21: 'props.page' is of type 'unknown'.
- Line 17,15: 'props.page' is of type 'unknown'.
- Line 30,34: 'props.page' is of type 'unknown'.
- Line 42,13: 'props.page' is of type 'unknown'.
- Line 43,15: 'props.page' is of type 'unknown'.
- Line 44,21: 'props.page' is of type 'unknown'.
- Line 48,35: 'props.page' is of type 'unknown'.
- Line 57,13: 'props.page' is of type 'unknown'.
- Line 59,18: 'props.page' is of type 'unknown'.
- Line 60,15: 'props.page' is of type 'unknown'.
- Line 61,21: 'props.page' is of type 'unknown'.
- Line 65,42: 'props.page' is of type 'unknown'.
- Line 84,13: 'props.page' is of type 'unknown'.
- Line 85,15: 'props.page' is of type 'unknown'.
- Line 15,15: 'props.page' is of type 'unknown'.
- Line 16,21: 'props.page' is of type 'unknown'.
- Line 17,15: 'props.page' is of type 'unknown'.
- Line 30,34: 'props.page' is of type 'unknown'.
- Line 42,13: 'props.page' is of type 'unknown'.
- Line 43,15: 'props.page' is of type 'unknown'.
- Line 44,21: 'props.page' is of type 'unknown'.
- Line 48,35: 'props.page' is of type 'unknown'.
- Line 57,13: 'props.page' is of type 'unknown'.
- Line 59,18: 'props.page' is of type 'unknown'.
- Line 60,15: 'props.page' is of type 'unknown'.
- Line 61,21: 'props.page' is of type 'unknown'.
- Line 65,42: 'props.page' is of type 'unknown'.
- Line 84,13: 'props.page' is of type 'unknown'.
- Line 85,15: 'props.page' is of type 'unknown'.

**../../packages/ui/components/UpvoteButton.vue**

- Line 44,13: 'response.value' is of type 'unknown'.
- Line 63,26: 'response.value' is of type 'unknown'.
- Line 44,13: 'response.value' is of type 'unknown'.
- Line 63,26: 'response.value' is of type 'unknown'.

**server/routes/sitemap_index.xml.ts**

- Line 39,18: 'sitemap' is of type 'unknown'.
- Line 40,22: 'sitemap' is of type 'unknown'.

---

### TS2353: Object literal unknown properties (106 errors)

**../../packages/api/server/api/entity/flag-review.delete.ts**

- Line 40,9: Object literal may only specify known properties, and 'reviewedBy' does not exist in type '{ user?: number | SQL<unknown> | PgColumn<ColumnBaseConfig<ColumnDataType, string>, {}, {}> | undefined; content?: string | SQL<unknown> | PgColumn<...> | undefined; ... 10 more ...; flaggedBy?: number | ... 3 more ... | undefined; }'.
- Line 40,9: Object literal may only specify known properties, and 'reviewedBy' does not exist in type '{ user?: number | SQL<unknown> | PgColumn<ColumnBaseConfig<ColumnDataType, string>, {}, {}> | undefined; content?: string | SQL<unknown> | PgColumn<...> | undefined; ... 10 more ...; flaggedBy?: number | ... 3 more ... | undefined; }'.

**../../packages/ui/components/JSONRenderer.vue**

- Line 267,26: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 267,26: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/MultipageHeaderMusic.vue**

- Line 106,18: Object literal may only specify known properties, and 'rounded' does not exist in type '{ base?: ClassNameValue; label?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailingIcon?: ClassNameValue; }'.
- Line 106,18: Object literal may only specify known properties, and 'rounded' does not exist in type '{ base?: ClassNameValue; label?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailingIcon?: ClassNameValue; }'.

**../../packages/ui/components/ReviewDistributionCard.vue**

- Line 60,15: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 60,15: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/ReviewModal.vue**

- Line 38,7: Object literal may only specify known properties, and 'immediate' does not exist in type 'WatchEffectOptions'.
- Line 123,7: Object literal may only specify known properties, and 'container' does not exist in type '{ overlay?: ClassNameValue; content?: ClassNameValue; header?: ClassNameValue; wrapper?: ClassNameValue; body?: ClassNameValue; footer?: ClassNameValue; title?: ClassNameValue; description?: ClassNameValue; close?: ClassNameValue; }'.
- Line 155,15: Object literal may only specify known properties, and 'input' does not exist in type '{ root?: ClassNameValue; base?: ClassNameValue; leading?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailing?: ClassNameValue; trailingIcon?: ClassNameValue; }'.
- Line 197,15: Object literal may only specify known properties, and 'input' does not exist in type '{ root?: ClassNameValue; base?: ClassNameValue; leading?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailing?: ClassNameValue; trailingIcon?: ClassNameValue; }'.
- Line 220,15: Object literal may only specify known properties, and 'input' does not exist in type '{ root?: ClassNameValue; base?: ClassNameValue; leading?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailing?: ClassNameValue; trailingIcon?: ClassNameValue; }'.
- Line 38,7: Object literal may only specify known properties, and 'immediate' does not exist in type 'WatchEffectOptions'.
- Line 123,7: Object literal may only specify known properties, and 'container' does not exist in type '{ overlay?: ClassNameValue; content?: ClassNameValue; header?: ClassNameValue; wrapper?: ClassNameValue; body?: ClassNameValue; footer?: ClassNameValue; title?: ClassNameValue; description?: ClassNameValue; close?: ClassNameValue; }'.
- Line 155,15: Object literal may only specify known properties, and 'input' does not exist in type '{ root?: ClassNameValue; base?: ClassNameValue; leading?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailing?: ClassNameValue; trailingIcon?: ClassNameValue; }'.
- Line 197,15: Object literal may only specify known properties, and 'input' does not exist in type '{ root?: ClassNameValue; base?: ClassNameValue; leading?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailing?: ClassNameValue; trailingIcon?: ClassNameValue; }'.
- Line 220,15: Object literal may only specify known properties, and 'input' does not exist in type '{ root?: ClassNameValue; base?: ClassNameValue; leading?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailing?: ClassNameValue; trailingIcon?: ClassNameValue; }'.

**../../packages/ui/components/SHeader.vue**

- Line 128,15: Object literal may only specify known properties, and 'base' does not exist in type '{ content?: ClassNameValue; arrow?: ClassNameValue; group?: ClassNameValue; label?: ClassNameValue; separator?: ClassNameValue; ... 9 more ...; itemLabelExternalIcon?: ClassNameValue; }'.
- Line 173,23: Object literal may only specify known properties, and 'align' does not exist in type 'Omit<NavigationMenuContentProps, "as" | "asChild" | "forceMount"> & Partial<EmitsToProps<DismissableLayerEmits>>'.
- Line 128,15: Object literal may only specify known properties, and 'base' does not exist in type '{ content?: ClassNameValue; arrow?: ClassNameValue; group?: ClassNameValue; label?: ClassNameValue; separator?: ClassNameValue; ... 9 more ...; itemLabelExternalIcon?: ClassNameValue; }'.
- Line 173,23: Object literal may only specify known properties, and 'align' does not exist in type 'Omit<NavigationMenuContentProps, "as" | "asChild" | "forceMount"> & Partial<EmitsToProps<DismissableLayerEmits>>'.

**../../packages/ui/components/SPage/Album/Single.vue**

- Line 124,40: Object literal may only specify known properties, and 'container' does not exist in type '{ root?: ClassNameValue; list?: ClassNameValue; item?: ClassNameValue; link?: ClassNameValue; linkLeadingIcon?: ClassNameValue; ... 4 more ...; separatorIcon?: ClassNameValue; }'.
- Line 143,35: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 124,40: Object literal may only specify known properties, and 'container' does not exist in type '{ root?: ClassNameValue; list?: ClassNameValue; item?: ClassNameValue; link?: ClassNameValue; linkLeadingIcon?: ClassNameValue; ... 4 more ...; separatorIcon?: ClassNameValue; }'.
- Line 143,35: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/Artist/Single.vue**

- Line 96,40: Object literal may only specify known properties, and 'container' does not exist in type '{ root?: ClassNameValue; list?: ClassNameValue; item?: ClassNameValue; link?: ClassNameValue; linkLeadingIcon?: ClassNameValue; ... 4 more ...; separatorIcon?: ClassNameValue; }'.
- Line 96,40: Object literal may only specify known properties, and 'container' does not exist in type '{ root?: ClassNameValue; list?: ClassNameValue; item?: ClassNameValue; link?: ClassNameValue; linkLeadingIcon?: ClassNameValue; ... 4 more ...; separatorIcon?: ClassNameValue; }'.

**../../packages/ui/components/SPage/Company/CategoryCollection.vue**

- Line 87,26: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.
- Line 87,26: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/Company/Single.vue**

- Line 180,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 205,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 228,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 253,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 280,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 302,17: Object literal may only specify known properties, and 'base' does not exist in type 'ClassNameArray'.
- Line 323,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 377,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 428,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 486,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 180,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 205,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 228,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 253,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 280,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 302,17: Object literal may only specify known properties, and 'base' does not exist in type 'ClassNameArray'.
- Line 323,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 377,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 428,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 486,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/Generic/Collection.vue**

- Line 128,24: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.
- Line 128,24: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/Generic/Single.vue**

- Line 146,22: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 204,22: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 146,22: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 204,22: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/MCP/Server/Collection.vue**

- Line 120,24: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.
- Line 120,24: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/MCP/Server/Single.vue**

- Line 92,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 137,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 153,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 169,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 191,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 213,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 260,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 287,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 92,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 137,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 153,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 169,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 191,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 213,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 260,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 287,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/ServiceProvider/CategoryCollection.vue**

- Line 87,26: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.
- Line 87,26: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/ServiceProvider/Collection.vue**

- Line 92,26: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.
- Line 92,26: Object literal may only specify known properties, and 'class' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/ServiceProvider/Single.vue**

- Line 170,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 472,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 491,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 512,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 535,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 553,17: Object literal may only specify known properties, and 'base' does not exist in type 'ClassNameArray'.
- Line 574,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 624,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 686,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 740,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 170,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 472,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 491,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 512,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 535,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 553,17: Object literal may only specify known properties, and 'base' does not exist in type 'ClassNameArray'.
- Line 574,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 624,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 686,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.
- Line 740,24: Object literal may only specify known properties, and 'padding' does not exist in type 'ClassNameArray'.

**../../packages/ui/components/SPage/Song/Single.vue**

- Line 142,40: Object literal may only specify known properties, and 'container' does not exist in type '{ root?: ClassNameValue; list?: ClassNameValue; item?: ClassNameValue; link?: ClassNameValue; linkLeadingIcon?: ClassNameValue; ... 4 more ...; separatorIcon?: ClassNameValue; }'.
- Line 142,40: Object literal may only specify known properties, and 'container' does not exist in type '{ root?: ClassNameValue; list?: ClassNameValue; item?: ClassNameValue; link?: ClassNameValue; linkLeadingIcon?: ClassNameValue; ... 4 more ...; separatorIcon?: ClassNameValue; }'.

**../../packages/ui/components/SScriptYouTubePlayer.vue**

- Line 25,21: Object literal may only specify known properties, and 'autoplay' does not exist in type '(props: LooseRequired<\_\_VLS_Props>) => PlayerVars'.
- Line 25,21: Object literal may only specify known properties, and 'autoplay' does not exist in type '(props: LooseRequired<\_\_VLS_Props>) => PlayerVars'.

**nuxt.config.ts**

- Line 165,5: Object literal may only specify known properties, and 'host' does not exist in type 'Partial<ModuleOptions>'.
- Line 169,7: Object literal may only specify known properties, and 'nuxthref' does not exist in type '{ nuxtLink?: { componentName?: string | undefined; externalRelAttribute?: string | null | undefined; trailingSlash?: "append" | "remove" | undefined; prefetchOn?: { visibility?: boolean | undefined; interaction?: boolean | undefined; } | undefined; activeClass?: string | undefined; exactActiveClass?: string | undefi...'.
- Line 78,5: Object literal may only specify known properties, and 'host' does not exist in type 'Partial<ModuleOptions>'.
- Line 82,7: Object literal may only specify known properties, and 'nuxthref' does not exist in type '{ nuxtLink?: { componentName?: string | undefined; externalRelAttribute?: string | null | undefined; trailingSlash?: "append" | "remove" | undefined; prefetchOn?: { visibility?: boolean | undefined; interaction?: boolean | undefined; } | undefined; activeClass?: string | undefined; exactActiveClass?: string | undefi...'.

---

### TS2322: Type is not assignable to type (88 errors)

**../../packages/notifications/server/utils/providers/slack.ts**

- Line 31,9: Type 'string | undefined' is not assignable to type 'string'.
- Line 31,9: Type 'string | undefined' is not assignable to type 'string'.

**../../packages/ui/components/CommentWrapper.vue**

- Line 31,7: Type 'any[]' is not assignable to type 'never[]'.
- Line 220,9: Type 'number' is not assignable to type 'null'.
- Line 31,7: Type 'any[]' is not assignable to type 'never[]'.
- Line 220,9: Type 'number' is not assignable to type 'null'.

**../../packages/ui/components/CommentsContainer.vue**

- Line 354,12: Type 'unknown' is not assignable to type 'Record<string, any> | undefined'.
- Line 354,12: Type 'unknown' is not assignable to type 'Record<string, any> | undefined'.

**../../packages/ui/components/CompanyCard.vue**

- Line 112,17: Type '"filled"' is not assignable to type '"outline" | "soft" | "subtle" | "solid" | undefined'.
- Line 112,17: Type '"filled"' is not assignable to type '"outline" | "soft" | "subtle" | "solid" | undefined'.

**../../packages/ui/components/ContactForm.vue**

- Line 96,15: Type 'string' is not assignable to type 'number'.
- Line 96,15: Type 'string' is not assignable to type 'number'.

**../../packages/ui/components/Embeds/Forms/ShieldBadgeCustomizer.vue**

- Line 31,5: Type 'unknown' is not assignable to type '{ name: string; domain: string; }[] | { name: string; domain: string; }[]'.
- Line 31,5: Type 'unknown' is not assignable to type '{ name: string; domain: string; }[] | { name: string; domain: string; }[]'.

**../../packages/ui/components/EntityCard.vue**

- Line 100,17: Type '"filled"' is not assignable to type '"outline" | "soft" | "subtle" | "solid" | undefined'.
- Line 100,17: Type '"filled"' is not assignable to type '"outline" | "soft" | "subtle" | "solid" | undefined'.

**../../packages/ui/components/JSONRenderer.vue**

- Line 188,8: Type 'unknown' is not assignable to type 'string'.
- Line 192,8: Type 'unknown' is not assignable to type 'Row[]'.
- Line 193,8: Type 'string | undefined' is not assignable to type 'string'.
- Line 203,59: Type '{} | undefined' is not assignable to type 'string'.
- Line 204,59: Type '{} | undefined' is not assignable to type 'number'.
- Line 205,61: Type '{} | undefined' is not assignable to type 'boolean'.
- Line 236,22: Type 'number' is not assignable to type 'string'.
- Line 188,8: Type 'unknown' is not assignable to type 'string'.
- Line 192,8: Type 'unknown' is not assignable to type 'Row[]'.
- Line 193,8: Type 'string | undefined' is not assignable to type 'string'.
- Line 203,59: Type '{} | undefined' is not assignable to type 'string'.
- Line 204,59: Type '{} | undefined' is not assignable to type 'number'.
- Line 205,61: Type '{} | undefined' is not assignable to type 'boolean'.
- Line 236,22: Type 'number' is not assignable to type 'string'.

**../../packages/ui/components/MCPServerCard.vue**

- Line 120,13: Type '"none"' is not assignable to type '"link" | "outline" | "soft" | "subtle" | "ghost" | "solid" | undefined'.
- Line 120,13: Type '"none"' is not assignable to type '"link" | "outline" | "soft" | "subtle" | "ghost" | "solid" | undefined'.

**../../packages/ui/components/MultipageHeaderMusic.vue**

- Line 87,13: Type '"black"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.
- Line 103,11: Type '"gray"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.
- Line 87,13: Type '"black"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.
- Line 103,11: Type '"gray"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.

**../../packages/ui/components/ProfileDropdown.client.vue**

- Line 118,21: Type '"xs"' is not assignable to type '"lg" | "md" | "sm" | undefined'.
- Line 118,21: Type '"xs"' is not assignable to type '"lg" | "md" | "sm" | undefined'.

**../../packages/ui/components/ReviewForm.vue**

- Line 62,15: Type 'string' is not assignable to type 'number'.
- Line 62,15: Type 'string' is not assignable to type 'number'.

**../../packages/ui/components/ReviewModal.vue**

- Line 173,17: Type 'number | null' is not assignable to type 'number | undefined'.
- Line 192,13: Type 'string' is not assignable to type 'number'.
- Line 233,9: Type '"gray"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.
- Line 173,17: Type 'number | null' is not assignable to type 'number | undefined'.
- Line 192,13: Type 'string' is not assignable to type 'number'.
- Line 233,9: Type '"gray"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.

**../../packages/ui/components/SPage/Album/Collection.vue**

- Line 16,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.
- Line 21,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.
- Line 16,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.
- Line 21,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.

**../../packages/ui/components/SPage/Artist/Collection.vue**

- Line 15,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.
- Line 20,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.
- Line 15,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.
- Line 20,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.

**../../packages/ui/components/SPage/Artist/Single.vue**

- Line 127,47: Type '"gray"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.
- Line 127,47: Type '"gray"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.

**../../packages/ui/components/SPage/Generic/Single.vue**

- Line 126,12: Type 'boolean | undefined' is not assignable to type 'number | null'.
- Line 127,12: Type 'number | undefined' is not assignable to type 'number'.
- Line 128,12: Type 'number | undefined' is not assignable to type 'number'.
- Line 194,8: Type 'number' is not assignable to type 'string'.
- Line 126,12: Type 'boolean | undefined' is not assignable to type 'number | null'.
- Line 127,12: Type 'number | undefined' is not assignable to type 'number'.
- Line 128,12: Type 'number | undefined' is not assignable to type 'number'.
- Line 194,8: Type 'number' is not assignable to type 'string'.

**../../packages/ui/components/SPage/Song/Collection.vue**

- Line 16,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.
- Line 21,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.
- Line 16,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.
- Line 21,9: Type 'number' is not assignable to type 'LocationQueryValue | LocationQueryValue[]'.

**../../packages/ui/components/SPage/Song/Single.vue**

- Line 255,54: Type '"gray"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.
- Line 255,54: Type '"gray"' is not assignable to type '"warning" | "error" | "primary" | "secondary" | "success" | "info" | "neutral" | undefined'.

**../../packages/ui/components/SPage/Users/Featured/Companies.vue**

- Line 16,5: Type 'unknown' is not assignable to type 'any[]'.
- Line 115,11: Type '{}' is not assignable to type 'string'.
- Line 250,19: Type 'string' is not assignable to type 'undefined'.
- Line 16,5: Type 'unknown' is not assignable to type 'any[]'.
- Line 115,11: Type '{}' is not assignable to type 'string'.
- Line 250,19: Type 'string' is not assignable to type 'undefined'.

**../../packages/ui/components/SPage/Users/Submit/Company.vue**

- Line 308,11: Type 'FetchError<any>' is not assignable to type 'StringOrVNode | undefined'.
- Line 367,12: Type '{ id: null; name: string; domain: string; pricing: string; tags: string; oneLiner: string; description: string; categories: never[]; logo: string; }' is not assignable to type 'Partial<{ name: string; domain: string; description: string; oneLiner: string; pricing: string[]; categories?: string[] | undefined; tags?: string | null | undefined; logo?: string | null | undefined; }>'.
- Line 390,15: Type 'string' is not assignable to type 'number'.
- Line 398,15: Type 'string' is not assignable to type 'string[]'.
- Line 308,11: Type 'FetchError<any>' is not assignable to type 'StringOrVNode | undefined'.
- Line 367,12: Type '{ id: null; name: string; domain: string; pricing: string; tags: string; oneLiner: string; description: string; categories: never[]; logo: string; }' is not assignable to type 'Partial<{ name: string; domain: string; description: string; oneLiner: string; pricing: string[]; categories?: string[] | undefined; tags?: string | null | undefined; logo?: string | null | undefined; }>'.
- Line 390,15: Type 'string' is not assignable to type 'number'.
- Line 398,15: Type 'string' is not assignable to type 'string[]'.

**../../packages/ui/components/ServiceProviderCard.vue**

- Line 118,17: Type '"filled"' is not assignable to type '"outline" | "soft" | "subtle" | "solid" | undefined'.
- Line 118,17: Type '"filled"' is not assignable to type '"outline" | "soft" | "subtle" | "solid" | undefined'.

**../../packages/ui/components/StripeCard.vue**

- Line 59,7: Type 'StripeElements' is not assignable to type 'null'.
- Line 59,7: Type 'StripeElements' is not assignable to type 'null'.

---

### TS7006: Parameter implicitly has any type (80 errors)

**../../packages/api/composables/useCheckPlacementAvailability.ts**

- Line 2,3: Parameter 'placement' implicitly has an 'any' type.
- Line 3,3: Parameter 'id' implicitly has an 'any' type.
- Line 2,3: Parameter 'placement' implicitly has an 'any' type.
- Line 3,3: Parameter 'id' implicitly has an 'any' type.

**../../packages/api/server/api/comments/[id].get.ts**

- Line 69,27: Parameter 'comments' implicitly has an 'any' type.
- Line 72,25: Parameter 'comment' implicitly has an 'any' type.
- Line 78,25: Parameter 'comment' implicitly has an 'any' type.
- Line 69,27: Parameter 'comments' implicitly has an 'any' type.
- Line 72,25: Parameter 'comment' implicitly has an 'any' type.
- Line 78,25: Parameter 'comment' implicitly has an 'any' type.

**../../packages/api/server/api/entities/all-for-category.ts**

- Line 21,11: Parameter 'mod' implicitly has an 'any' type.
- Line 26,28: Parameter 'mod' implicitly has an 'any' type.
- Line 21,11: Parameter 'mod' implicitly has an 'any' type.
- Line 26,28: Parameter 'mod' implicitly has an 'any' type.

**../../packages/api/server/api/entities/index.ts**

- Line 76,44: Parameter 'e' implicitly has an 'any' type.
- Line 191,13: Parameter 'm' implicitly has an 'any' type.
- Line 196,30: Parameter 'm' implicitly has an 'any' type.
- Line 76,44: Parameter 'e' implicitly has an 'any' type.
- Line 191,13: Parameter 'm' implicitly has an 'any' type.
- Line 196,30: Parameter 'm' implicitly has an 'any' type.

**../../packages/api/server/api/entities/search.ts**

- Line 48,13: Parameter 'mod' implicitly has an 'any' type.
- Line 79,30: Parameter 'mod' implicitly has an 'any' type.
- Line 48,13: Parameter 'mod' implicitly has an 'any' type.
- Line 79,30: Parameter 'mod' implicitly has an 'any' type.

**../../packages/api/server/api/entities/verified.ts**

- Line 15,13: Parameter 'mod' implicitly has an 'any' type.
- Line 21,30: Parameter 'mod' implicitly has an 'any' type.
- Line 15,13: Parameter 'mod' implicitly has an 'any' type.
- Line 21,30: Parameter 'mod' implicitly has an 'any' type.

**../../packages/api/server/api/entity/[slug].ts**

- Line 147,13: Parameter 'mod' implicitly has an 'any' type.
- Line 152,30: Parameter 'mod' implicitly has an 'any' type.
- Line 147,13: Parameter 'mod' implicitly has an 'any' type.
- Line 152,30: Parameter 'mod' implicitly has an 'any' type.

**../../packages/api/server/api/entity/claims.get.ts**

- Line 15,13: Parameter 'mod' implicitly has an 'any' type.
- Line 20,30: Parameter 'mod' implicitly has an 'any' type.
- Line 15,13: Parameter 'mod' implicitly has an 'any' type.
- Line 20,30: Parameter 'mod' implicitly has an 'any' type.

**../../packages/api/server/api/entity/featured-subscriptions.get.ts**

- Line 19,13: Parameter 'mod' implicitly has an 'any' type.
- Line 44,34: Parameter 'mod' implicitly has an 'any' type.
- Line 19,13: Parameter 'mod' implicitly has an 'any' type.
- Line 44,34: Parameter 'mod' implicitly has an 'any' type.

**../../packages/api/server/api/svg/badge.ts**

- Line 48,6: Parameter 'cat' implicitly has an 'any' type.
- Line 48,6: Parameter 'cat' implicitly has an 'any' type.

**../../packages/auth/server/utils/oauth.ts**

- Line 21,42: Parameter 'event' implicitly has an 'any' type.
- Line 21,42: Parameter 'event' implicitly has an 'any' type.

**../../packages/ui/components/CommentWrapper.vue**

- Line 38,21: Parameter 'id' implicitly has an 'any' type.
- Line 321,24: Parameter 'index' implicitly has an 'any' type.
- Line 334,19: Parameter 'event' implicitly has an 'any' type.
- Line 38,21: Parameter 'id' implicitly has an 'any' type.
- Line 321,24: Parameter 'index' implicitly has an 'any' type.
- Line 334,19: Parameter 'event' implicitly has an 'any' type.

**../../packages/ui/components/CommentsContainer.vue**

- Line 48,19: Parameter 'event' implicitly has an 'any' type.
- Line 58,27: Parameter 'event' implicitly has an 'any' type.
- Line 65,23: Parameter 'event' implicitly has an 'any' type.
- Line 90,21: Parameter 'id' implicitly has an 'any' type.
- Line 172,26: Parameter 'index' implicitly has an 'any' type.
- Line 48,19: Parameter 'event' implicitly has an 'any' type.
- Line 58,27: Parameter 'event' implicitly has an 'any' type.
- Line 65,23: Parameter 'event' implicitly has an 'any' type.
- Line 90,21: Parameter 'id' implicitly has an 'any' type.
- Line 172,26: Parameter 'index' implicitly has an 'any' type.

**../../packages/ui/components/Embeds/SPage/SerpShieldBadgeCustomizer.vue**

- Line 23,29: Parameter 'updatedData' implicitly has an 'any' type.
- Line 23,29: Parameter 'updatedData' implicitly has an 'any' type.

**../../packages/ui/components/SHeader.vue**

- Line 14,45: Parameter 'item' implicitly has an 'any' type.
- Line 29,37: Parameter 'item' implicitly has an 'any' type.
- Line 14,45: Parameter 'item' implicitly has an 'any' type.
- Line 29,37: Parameter 'item' implicitly has an 'any' type.

**../../packages/ui/components/SPage/Company/CategoryCollection.vue**

- Line 19,38: Parameter 'faq' implicitly has an 'any' type.
- Line 19,38: Parameter 'faq' implicitly has an 'any' type.

**../../packages/ui/components/SPage/Generic/Collection.vue**

- Line 60,38: Parameter 'faq' implicitly has an 'any' type.
- Line 60,38: Parameter 'faq' implicitly has an 'any' type.

**../../packages/ui/components/SPage/MCP/Server/Collection.vue**

- Line 62,38: Parameter 'faq' implicitly has an 'any' type.
- Line 62,38: Parameter 'faq' implicitly has an 'any' type.

**../../packages/ui/components/SPage/ServiceProvider/CategoryCollection.vue**

- Line 19,38: Parameter 'faq' implicitly has an 'any' type.
- Line 19,38: Parameter 'faq' implicitly has an 'any' type.

**../../packages/ui/components/SPage/Users/Featured/Companies.vue**

- Line 40,12: Parameter 'company' implicitly has an 'any' type.
- Line 40,12: Parameter 'company' implicitly has an 'any' type.

**../../packages/ui/components/SPage/Users/Submit/Company.vue**

- Line 69,14: Parameter 'category' implicitly has an 'any' type.
- Line 94,30: Parameter 'value' implicitly has an 'any' type.
- Line 69,14: Parameter 'category' implicitly has an 'any' type.
- Line 94,30: Parameter 'value' implicitly has an 'any' type.

---

### TS2769: No overload matches this call (79 errors)

**../../packages/api/server/api/categories.ts**

- Line 18,12: No overload matches this call.
- Line 18,12: No overload matches this call.

**../../packages/api/server/api/comments/[id].post.ts**

- Line 34,15: No overload matches this call.
- Line 34,15: No overload matches this call.

**../../packages/api/server/api/comments/[id].put.ts**

- Line 37,11: No overload matches this call.
- Line 37,11: No overload matches this call.

**../../packages/api/server/api/entities/all-for-category.ts**

- Line 50,22: No overload matches this call.
- Line 50,22: No overload matches this call.

**../../packages/api/server/api/entities/index.ts**

- Line 238,18: No overload matches this call.
- Line 238,51: No overload matches this call.
- Line 238,18: No overload matches this call.
- Line 238,51: No overload matches this call.

**../../packages/api/server/api/entity/check-if-valid-feature-placement.ts**

- Line 29,12: No overload matches this call.
- Line 58,9: No overload matches this call.
- Line 59,24: No overload matches this call.
- Line 78,24: No overload matches this call.
- Line 29,12: No overload matches this call.
- Line 58,9: No overload matches this call.
- Line 59,24: No overload matches this call.
- Line 78,24: No overload matches this call.

**../../packages/api/server/api/entity/claim/[id].post.ts**

- Line 22,14: No overload matches this call.
- Line 36,14: No overload matches this call.
- Line 73,15: No overload matches this call.
- Line 22,14: No overload matches this call.
- Line 36,14: No overload matches this call.
- Line 73,15: No overload matches this call.

**../../packages/api/server/api/entity/flag-review.delete.ts**

- Line 24,18: No overload matches this call.
- Line 24,18: No overload matches this call.

**../../packages/api/server/api/entity/flag-review.post.ts**

- Line 27,18: No overload matches this call.
- Line 27,18: No overload matches this call.

**../../packages/api/server/api/entity/reserve-featured-spot.ts**

- Line 26,28: No overload matches this call.
- Line 64,13: No overload matches this call.
- Line 26,28: No overload matches this call.
- Line 64,13: No overload matches this call.

**../../packages/api/server/api/entity/submit-verify-backlink.post.ts**

- Line 26,9: No overload matches this call.
- Line 27,9: No overload matches this call.
- Line 88,14: No overload matches this call.
- Line 26,9: No overload matches this call.
- Line 27,9: No overload matches this call.
- Line 88,14: No overload matches this call.

**../../packages/api/server/api/entity/submit.get.ts**

- Line 28,49: No overload matches this call.
- Line 51,13: No overload matches this call.
- Line 52,13: No overload matches this call.
- Line 28,49: No overload matches this call.
- Line 51,13: No overload matches this call.
- Line 52,13: No overload matches this call.

**../../packages/api/server/api/entity/submit.post.ts**

- Line 36,13: No overload matches this call.
- Line 61,52: No overload matches this call.
- Line 79,11: No overload matches this call.
- Line 104,13: No overload matches this call.
- Line 141,10: No overload matches this call.
- Line 36,13: No overload matches this call.
- Line 61,52: No overload matches this call.
- Line 79,11: No overload matches this call.
- Line 104,13: No overload matches this call.
- Line 141,10: No overload matches this call.

**../../packages/api/server/api/reviews/[id].delete.ts**

- Line 20,18: No overload matches this call.
- Line 20,18: No overload matches this call.

**../../packages/api/server/api/reviews/[id].get.ts**

- Line 42,13: No overload matches this call.
- Line 52,14: No overload matches this call.
- Line 62,20: No overload matches this call.
- Line 42,13: No overload matches this call.
- Line 52,14: No overload matches this call.
- Line 62,20: No overload matches this call.

**../../packages/api/server/api/reviews/[id].post.ts**

- Line 35,18: No overload matches this call.
- Line 49,8: No overload matches this call.
- Line 35,18: No overload matches this call.
- Line 49,8: No overload matches this call.

**../../packages/api/server/api/reviews/[id].put.ts**

- Line 37,18: No overload matches this call.
- Line 37,18: No overload matches this call.

**../../packages/api/server/api/topics.ts**

- Line 15,52: No overload matches this call.
- Line 15,52: No overload matches this call.

**../../packages/auth/server/utils/oauth.ts**

- Line 33,17: No overload matches this call.
- Line 43,18: No overload matches this call.
- Line 33,17: No overload matches this call.
- Line 43,18: No overload matches this call.

**server/routes/sitemap_index.xml.ts**

- Line 11,37: No overload matches this call.
- Line 16,39: No overload matches this call.
- Line 21,38: No overload matches this call.

---

### TS2345: Argument type mismatch (66 errors)

**../../packages/api/server/api/comments/[id].get.ts**

- Line 12,30: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 13,34: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 12,30: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 13,34: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.

**../../packages/api/server/api/contact.post.ts**

- Line 15,16: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 18,16: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 21,21: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 24,16: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 27,16: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 15,16: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 18,16: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 21,21: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 24,16: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 27,16: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.

**../../packages/api/server/api/entities/index.ts**

- Line 121,40: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 121,40: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.

**../../packages/api/server/api/entities/search.ts**

- Line 61,40: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 61,40: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.

**../../packages/api/server/api/entity/[slug].ts**

- Line 18,37: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 88,40: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 18,37: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
- Line 88,40: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.

**../../packages/api/server/api/reviews/[id].get.ts**

- Line 17,30: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 18,34: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 42,36: Argument of type 'true | SQL<unknown>' is not assignable to parameter of type 'SQLWrapper | undefined'.
- Line 17,30: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 18,34: Argument of type 'string | number | boolean | Record<string, any> | QueryValue[] | null' is not assignable to parameter of type 'string'.
- Line 42,36: Argument of type 'true | SQL<unknown>' is not assignable to parameter of type 'SQLWrapper | undefined'.

**../../packages/auth/server/api/auth/github.ts**

- Line 22,53: Argument of type 'GitHubUser' is not assignable to parameter of type 'GitHubOAuthUser'.
- Line 22,53: Argument of type 'GitHubUser' is not assignable to parameter of type 'GitHubOAuthUser'.

**../../packages/ui/components/CommentWrapper.vue**

- Line 399,33: Argument of type '{ id: any; user_id: any; name: any; image: any; content: string; created_at: string; updated_at: string; replies: never[]; }' is not assignable to parameter of type 'never'.
- Line 399,33: Argument of type '{ id: any; user_id: any; name: any; image: any; content: string; created_at: string; updated_at: string; replies: never[]; }' is not assignable to parameter of type 'never'.

**../../packages/ui/components/JSONRenderer.vue**

- Line 224,43: Argument of type 'number' is not assignable to parameter of type 'string'.
- Line 231,32: Argument of type 'number' is not assignable to parameter of type 'string'.
- Line 224,43: Argument of type 'number' is not assignable to parameter of type 'string'.
- Line 231,32: Argument of type 'number' is not assignable to parameter of type 'string'.

**../../packages/ui/components/SPage/Album/Single.vue**

- Line 17,51: Argument of type 'string | string[]' is not assignable to parameter of type 'string | number | boolean'.
- Line 17,51: Argument of type 'string | string[]' is not assignable to parameter of type 'string | number | boolean'.

**../../packages/ui/components/SPage/Artist/Single.vue**

- Line 14,53: Argument of type 'string | string[]' is not assignable to parameter of type 'string | number | boolean'.
- Line 14,53: Argument of type 'string | string[]' is not assignable to parameter of type 'string | number | boolean'.

**../../packages/ui/components/SPage/Company/Single.vue**

- Line 474,8: Argument of type '{ open: boolean; companyId: any; result: { reviews: Reviews; }; onReviewSubmitted: any; onClose: any; }' is not assignable to parameter of type '{ readonly entityId: string; readonly open: boolean; readonly result: Reviews; readonly onClose?: ((...args: any[]) => any) | undefined; readonly "onUpdate:open"?: ((...args: any[]) => any) | undefined; readonly "onReview-submitted"?: ((...args: any[]) => any) | undefined; } & VNodeProps & AllowedComponentProps & Co...'.
- Line 474,8: Argument of type '{ open: boolean; companyId: any; result: { reviews: Reviews; }; onReviewSubmitted: any; onClose: any; }' is not assignable to parameter of type '{ readonly entityId: string; readonly open: boolean; readonly result: Reviews; readonly onClose?: ((...args: any[]) => any) | undefined; readonly "onUpdate:open"?: ((...args: any[]) => any) | undefined; readonly "onReview-submitted"?: ((...args: any[]) => any) | undefined; } & VNodeProps & AllowedComponentProps & Co...'.

**../../packages/ui/components/SPage/Generic/Collection.vue**

- Line 89,8: Argument of type '{ key: number; entity: Entity; baseSlug: string; categoryBaseSlug: string; }' is not assignable to parameter of type 'Partial<{}> & Omit<{ readonly entity: Company; readonly baseSlug: string; readonly baseCategorySlug: string; } & VNodeProps & AllowedComponentProps & ComponentCustomProps, never> & Record<...>'.
- Line 89,8: Argument of type '{ key: number; entity: Entity; baseSlug: string; categoryBaseSlug: string; }' is not assignable to parameter of type 'Partial<{}> & Omit<{ readonly entity: Company; readonly baseSlug: string; readonly baseCategorySlug: string; } & VNodeProps & AllowedComponentProps & ComponentCustomProps, never> & Record<...>'.

**../../packages/ui/components/SPage/Login.vue**

- Line 6,16: Argument of type 'string | LocationQueryValue[]' is not assignable to parameter of type 'string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | null | undefined'.
- Line 6,16: Argument of type 'string | LocationQueryValue[]' is not assignable to parameter of type 'string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | null | undefined'.

**../../packages/ui/components/SPage/Post/Collection.vue**

- Line 74,8: Argument of type '{ page: number; total: any; itemsPerPage: number; siblingCount: number; }' is not assignable to parameter of type '{ readonly totalItems: number; readonly limit: number; readonly siblingCount: number; readonly modelValue?: number | undefined; readonly "onUpdate:modelValue"?: ((value: number | undefined) => any) | undefined; } & VNodeProps & AllowedComponentProps & ComponentCustomProps & Record<...>'.
- Line 74,8: Argument of type '{ page: number; total: any; itemsPerPage: number; siblingCount: number; }' is not assignable to parameter of type '{ readonly totalItems: number; readonly limit: number; readonly siblingCount: number; readonly modelValue?: number | undefined; readonly "onUpdate:modelValue"?: ((value: number | undefined) => any) | undefined; } & VNodeProps & AllowedComponentProps & ComponentCustomProps & Record<...>'.

**../../packages/ui/components/SPage/Post/CollectionKeywordAsTitle.vue**

- Line 74,8: Argument of type '{ page: number; total: any; itemsPerPage: number; siblingCount: number; }' is not assignable to parameter of type '{ readonly totalItems: number; readonly limit: number; readonly siblingCount: number; readonly modelValue?: number | undefined; readonly "onUpdate:modelValue"?: ((value: number | undefined) => any) | undefined; } & VNodeProps & AllowedComponentProps & ComponentCustomProps & Record<...>'.
- Line 74,8: Argument of type '{ page: number; total: any; itemsPerPage: number; siblingCount: number; }' is not assignable to parameter of type '{ readonly totalItems: number; readonly limit: number; readonly siblingCount: number; readonly modelValue?: number | undefined; readonly "onUpdate:modelValue"?: ((value: number | undefined) => any) | undefined; } & VNodeProps & AllowedComponentProps & ComponentCustomProps & Record<...>'.

**../../packages/ui/components/SPage/ServiceProvider/Single.vue**

- Line 503,12: Argument of type '{ serviceProvider: any; }' is not assignable to parameter of type '{ readonly company: any; } & VNodeProps & AllowedComponentProps & ComponentCustomProps & Record<string, unknown>'.
- Line 728,8: Argument of type '{ open: boolean; serviceProviderId: any; result: { reviews: Reviews; }; onReviewSubmitted: any; onClose: any; }' is not assignable to parameter of type '{ readonly entityId: string; readonly open: boolean; readonly result: Reviews; readonly onClose?: ((...args: any[]) => any) | undefined; readonly "onUpdate:open"?: ((...args: any[]) => any) | undefined; readonly "onReview-submitted"?: ((...args: any[]) => any) | undefined; } & VNodeProps & AllowedComponentProps & Co...'.
- Line 503,12: Argument of type '{ serviceProvider: any; }' is not assignable to parameter of type '{ readonly company: any; } & VNodeProps & AllowedComponentProps & ComponentCustomProps & Record<string, unknown>'.
- Line 728,8: Argument of type '{ open: boolean; serviceProviderId: any; result: { reviews: Reviews; }; onReviewSubmitted: any; onClose: any; }' is not assignable to parameter of type '{ readonly entityId: string; readonly open: boolean; readonly result: Reviews; readonly onClose?: ((...args: any[]) => any) | undefined; readonly "onUpdate:open"?: ((...args: any[]) => any) | undefined; readonly "onReview-submitted"?: ((...args: any[]) => any) | undefined; } & VNodeProps & AllowedComponentProps & Co...'.

**../../packages/ui/components/SPage/Song/Single.vue**

- Line 16,49: Argument of type 'string | string[]' is not assignable to parameter of type 'string | number | boolean'.
- Line 16,49: Argument of type 'string | string[]' is not assignable to parameter of type 'string | number | boolean'.

**../../packages/ui/components/SPage/Users/Billing.vue**

- Line 18,21: Argument of type '{}' is not assignable to parameter of type 'string | URL | undefined'.
- Line 18,21: Argument of type '{}' is not assignable to parameter of type 'string | URL | undefined'.

**../../packages/ui/components/SPage/Users/Featured/Companies.vue**

- Line 97,9: Argument of type 'string | null' is not assignable to parameter of type 'string | undefined'.
- Line 97,9: Argument of type 'string | null' is not assignable to parameter of type 'string | undefined'.

**../../packages/ui/components/SPage/Users/Submit/Company.vue**

- Line 52,56: Argument of type 'string | LocationQueryValue[]' is not assignable to parameter of type 'string | undefined'.
- Line 356,60: Argument of type 'LocationQueryValue | LocationQueryValue[]' is not assignable to parameter of type 'string'.
- Line 52,56: Argument of type 'string | LocationQueryValue[]' is not assignable to parameter of type 'string | undefined'.
- Line 356,60: Argument of type 'LocationQueryValue | LocationQueryValue[]' is not assignable to parameter of type 'string'.

**../../packages/ui/components/ServiceProviderCard.vue**

- Line 201,16: Argument of type '{ id: any; module: string; bookmarked: any; }' is not assignable to parameter of type '{ readonly id: string | number; readonly module: string; readonly bookmarks: string[] | []; } & VNodeProps & AllowedComponentProps & ComponentCustomProps & Record<...>'.
- Line 201,16: Argument of type '{ id: any; module: string; bookmarked: any; }' is not assignable to parameter of type '{ readonly id: string | number; readonly module: string; readonly bookmarks: string[] | []; } & VNodeProps & AllowedComponentProps & ComponentCustomProps & Record<...>'.

---

### TS2578: Unknown error type (44 errors)

**../../packages/ui/components/ProfileDropdown.client.vue**

- Line 2,3: Unused '@ts-expect-error' directive.
- Line 2,3: Unused '@ts-expect-error' directive.

**../../packages/ui/components/SBreadcrumb.vue**

- Line 36,5: Unused '@ts-expect-error' directive.
- Line 36,5: Unused '@ts-expect-error' directive.

**../../packages/ui/components/SPage/Company/Collection.vue**

- Line 8,3: Unused '@ts-expect-error' directive.
- Line 11,3: Unused '@ts-expect-error' directive.
- Line 30,5: Unused '@ts-expect-error' directive.
- Line 8,3: Unused '@ts-expect-error' directive.
- Line 11,3: Unused '@ts-expect-error' directive.
- Line 30,5: Unused '@ts-expect-error' directive.

**../../packages/ui/components/SPage/Generic/Collection.vue**

- Line 22,3: Unused '@ts-expect-error' directive.
- Line 46,5: Unused '@ts-expect-error' directive.
- Line 22,3: Unused '@ts-expect-error' directive.
- Line 46,5: Unused '@ts-expect-error' directive.

**../../packages/ui/components/SPage/Generic/ServiceProvider.vue**

- Line 34,3: Unused '@ts-expect-error' directive.
- Line 39,3: Unused '@ts-expect-error' directive.
- Line 48,5: Unused '@ts-expect-error' directive.
- Line 34,3: Unused '@ts-expect-error' directive.
- Line 39,3: Unused '@ts-expect-error' directive.
- Line 48,5: Unused '@ts-expect-error' directive.

**../../packages/ui/components/SPage/Generic/Single.vue**

- Line 50,3: Unused '@ts-expect-error' directive.
- Line 59,5: Unused '@ts-expect-error' directive.
- Line 50,3: Unused '@ts-expect-error' directive.
- Line 59,5: Unused '@ts-expect-error' directive.

**../../packages/ui/components/SPage/MCP/Server/Collection.vue**

- Line 27,3: Unused '@ts-expect-error' directive.
- Line 53,5: Unused '@ts-expect-error' directive.
- Line 27,3: Unused '@ts-expect-error' directive.
- Line 53,5: Unused '@ts-expect-error' directive.

**../../packages/ui/components/SPage/MCP/Server/Single.vue**

- Line 8,3: Unused '@ts-expect-error' directive.
- Line 16,3: Unused '@ts-expect-error' directive.
- Line 8,3: Unused '@ts-expect-error' directive.
- Line 16,3: Unused '@ts-expect-error' directive.

**../../packages/ui/components/SPage/ServiceProvider/Collection.vue**

- Line 10,3: Unused '@ts-expect-error' directive.
- Line 13,3: Unused '@ts-expect-error' directive.
- Line 32,5: Unused '@ts-expect-error' directive.
- Line 10,3: Unused '@ts-expect-error' directive.
- Line 13,3: Unused '@ts-expect-error' directive.
- Line 32,5: Unused '@ts-expect-error' directive.

**../../packages/ui/components/SPage/ServiceProvider/Single.vue**

- Line 32,3: Unused '@ts-expect-error' directive.
- Line 37,3: Unused '@ts-expect-error' directive.
- Line 46,5: Unused '@ts-expect-error' directive.
- Line 32,3: Unused '@ts-expect-error' directive.
- Line 37,3: Unused '@ts-expect-error' directive.
- Line 46,5: Unused '@ts-expect-error' directive.

---

### TS2304: Cannot find name/type (28 errors)

**../../packages/api/composables/useAlbums.ts**

- Line 4,40: Cannot find name 'Entities'.
- Line 4,40: Cannot find name 'Entities'.

**../../packages/api/composables/useArtists.ts**

- Line 4,40: Cannot find name 'Entities'.
- Line 4,40: Cannot find name 'Entities'.

**../../packages/api/composables/useSongs.ts**

- Line 4,40: Cannot find name 'Entities'.
- Line 4,40: Cannot find name 'Entities'.

**../../packages/api/server/api/**sitemap**/[module]/categories.ts**

- Line 20,14: Cannot find name 'eq'.
- Line 33,12: Cannot find name 'eq'.
- Line 20,14: Cannot find name 'eq'.
- Line 33,12: Cannot find name 'eq'.

**../../packages/api/server/api/**sitemap**/[module]/index.ts**

- Line 20,14: Cannot find name 'eq'.
- Line 33,12: Cannot find name 'eq'.
- Line 20,14: Cannot find name 'eq'.
- Line 33,12: Cannot find name 'eq'.

**../../packages/api/server/api/**sitemap**/[module]/topics.ts**

- Line 20,14: Cannot find name 'eq'.
- Line 33,12: Cannot find name 'eq'.
- Line 20,14: Cannot find name 'eq'.
- Line 33,12: Cannot find name 'eq'.

**../../packages/api/server/api/entity/claims.get.ts**

- Line 21,11: Cannot find name 'sql'.
- Line 21,11: Cannot find name 'sql'.

**../../packages/ui/components/CommentsContainer.vue**

- Line 168,7: Cannot find name 'setAlert'.
- Line 168,7: Cannot find name 'setAlert'.

**../../packages/ui/components/EntityCard.vue**

- Line 6,32: Cannot find name 'Company'.
- Line 6,32: Cannot find name 'Company'.

**../../packages/ui/components/SBreadcrumb.vue**

- Line 39,17: Cannot find name 'BreadcrumbItem'.
- Line 39,17: Cannot find name 'BreadcrumbItem'.

**../../packages/ui/components/SPage/Users/Submit/Company.vue**

- Line 122,14: Cannot find name 'useS3Object'.
- Line 122,14: Cannot find name 'useS3Object'.

---

### TS18047: Value is possibly null (24 errors)

**../../packages/api/server/api/entities/all-for-category.ts**

- Line 19,19: 'module' is possibly 'null'.
- Line 19,19: 'module' is possibly 'null'.

**../../packages/api/server/api/entities/index.ts**

- Line 189,21: 'module' is possibly 'null'.
- Line 189,21: 'module' is possibly 'null'.

**../../packages/api/server/api/entities/verified.ts**

- Line 13,21: 'module' is possibly 'null'.
- Line 13,21: 'module' is possibly 'null'.

**../../packages/api/server/api/entity/[slug].ts**

- Line 145,21: 'module' is possibly 'null'.
- Line 145,21: 'module' is possibly 'null'.

**../../packages/api/server/api/entity/featured-subscriptions.get.ts**

- Line 17,21: 'module' is possibly 'null'.
- Line 17,21: 'module' is possibly 'null'.

**../../packages/ui/components/BookmarkButton.vue**

- Line 47,36: 'user.value' is possibly 'null'.
- Line 47,36: 'user.value' is possibly 'null'.

**../../packages/ui/components/CommentsContainer.vue**

- Line 67,11: 'document.activeElement' is possibly 'null'.
- Line 67,11: 'document.activeElement' is possibly 'null'.

**../../packages/ui/components/StripeCard.vue**

- Line 66,31: 'elements.value' is possibly 'null'.
- Line 67,7: 'linkAuthElement.value' is possibly 'null'.
- Line 69,30: 'elements.value' is possibly 'null'.
- Line 70,7: 'paymentElement.value' is possibly 'null'.
- Line 66,31: 'elements.value' is possibly 'null'.
- Line 67,7: 'linkAuthElement.value' is possibly 'null'.
- Line 69,30: 'elements.value' is possibly 'null'.
- Line 70,7: 'paymentElement.value' is possibly 'null'.

**../../packages/ui/components/UpvoteButton.vue**

- Line 47,36: 'user.value' is possibly 'null'.
- Line 47,36: 'user.value' is possibly 'null'.

---

### TS7053: Element implicitly has any type (no index signature) (18 errors)

**../../packages/api/server/api/comments/[id].get.ts**

- Line 74,9: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.
- Line 81,15: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.
- Line 82,13: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.
- Line 74,9: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.
- Line 81,15: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.
- Line 82,13: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.

**../../packages/ui/components/JSONRenderer.vue**

- Line 72,9: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ basicInfo: string; }'.
- Line 73,14: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ basicInfo: string; }'.
- Line 72,9: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ basicInfo: string; }'.
- Line 73,14: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ basicInfo: string; }'.

**../../packages/ui/components/ReviewDistributionCard.vue**

- Line 124,28: Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ 1: number; 2: number; 3: number; 4: number; 5: number; }'.
- Line 131,45: Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ 1: number; 2: number; 3: number; 4: number; 5: number; }'.
- Line 124,28: Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ 1: number; 2: number; 3: number; 4: number; 5: number; }'.
- Line 131,45: Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ 1: number; 2: number; 3: number; 4: number; 5: number; }'.

**../../packages/ui/components/SPage/Users/Submit/Company.vue**

- Line 102,18: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ id: null; name: string; domain: string; pricing: string; tags: string; oneLiner: string; description: string; categories: never[]; logo: string; }'.
- Line 102,58: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ id: null; name: string; domain: string; pricing: string; tags: string; oneLiner: string; description: string; categories: never[]; logo: string; }'.
- Line 102,18: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ id: null; name: string; domain: string; pricing: string; tags: string; oneLiner: string; description: string; categories: never[]; logo: string; }'.
- Line 102,58: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ id: null; name: string; domain: string; pricing: string; tags: string; oneLiner: string; description: string; categories: never[]; logo: string; }'.

---

### TS6307: Unknown error type (12 errors)

**../../packages/auth/server/api/auth/github.ts**

- Line 1,36: File '/Users/devin/repos/projects/serp-monorepo/packages/auth/server/utils/oauth.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/daft-fm/tsconfig.json'. Projects must list all files or use an 'include' pattern.
- Line 1,36: File '/Users/devin/repos/projects/serp-monorepo/packages/auth/server/utils/oauth.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/boxingundefeated-com/tsconfig.json'. Projects must list all files or use an 'include' pattern.

**../../packages/mail/server/index.ts**

- Line 2,27: File '/Users/devin/repos/projects/serp-monorepo/packages/mail/server/utils/mail.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/daft-fm/tsconfig.json'. Projects must list all files or use an 'include' pattern.
- Line 2,27: File '/Users/devin/repos/projects/serp-monorepo/packages/mail/server/utils/mail.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/boxingundefeated-com/tsconfig.json'. Projects must list all files or use an 'include' pattern.

**../../packages/mail/server/utils/mail.ts**

- Line 2,34: File '/Users/devin/repos/projects/serp-monorepo/packages/mail/server/utils/providers/mailgun.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/daft-fm/tsconfig.json'. Projects must list all files or use an 'include' pattern.
- Line 2,34: File '/Users/devin/repos/projects/serp-monorepo/packages/mail/server/utils/providers/mailgun.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/boxingundefeated-com/tsconfig.json'. Projects must list all files or use an 'include' pattern.

**../../packages/notifications/server/index.ts**

- Line 2,34: File '/Users/devin/repos/projects/serp-monorepo/packages/notifications/server/utils/notifications.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/daft-fm/tsconfig.json'. Projects must list all files or use an 'include' pattern.
- Line 2,34: File '/Users/devin/repos/projects/serp-monorepo/packages/notifications/server/utils/notifications.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/boxingundefeated-com/tsconfig.json'. Projects must list all files or use an 'include' pattern.

**../../packages/notifications/server/utils/notifications.ts**

- Line 1,47: File '/Users/devin/repos/projects/serp-monorepo/packages/notifications/server/utils/providers/slack.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/daft-fm/tsconfig.json'. Projects must list all files or use an 'include' pattern.
- Line 1,47: File '/Users/devin/repos/projects/serp-monorepo/packages/notifications/server/utils/providers/slack.ts' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/boxingundefeated-com/tsconfig.json'. Projects must list all files or use an 'include' pattern.

**../../packages/tools/utils/combineCsvs.ts**

- Line 1,23: File '/Users/devin/repos/projects/serp-monorepo/packages/tools/utils/vendor/xlsx.full.min.js' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/daft-fm/tsconfig.json'. Projects must list all files or use an 'include' pattern.
- Line 1,23: File '/Users/devin/repos/projects/serp-monorepo/packages/tools/utils/vendor/xlsx.full.min.js' is not listed within the file list of project '/Users/devin/repos/projects/serp-monorepo/apps/boxingundefeated-com/tsconfig.json'. Projects must list all files or use an 'include' pattern.

---

### TS18049: Value is possibly null or undefined (10 errors)

**../../packages/api/server/api/entities/search.ts**

- Line 46,21: 'module' is possibly 'null' or 'undefined'.
- Line 46,21: 'module' is possibly 'null' or 'undefined'.

**../../packages/api/server/api/entity/claims.get.ts**

- Line 13,21: 'module' is possibly 'null' or 'undefined'.
- Line 13,21: 'module' is possibly 'null' or 'undefined'.

**error.vue**

- Line 13,23: '\_\_VLS_ctx.error' is possibly 'null' or 'undefined'.
- Line 18,16: '\_\_VLS_ctx.error' is possibly 'null' or 'undefined'.
- Line 19,15: '\_\_VLS_ctx.error' is possibly 'null' or 'undefined'.
- Line 13,23: '\_\_VLS_ctx.error' is possibly 'null' or 'undefined'.
- Line 18,16: '\_\_VLS_ctx.error' is possibly 'null' or 'undefined'.
- Line 19,15: '\_\_VLS_ctx.error' is possibly 'null' or 'undefined'.

---

### TS2554: Unknown error type (8 errors)

**../../packages/api/server/api/vote.post.ts**

- Line 34,35: Expected 1 arguments, but got 2.
- Line 41,39: Expected 1 arguments, but got 2.
- Line 50,39: Expected 1 arguments, but got 2.
- Line 34,35: Expected 1 arguments, but got 2.
- Line 41,39: Expected 1 arguments, but got 2.
- Line 50,39: Expected 1 arguments, but got 2.

**../../packages/ui/components/ProfileDropdown.client.vue**

- Line 103,25: Expected 2 arguments, but got 1.
- Line 103,25: Expected 2 arguments, but got 1.

---

### TS2307: Cannot find module (8 errors)

**../../packages/types/types/Entity.ts**

- Line 1,50: Cannot find module '@serp/types/types' or its corresponding type declarations.
- Line 1,50: Cannot find module '@serp/types/types' or its corresponding type declarations.

**../../packages/ui/components/ReviewModal.vue**

- Line 2,32: Cannot find module '@/serp/types/types' or its corresponding type declarations.
- Line 2,32: Cannot find module '@/serp/types/types' or its corresponding type declarations.

**../../packages/ui/components/Reviews.vue**

- Line 2,32: Cannot find module '@/serp/types/types' or its corresponding type declarations.
- Line 2,32: Cannot find module '@/serp/types/types' or its corresponding type declarations.

**../../packages/ui/components/TableRenderer.vue**

- Line 3,28: Cannot find module '~/components/JSONRenderer.vue' or its corresponding type declarations.
- Line 3,28: Cannot find module '~/components/JSONRenderer.vue' or its corresponding type declarations.

---

### TS2540: Unknown error type (8 errors)

**../../packages/ui/components/CommentWrapper.vue**

- Line 150,17: Cannot assign to 'value' because it is a read-only property.
- Line 331,11: Cannot assign to 'value' because it is a read-only property.
- Line 410,23: Cannot assign to 'value' because it is a read-only property.
- Line 150,17: Cannot assign to 'value' because it is a read-only property.
- Line 331,11: Cannot assign to 'value' because it is a read-only property.
- Line 410,23: Cannot assign to 'value' because it is a read-only property.

**../../packages/ui/components/CommentsContainer.vue**

- Line 45,11: Cannot assign to 'value' because it is a read-only property.
- Line 45,11: Cannot assign to 'value' because it is a read-only property.

---

### TS2740: Unknown error type (6 errors)

**../../packages/api/server/api/entities/index.ts**

- Line 242,5: Type 'Omit<PgSelectBase<"entity", { count: SQL<number>; }, "partial", Record<"entity", "not-null">, false, "where", { count: number; }[], { count: DrizzleTypeError<"You cannot reference this field without assigning it an alias first - use `.as(<alias>)`">; }>, "where">' is missing the following properties from type 'PgSelectBase<"entity", { count: SQL<number>; }, "partial", Record<"entity", "not-null">, false, never, { count: number; }[], { count: DrizzleTypeError<"You cannot reference this field without assigning it an alias first - use `.as(<alias>)`">; }>': config, joinsNotNullableMap, tableName, isPartialSelect, and 5 more.
- Line 242,5: Type 'Omit<PgSelectBase<"entity", { count: SQL<number>; }, "partial", Record<"entity", "not-null">, false, "where", { count: number; }[], { count: DrizzleTypeError<"You cannot reference this field without assigning it an alias first - use `.as(<alias>)`">; }>, "where">' is missing the following properties from type 'PgSelectBase<"entity", { count: SQL<number>; }, "partial", Record<"entity", "not-null">, false, never, { count: number; }[], { count: DrizzleTypeError<"You cannot reference this field without assigning it an alias first - use `.as(<alias>)`">; }>': config, joinsNotNullableMap, tableName, isPartialSelect, and 5 more.

**../../packages/api/server/api/entity/edit.put.ts**

- Line 72,5: Type 'SQL<unknown>' is missing the following properties from type 'PgColumn<{ name: "reviewed_at"; tableName: "edit"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: false; hasDefault: false; isPrimaryKey: false; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>': table, name, keyAsName, primary, and 17 more.
- Line 72,5: Type 'SQL<unknown>' is missing the following properties from type 'PgColumn<{ name: "reviewed_at"; tableName: "edit"; dataType: "date"; columnType: "PgTimestamp"; data: Date; driverParam: string; notNull: false; hasDefault: false; isPrimaryKey: false; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>': table, name, keyAsName, primary, and 17 more.

**../../packages/api/server/api/entity/reserve-featured-spot.ts**

- Line 46,3: Type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; module: PgColumn<...>; }, ... 5 m...' is missing the following properties from type 'PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; module: PgColumn<...>; }, ... 5 more ....': config, joinsNotNullableMap, tableName, isPartialSelect, and 5 more.
- Line 46,3: Type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; module: PgColumn<...>; }, ... 5 m...' is missing the following properties from type 'PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; module: PgColumn<...>; }, ... 5 more ....': config, joinsNotNullableMap, tableName, isPartialSelect, and 5 more.

---

### TS2352: Unknown error type (6 errors)

**../../packages/api/server/api/entities/index.ts**

- Line 266,33: Conversion of type '{ id: number; name: string; slug: string; data: unknown; categories: unknown; topics: unknown; createdAt: Date; updatedAt: Date; module: string; featured: boolean | null; featuredOrder: number | null; numReviews: number | null; ... 14 more ...; usersCurrentVote: number | null; }' to type 'Entity' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- Line 266,33: Conversion of type '{ id: number; name: string; slug: string; data: unknown; categories: unknown; topics: unknown; createdAt: Date; updatedAt: Date; module: string; featured: boolean | null; featuredOrder: number | null; numReviews: number | null; ... 14 more ...; usersCurrentVote: number | null; }' to type 'Entity' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

**../../packages/api/server/api/entity/[slug].ts**

- Line 172,43: Conversion of type '{ id: number; name: string; slug: string; data: unknown; singleData: unknown; categories: unknown; topics: unknown; createdAt: Date; updatedAt: Date; module: string; numReviews: number | null; numOneStarReviews: number | null; ... 14 more ...; verification: number | null; }' to type 'Entity' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- Line 172,43: Conversion of type '{ id: number; name: string; slug: string; data: unknown; singleData: unknown; categories: unknown; topics: unknown; createdAt: Date; updatedAt: Date; module: string; numReviews: number | null; numOneStarReviews: number | null; ... 14 more ...; verification: number | null; }' to type 'Entity' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

**../../packages/ui/components/SPage/Company/Single.vue**

- Line 21,24: Conversion of type 'Comment[]' to type '{ comments: Comment[]; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- Line 21,24: Conversion of type 'Comment[]' to type '{ comments: Comment[]; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

---

### TS2614: Unknown error type (6 errors)

**../../packages/mail/server/utils/mail.ts**

- Line 1,15: Module '"@serp/types"' has no exported member 'SendEmailOptions'. Did you mean to use 'import SendEmailOptions from "@serp/types"' instead?
- Line 1,15: Module '"@serp/types"' has no exported member 'SendEmailOptions'. Did you mean to use 'import SendEmailOptions from "@serp/types"' instead?

**../../packages/mail/server/utils/providers/mailgun.ts**

- Line 2,15: Module '"mailgun.js"' has no exported member 'Client'. Did you mean to use 'import Client from "mailgun.js"' instead?
- Line 4,15: Module '"@serp/types"' has no exported member 'SendEmailOptions'. Did you mean to use 'import SendEmailOptions from "@serp/types"' instead?
- Line 2,15: Module '"mailgun.js"' has no exported member 'Client'. Did you mean to use 'import Client from "mailgun.js"' instead?
- Line 4,15: Module '"@serp/types"' has no exported member 'SendEmailOptions'. Did you mean to use 'import SendEmailOptions from "@serp/types"' instead?

---

### TS18048: Value is possibly undefined (6 errors)

**../../packages/ui/components/SPage/Users/Submit/Company.vue**

- Line 111,13: 'category\_' is possibly 'undefined'.
- Line 112,15: 'category\_' is possibly 'undefined'.
- Line 113,15: 'category\_' is possibly 'undefined'.
- Line 111,13: 'category\_' is possibly 'undefined'.
- Line 112,15: 'category\_' is possibly 'undefined'.
- Line 113,15: 'category\_' is possibly 'undefined'.

---

### TS2741: Unknown error type (4 errors)

**../../packages/api/server/api/entities/index.ts**

- Line 241,5: Property 'where' is missing in type 'Omit<import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle-orm/pg-core/query-builders/select").PgSelectBase<"entity", { id: import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle...' but required in type 'Omit<import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle-orm/pg-core/query-builders/select").PgSelectBase<"entity", { id: import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle...'.
- Line 241,5: Property 'where' is missing in type 'Omit<import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle-orm/pg-core/query-builders/select").PgSelectBase<"entity", { id: import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle...' but required in type 'Omit<import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle-orm/pg-core/query-builders/select").PgSelectBase<"entity", { id: import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle...'.

**../../packages/ui/components/Embeds/SPage/SerpShieldBadgeCustomizer.vue**

- Line 76,12: Property 'categorySlug' is missing in type '{ categoryName: string; productDomain: string; }' but required in type '{ categorySlug: string; productDomain: string; }'.
- Line 76,12: Property 'categorySlug' is missing in type '{ categoryName: string; productDomain: string; }' but required in type '{ categorySlug: string; productDomain: string; }'.

---

### TS2739: Unknown error type (4 errors)

**../../packages/api/server/api/entities/index.ts**

- Line 244,5: Type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; ... 25 more ...; usersCurrentVote...' is missing the following properties from type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; ... 25 more ...; usersCurrentVote...': orderBy, limit, offset
- Line 244,5: Type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; ... 25 more ...; usersCurrentVote...' is missing the following properties from type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; ... 25 more ...; usersCurrentVote...': orderBy, limit, offset

**../../packages/api/server/api/entity/[slug].ts**

- Line 162,5: Type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; ... 25 more ...; verification: Pg...' is missing the following properties from type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; ... 25 more ...; verification: Pg...': where, limit
- Line 162,5: Type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; ... 25 more ...; verification: Pg...' is missing the following properties from type 'Omit<PgSelectBase<"entity", { id: PgColumn<{ name: "id"; tableName: "entity"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}>; ... 25 more ...; verification: Pg...': where, limit

---

### TS7008: Unknown error type (4 errors)

**../../packages/ui/components/CategoryRenderer.vue**

- Line 2,17: Member 'value' implicitly has an 'any' type.
- Line 2,24: Member 'baseSlug' implicitly has an 'any' type.
- Line 2,17: Member 'value' implicitly has an 'any' type.
- Line 2,24: Member 'baseSlug' implicitly has an 'any' type.

---

### TS2365: Unknown error type (4 errors)

**../../packages/ui/components/CommentWrapper.vue**

- Line 469,36: Operator '<' cannot be applied to types 'string' and 'number'.
- Line 488,36: Operator '<' cannot be applied to types 'string' and 'number'.
- Line 469,36: Operator '<' cannot be applied to types 'string' and 'number'.
- Line 488,36: Operator '<' cannot be applied to types 'string' and 'number'.

---

### TS7034: Variable implicitly has any type (2 errors)

**../../packages/api/server/api/comments/[id].get.ts**

- Line 77,13: Variable 'nested' implicitly has type 'any[]' in some locations where its type cannot be determined.
- Line 77,13: Variable 'nested' implicitly has type 'any[]' in some locations where its type cannot be determined.

---

### TS7005: Variable implicitly has any type (2 errors)

**../../packages/api/server/api/comments/[id].get.ts**

- Line 92,14: Variable 'nested' implicitly has an 'any[]' type.
- Line 92,14: Variable 'nested' implicitly has an 'any[]' type.

---

### TS2367: Unknown error type (2 errors)

**../../packages/api/server/api/entity/edit.put.ts**

- Line 80,9: This comparison appears to be unintentional because the types 'PgColumn<{ name: "status"; tableName: "edit"; dataType: "string"; columnType: "PgVarchar"; data: string; driverParam: string; notNull: true; hasDefault: false; isPrimaryKey: false; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}> | undefined' and 'string' have no overlap.
- Line 80,9: This comparison appears to be unintentional because the types 'PgColumn<{ name: "status"; tableName: "edit"; dataType: "string"; columnType: "PgVarchar"; data: string; driverParam: string; notNull: true; hasDefault: false; isPrimaryKey: false; isAutoincrement: false; ... 4 more ...; generated: undefined; }, {}, {}> | undefined' and 'string' have no overlap.

---

### TS2571: Unknown error type (2 errors)

**../../packages/api/server/api/svg/badge.ts**

- Line 47,24: Object is of type 'unknown'.
- Line 47,24: Object is of type 'unknown'.

---

### TS2531: Unknown error type (2 errors)

**../../packages/ui/components/CommentsContainer.vue**

- Line 178,27: Object is possibly 'null'.
- Line 178,27: Object is possibly 'null'.

---
