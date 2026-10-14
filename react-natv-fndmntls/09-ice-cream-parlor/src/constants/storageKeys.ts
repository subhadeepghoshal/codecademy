// Centralized storage keys to avoid key collisions
export const STORAGE_KEYS = {
  CACHE: '@cache',
  ICE_CREAM_DATA: '@ice_cream_data',
  TIMESTAMPS: '@timestamps',
} as const;

// Namespaced key generators for organized storage
export const getCacheKey = (endpoint: string): string =>
  `${STORAGE_KEYS.CACHE}:${endpoint}`;

export const getDataKey = (dataType: string): string =>
  `${STORAGE_KEYS.ICE_CREAM_DATA}:${dataType}`;

export const getTimestampKey = (operation: string): string =>
  `${STORAGE_KEYS.TIMESTAMPS}:${operation}`;
