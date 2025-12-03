class BiMap<K, V> {
  private readonly forward: Map<K, V>;
  private readonly backward: Map<V, K>;

  constructor(source?: BiMap<K, V>) {
    if (source) {
      this.forward = new Map(source.forward);
      this.backward = new Map(source.backward);
    } else {
      this.forward = new Map();
      this.backward = new Map();
    }
  }

  set(key: K, value: V) {
    // Remove old pairs
    if (this.forward.has(key)) {
      const prevValue = this.forward.get(key)!;
      this.backward.delete(prevValue);
    }
    if (this.backward.has(value)) {
      const prevKey = this.backward.get(value)!;
      this.forward.delete(prevKey);
    }

    this.forward.set(key, value);
    this.backward.set(value, key);
  }

  get(key: K): V | undefined {
    return this.forward.get(key);
  }

  getKey(value: V): K | undefined {
    return this.backward.get(value);
  }

  hasKey(key: K): boolean {
    return this.forward.has(key);
  }

  hasValue(value: V): boolean {
    return this.backward.has(value);
  }
}

export default BiMap;
