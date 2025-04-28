import {
  companyCache,
  companyComment,
  mbArtistMetadataCache,
  mbMetadataCache,
  mbReleaseGroupCache,
  mcpServerCache,
  mcpServerComment,
  postCache,
  postComment,
  sercieProviderComment,
  serviceProviderCache
} from '@serp/utils/server/api/db/schema';

export function getTableAndPKForModule(module: string) {
  let table;
  let field;
  let commentsTable;
  let commentsField;
  if (module === 'companies' || module === 'company') {
    table = companyCache;
    field = companyCache.id;
    commentsTable = companyComment;
    commentsField = 'company';
  } else if (module === 'posts' || module === 'post') {
    table = postCache;
    field = postCache.slug;
    commentsTable = postComment;
    commentsField = 'post';
  } else if (module === 'service-providers' || module === 'service-provider') {
    table = serviceProviderCache;
    field = serviceProviderCache.id;
    commentsTable = sercieProviderComment;
    commentsField = 'service_provider';
  } else if (module === 'artists' || module === 'artist') {
    table = mbArtistMetadataCache;
    field = mbArtistMetadataCache.id;
    commentsTable = null;
    commentsField = null;
  } else if (module === 'albums' || module === 'album') {
    table = mbReleaseGroupCache;
    field = mbReleaseGroupCache.id;
    commentsTable = null;
    commentsField = null;
  } else if (module === 'songs' || module === 'song') {
    table = mbMetadataCache;
    field = mbMetadataCache.id;
    commentsTable = null;
    commentsField = null;
  } else if (module === 'mcp-server' || module === 'mcp-servers') {
    table = mcpServerCache;
    field = mcpServerCache.id;
    commentsTable = mcpServerComment;
    commentsField = 'server';
  } else {
    throw new Error('Invalid module');
  }
  return { table, field, commentsTable, commentsField };
}
