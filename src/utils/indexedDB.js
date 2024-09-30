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

  export const addRecord = async (storeName, record) => {
    const db = await slmsDB();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    
    if (storeName === "books" && record.bookId !== undefined) {
      delete record.bookId; 
    }
    
    await store.add(record);
    await transaction.done;
};

export const getAllRecords = async (storeName) => {
  const db = await slmsDB();
  return db.getAll(storeName);
};

export const deleteRecord = async (storeName, id) => {
  const db = await slmsDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  await store.delete(id);
  await transaction.done;
};

export const updateRecord = async (storeName, updatedRecord) => {
  const db = await slmsDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const existingRecord = await store.get(updatedRecord.id);

  if (existingRecord) {
    const updated = { ...existingRecord, ...updatedRecord };
    await store.put(updated);
  }
  await transaction.done;
};
