import type { Category, Topic } from '@serp/types/types';

// TODO: Add types for the properties
export interface ServiceProvider {
  id?: number;
  createdAt?: string;
  name?: string;
  slug?: string;
  logoUrl?: string;
  exerpt?: string;
  content?: string;
  basicInfo?: Record<string, unknown>;
  contracts?: Record<string, unknown>;
  pricing?: Record<string, unknown>;
  services?: Record<string, unknown>;
  industries?: Record<string, unknown>;
  businessesServed?: Record<string, unknown>;
  supportSetup?: Record<string, unknown>;
  ratings?: Record<string, unknown>;
  serplyLink?: string;
  categories?: Category[];
  topics?: Topic[];
}

export interface ServiceProviderIndex {
  id: number;
  name: string;
  slug: string;
  logoUrl: string;
  exerpt?: string;
  basicInfo: Record<string, unknown>;
  industries: Record<string, unknown>;
  ratings: Record<string, unknown>;
  serplyLink: string;
  categories?: Category[];
  topics?: Topic[];
}

export interface ServiceProviders {
  serviceProviders: ServiceProviderIndex[];
  pagination: Pagination;
  category?: Category;
}
