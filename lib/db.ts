import { openDB } from 'idb';

export const dbPromise = openDB('workout-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('workouts')) {
      db.createObjectStore('workouts', { keyPath: 'id' });
    }
  },
});