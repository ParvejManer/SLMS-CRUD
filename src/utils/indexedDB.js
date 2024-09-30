import { openDB } from 'idb';

export const slmsDB = async () => {
    const db = await openDB("LibraryDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("students")) {
          db.createObjectStore("students", { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains("books")) {
          
          db.createObjectStore("books", { keyPath: 'bookId', autoIncrement: true }); 
        }
        if (!db.objectStoreNames.contains("booksAllocate")) {
          const store = db.createObjectStore("booksAllocate", { keyPath: 'id', autoIncrement: true });
          store.createIndex('studentId', 'studentId', { unique: false });
          store.createIndex('bookId', 'bookId', { unique: false });
        }
      },
    });
    return db;
  };

