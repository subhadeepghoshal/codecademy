import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores data under the 'cache:' prefix with an expiration timestamp
 */
export const createCache = async (key: string, data: any, minutes: number = 30) => {
  const cacheEntry = {
    data,
    expires: Date.now() + minutes * 60 * 1000,
  };
  await AsyncStorage.setItem(`cache:${key}`, JSON.stringify(cacheEntry));
};

/**
 * Retrieves cached data if it exists and hasn't expired
 */
export const getCache = async (key: string) => {
  const cached = await AsyncStorage.getItem(`cache:${key}`);

  if (!cached) {
    return null;
  }

  const entry = JSON.parse(cached);

  if (Date.now() > entry.expires) {
    await AsyncStorage.removeItem(`cache:${key}`);
    return null;
  }

  return entry.data;
};

/**
 * Removes a specific cache entry
 */
export const removeCache = async (key: string) => {
  await AsyncStorage.removeItem(`cache:${key}`);
};

/**
 * Clears all cache entries (those with 'cache:' prefix)
 */
export const clearAllCache = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const cacheKeys = keys.filter(key => key.startsWith('cache:'));
  await AsyncStorage.multiRemove(cacheKeys);
};
