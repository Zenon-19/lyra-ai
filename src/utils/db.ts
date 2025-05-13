// utils/db.ts
import { openDB } from 'idb';
import type { ChatMessage } from '../components/ChatHistory';

const DB_NAME = 'lyra-db';
const STORE = 'chat-history';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: false });
      }
    },
  });
}

export async function saveMessage(msg: ChatMessage) {
  const db = await getDB();
  await db.put(STORE, msg);
}

export async function getAllMessages(): Promise<ChatMessage[]> {
  const db = await getDB();
  return (await db.getAll(STORE)) as ChatMessage[];
}

export async function clearMessages() {
  const db = await getDB();
  await db.clear(STORE);
}
