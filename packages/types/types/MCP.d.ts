export type MCPServer = {
  id: number;
  slug: string;
  url: string;
  description: string;
  tags: string[];
  contributors: string[];
  readme: string;
  owner: string;
  repo: string;
  stars: number;
  forks: number;
  topics: string[];
  languages: string[];
  repoCreatedAt: string;
  repoUpdatedAt: string;
};

export type MCPServerIndex = {
  id: number;
  slug: string;
  url: string;
  description: string;
  tags: string[];
  contributors: string[];
  owner: string;
  repo: string;
  stars: number;
  forks: number;
  topics: string[];
  languages: string[];
  repoCreatedAt: string;
  repoUpdatedAt: string;
};

export type MCPServers = {
  servers: MCPServerIndex[];
  pagination: Pagination;
  categoryArticle?: string;
  categoryName?: string;
};