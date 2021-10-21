export interface CacheEntry {
  promise: Promise<void>;
  args: any[];
  error?: any;
  response?: Response;
}

export class ProviderCache {
  declare cache: Map<string, CacheEntry[]>;

  constructor() {
    this.cache = new Map();
  }

  read(type: string, args: any[]) {
    const entries = this.cache.get(type);
  }

  write(type: string, promise: Promise<void>) {
    const entries = this.cache.get(type) ?? [];
    // entries.push({ promise });
    this.cache.set(type, entries);
  }
}
