/// <reference types="jest" />

import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { LocalStorage } from '../../storage';
import { UtmStore } from '../store';
import { UTM_NAME_STORE } from '../config';
import type { VisitData } from '../rules';

type JestMock = ReturnType<typeof jest.fn>;

// Mock LocalStorage
jest.mock('../storage', () => ({
  LocalStorage: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
}));

describe('UTM Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with default values', () => {
      const utm = UtmStore();
      expect(utm._storeName).toBe(UTM_NAME_STORE);
      expect(utm._maxEntries).toBe(20);
    });

    it('should initialize with custom values', () => {
      const utm = UtmStore({ storeName: 'custom_store', maxEntries: 10 });
      expect(utm._storeName).toBe('custom_store');
      expect(utm._maxEntries).toBe(10);
    });
  });

  describe('getStore', () => {
    it('should return empty array when storage is empty', () => {
      (LocalStorage.get as jest.Mock).mockReturnValue(null);
      const utm = UtmStore();
      expect(utm.getStore()).toEqual([]);
    });

    it('should return stored UTM data', () => {
      const mockData = [{ visitedAt: '2024-01-01', utms: { source: 'test' } }];
      (LocalStorage.get as jest.Mock).mockReturnValue(mockData);
      const utm = UtmStore();
      expect(utm.getStore()).toEqual(mockData);
    });
  });

  describe('getLatest', () => {
    it('should return null when no entries exist', () => {
      (LocalStorage.get as jest.Mock).mockReturnValue([]);
      const utm = UtmStore();
      expect(utm.getLatest()).toBeNull();
    });

    it('should return the latest UTM entry', () => {
      const mockData = [
        { visitedAt: '2024-01-01', utms: { source: 'first' } },
        { visitedAt: '2024-01-02', utms: { source: 'latest' } },
      ];
      (LocalStorage.get as jest.Mock).mockReturnValue(mockData);
      const utm = UtmStore();
      expect(utm.getLatest()).toEqual(mockData[1]);
    });
  });

  describe('add', () => {
    it('should add new UTM entry to empty store', () => {
      (LocalStorage.get as jest.Mock).mockReturnValue([]);
      const utm = UtmStore();
      const newEntry = { visitedAt: '2024-01-01', utms: { source: 'test' } };
      
      utm.add(newEntry);
      
      expect(LocalStorage.set).toHaveBeenCalledWith(UTM_NAME_STORE, [newEntry]);
    });

    it('should maintain store limit when adding entries', () => {
      const existingEntries = Array.from({ length: 20 }, (_, i) => ({
        visitedAt: `2024-01-${i + 1}`,
        utms: { source: `test${i}` },
      }));
      (LocalStorage.get as JestMock).mockReturnValue(existingEntries);
      
      const utm = UtmStore();
      const newEntry = { visitedAt: '2024-02-01', utms: { source: 'new' } };
      
      utm.add(newEntry);
      
      const mockCalls = (LocalStorage.set as JestMock).mock.calls;
      const storedData = mockCalls[0][1] as VisitData[];
      expect(storedData.length).toBe(20);
      expect(storedData[0]).toEqual(existingEntries[0]); // Keeps oldest
      expect(storedData[storedData.length - 1]).toEqual(newEntry); // Adds newest
    });
  });

  describe('initStore', () => {
    it('should remove store from localStorage', () => {
      const utm = UtmStore();
      utm.initStore();
      expect(LocalStorage.remove).toHaveBeenCalledWith(UTM_NAME_STORE);
    });
  });

  describe('handle', () => {
    it('should handle UTM from query parameters', () => {
      const utm = UtmStore();
      const query = { utm_source: 'google', utm_medium: 'cpc' };
      
      utm.handle(query, '');
      
      const mockCalls = (LocalStorage.set as JestMock).mock.calls;
      const storedData = mockCalls[0][1][0] as VisitData;
      expect(storedData.utms).toEqual({ source: 'google', medium: 'cpc' });
      expect(storedData.visitedAt).toBeDefined();
    });

    it('should handle UTM from referrer when no query params', () => {
      const utm = UtmStore();
      const referer = 'https://facebook.com';
      
      utm.handle({}, referer);
      
      const mockCalls = (LocalStorage.set as JestMock).mock.calls;
      const storedData = mockCalls[0][1][0] as VisitData;
      expect(storedData.utms.source).toBe('facebook');
      expect(storedData.visitedAt).toBeDefined();
    });

    it('should not add duplicate UTM entries', () => {
      const existingEntry = {
        visitedAt: '2024-01-01',
        utms: { source: 'google', medium: 'cpc' },
      };
      (LocalStorage.get as jest.Mock).mockReturnValue([existingEntry]);
      
      const utm = UtmStore();
      const query = { utm_source: 'google', utm_medium: 'cpc' };
      
      utm.handle(query, '');
      
      expect(LocalStorage.set).not.toHaveBeenCalled();
    });
  });
}); 