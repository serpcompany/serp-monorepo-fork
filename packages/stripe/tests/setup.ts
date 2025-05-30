import { vi } from 'vitest';

// Mock HTTP request handlers
const mockReadBody = vi.fn();
const mockReadRawBody = vi.fn().mockResolvedValue(Buffer.from('{}'));
const mockGetQuery = vi.fn();
const mockGetHeader = vi.fn();
const mockCreateError = vi.fn().mockImplementation((options) => {
  const error = new Error(options.message || options.statusMessage);
  error.statusCode = options.statusCode;
  return error;
});
const mockGetUserSession = vi.fn().mockResolvedValue({
  user: { siteId: 'user-123', id: 'user-123', email: 'test@example.com' }
});

// Make auto-imported functions globally available
globalThis.defineEventHandler = vi.fn((handler) => handler);
globalThis.readBody = mockReadBody;
globalThis.readRawBody = mockReadRawBody;
globalThis.getQuery = mockGetQuery;
globalThis.getHeader = mockGetHeader;
globalThis.createError = mockCreateError;
globalThis.getUserSession = mockGetUserSession;
globalThis.requireUserSession = mockGetUserSession;

// Mock h3 module for explicit imports
vi.mock('h3', () => ({
  defineEventHandler: (handler) => handler,
  readBody: mockReadBody,
  readRawBody: mockReadRawBody,
  getQuery: mockGetQuery,
  getHeader: mockGetHeader,
  createError: mockCreateError
}));

// Create mock database objects for more precise control
const mockExecute = vi
  .fn()
  .mockImplementation(() => Promise.resolve([{ id: 'default-id' }]));

// Mock the database operations with better chainability
const mockDbOperations = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  leftJoin: vi.fn().mockReturnThis(),
  rightJoin: vi.fn().mockReturnThis(),
  fullJoin: vi.fn().mockReturnThis(),
  crossJoin: vi.fn().mockReturnThis(),
  innerJoin: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  groupBy: vi.fn().mockReturnThis(),
  having: vi.fn().mockReturnThis(),
  execute: mockExecute,
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  onConflictDoNothing: vi.fn().mockReturnThis()
};

// Add returning in a way that returns a proper chain
mockDbOperations.returning = vi.fn(() => ({ execute: mockExecute }));

const mockDb = {
  ...mockDbOperations,
  transaction: vi.fn(
    async (callback) => await callback({ ...mockDbOperations })
  )
};

vi.mock('@serp/db/server/database', () => ({
  getDb: vi.fn().mockReturnValue(mockDb)
}));

// Mock schemas
vi.mock('@serp/db/server/database/schema', () => ({
  category: { id: 'id', module: 'module', slug: 'slug', name: 'name' },
  entity: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    module: 'module',
    data: 'data',
    singleData: 'singleData'
  },
  featuredSubscription: {
    entity: 'entity',
    category: 'category',
    isActive: 'isActive',
    placement: 'placement',
    reservationExpiresAt: 'reservationExpiresAt',
    lastPayment: 'lastPayment',
    cancelAtPeriodEnd: 'cancelAtPeriodEnd',
    currentPeriodEnd: 'currentPeriodEnd',
    currentPeriodStart: 'currentPeriodStart',
    endedAt: 'endedAt',
    cancelAt: 'cancelAt',
    email: 'email'
  },
  payment: {
    id: 'id',
    customer: 'customer',
    type: 'type',
    data: 'data'
  },
  customer: {
    id: 'id',
    user: 'user',
    email: 'email'
  },
  submitForm: {
    id: 'id',
    entity: 'entity',
    user: 'user',
    module: 'module',
    uuid: 'uuid',
    isPriority: 'isPriority',
    priorityPaymentFk: 'priorityPaymentFk'
  }
}));

// Mock Stripe modules
const mockStripeWebhooks = {
  constructEvent: vi.fn().mockImplementation((body, signature, secret) => {
    return JSON.parse(body.toString());
  })
};

