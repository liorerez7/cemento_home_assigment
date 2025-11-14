import { LOCAL_STORAGE_KEYS } from '../utils/constants';

/**
 * Handles persistence of table schema & data using localStorage.
 * Provides:
 *  - getSchemaAndData(): loads and parses stored schema/data
 *  - saveSchemaAndData(): saves schema/data as JSON
 *
 * Safely wraps JSON parse/stringify and guards against errors.
 */

export const localStorageAdapter = {
  getSchemaAndData() {
    try {
      const schemaStr = localStorage.getItem(LOCAL_STORAGE_KEYS.SCHEMA);
      const dataStr = localStorage.getItem(LOCAL_STORAGE_KEYS.DATA);

      if (!schemaStr || !dataStr) return null;

      return {
        columns: JSON.parse(schemaStr),
        data: JSON.parse(dataStr),
      };
    } catch (err) {
      console.warn("localStorageAdapter.getSchemaAndData error:", err);
      return null;
    }
  },

  saveSchemaAndData({ columns, data }) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SCHEMA, JSON.stringify(columns));
      localStorage.setItem(LOCAL_STORAGE_KEYS.DATA, JSON.stringify(data));
    } catch (err) {
      console.warn("localStorageAdapter.saveSchemaAndData error:", err);
    }
  }
};