const mockStripeCheckoutSessions = {
  create: vi.fn().mockResolvedValue({
    id: 'cs_test_123',
    url: 'https://checkout.stripe.com/test'
  }),
  retrieve: vi.fn().mockResolvedValue({
    id: 'cs_test_123',
    payment_status: 'paid',
    customer: 'cus_test_123',
    amount_total: 9900
  })
};

const mockStripeCustomers = {
  create: vi.fn().mockResolvedValue({
    id: 'cus_test_123',
    email: 'test@example.com'
  })
};

const mockStripePortalSessions = {
  create: vi.fn().mockResolvedValue({
    id: 'bps_test_123',
    url: 'https://billing.stripe.com/test'
  })
};

const mockStripePaymentIntents = {
  create: vi.fn().mockResolvedValue({
    id: 'pi_test_123',
    client_secret: 'pi_test_secret_123'
  })
};

const mockStripe = {
  webhooks: mockStripeWebhooks,
  checkout: {
    sessions: mockStripeCheckoutSessions
  },
  customers: mockStripeCustomers,
  billingPortal: {
    sessions: mockStripePortalSessions
  },
  paymentIntents: mockStripePaymentIntents,
  subscriptions: {
    retrieve: vi.fn()
  }
};

vi.mock('#stripe/server', () => ({
  useServerStripe: vi.fn().mockResolvedValue(mockStripe)
}));

// Mock sendSlackNotification from @serp/notifications/server
vi.mock('@serp/notifications/server', () => ({
  sendSlackNotification: vi.fn().mockResolvedValue(true)
}));

// Mock SQL functions
const mockRaw = vi.fn((x) => x);
const mockJoin = vi.fn((arr, separator) => arr.join(','));
const mockSql = vi.fn((query) => ({ query }));
mockSql.raw = mockRaw;
mockSql.join = mockJoin;

vi.mock('drizzle-orm', () => ({
  eq: vi
    .fn()
    .mockImplementation((a, b) => ({ field: a, value: b, operator: 'eq' })),
  and: vi
    .fn()
    .mockImplementation((...conditions) => ({ conditions, operator: 'and' })),
  or: vi
    .fn()
    .mockImplementation((...conditions) => ({ conditions, operator: 'or' })),
  not: vi
    .fn()
    .mockImplementation((condition) => ({ condition, operator: 'not' })),
  desc: vi.fn().mockImplementation((field) => ({ field, direction: 'desc' })),
  asc: vi.fn().mockImplementation((field) => ({ field, direction: 'asc' })),
  inArray: vi.fn().mockImplementation((field, values) => ({
    field,
    values,
    operator: 'inArray'
  })),
  isNull: vi
    .fn()
    .mockImplementation((field) => ({ field, operator: 'isNull' })),
  isNotNull: vi
    .fn()
    .mockImplementation((field) => ({ field, operator: 'isNotNull' })),
  sql: mockSql
}));

// Add Stripe environment variables
process.env.COMPANY_FEATURED_1_PRICE_ID = 'price_test_featured_1';
process.env.COMPANY_FEATURED_2_PRICE_ID = 'price_test_featured_2';
process.env.COMPANY_FEATURED_3_PRICE_ID = 'price_test_featured_3';
process.env.COMPANY_FEATURED_4_PRICE_ID = 'price_test_featured_4';
process.env.COMPANY_FEATURED_5_PRICE_ID = 'price_test_featured_5';
process.env.COMPANY_FEATURED_1_PRICE = '9900';
process.env.COMPANY_FEATURED_2_PRICE = '7900';
process.env.COMPANY_FEATURED_3_PRICE = '5900';
process.env.COMPANY_FEATURED_4_PRICE = '3900';
process.env.COMPANY_FEATURED_5_PRICE = '1900';
process.env.COMPANY_PRIORITY_QUEUE_PRICE = '4900';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_secret';
process.env.BASE_URL = 'https://test.domain.com';

export {
  mockCreateError,
  mockDb,
  mockExecute,
  mockGetHeader,
  mockGetQuery,
  mockGetUserSession,
  mockJoin,
  mockRaw,
  mockReadBody,
  mockReadRawBody,
  mockSql,
  mockStripe
};
