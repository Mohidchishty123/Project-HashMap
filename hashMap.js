class HashMap {
    constructor(initialCapacity = 10, loadFactor = 0.75) {
      this.capacity = initialCapacity;
      this.loadFactor = loadFactor;
      this.size = 0;
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }
      
      return hashCode;
    }
  
    set(key, value) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value; // Update existing key's value
          return;
        }
      }
  
      bucket.push([key, value]);
      this.size++;
  
      // Check if we need to resize
      if (this.size > this.capacity * this.loadFactor) {
        this.resize();
      }
    }
  
    get(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1]; // Return value if key found
        }
      }
  
      return null; // Return null if key not found
    }
  
    has(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return true; // Return true if key found
        }
      }
  
      return false; // Return false if key not found
    }
  
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1); // Remove key-value pair
          this.size--;
          return true;
        }
      }
  
      return false; // Return false if key not found
    }
  
    length() {
      return this.size; // Return number of stored keys
    }
  
    clear() {
      this.buckets = new Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
    }
  
    keys() {
      let keysArray = [];
  
      for (let i = 0; i < this.capacity; i++) {
        const bucket = this.buckets[i];
        for (let j = 0; j < bucket.length; j++) {
          keysArray.push(bucket[j][0]); // Push keys into array
        }
      }
  
      return keysArray;
    }
  
    values() {
      let valuesArray = [];
  
      for (let i = 0; i < this.capacity; i++) {
        const bucket = this.buckets[i];
        for (let j = 0; j < bucket.length; j++) {
          valuesArray.push(bucket[j][1]); // Push values into array
        }
      }
  
      return valuesArray;
    }
  
    entries() {
      let entriesArray = [];
  
      for (let i = 0; i < this.capacity; i++) {
        const bucket = this.buckets[i];
        for (let j = 0; j < bucket.length; j++) {
          entriesArray.push([bucket[j][0], bucket[j][1]]); // Push key-value pairs into array
        }
      }
  
      return entriesArray;
    }
  
    resize() {
      this.capacity *= 2;
      const newBuckets = new Array(this.capacity).fill(null).map(() => []);
  
      // Rehash all existing key-value pairs
      for (let i = 0; i < this.buckets.length; i++) {
        const bucket = this.buckets[i];
        for (let j = 0; j < bucket.length; j++) {
          const key = bucket[j][0];
          const value = bucket[j][1];
          const index = this.hash(key);
          newBuckets[index].push([key, value]);
        }
      }
  
      this.buckets = newBuckets;
    }
  }
  
  // Test the HashMap implementation
  const test = new HashMap();
  
  test.set('apple', 'red');
  test.set('banana', 'yellow');
  test.set('carrot', 'orange');
  test.set('dog', 'brown');
  test.set('elephant', 'gray');
  test.set('frog', 'green');
  test.set('grape', 'purple');
  test.set('hat', 'black');
  test.set('ice cream', 'white');
  test.set('jacket', 'blue');
  test.set('kite', 'pink');
  test.set('lion', 'golden');
  
  console.log(test.entries()); // Should display all key-value pairs
  
  test.set('apple', 'green'); // Overwrite 'apple' value
  test.set('moon', 'silver'); // Trigger resizing
  
  console.log(test.entries()); // Should display updated key-value pairs after resizing
  
  console.log(test.get('apple')); // Should print 'green'
  console.log(test.has('carrot')); // Should print 'true'
  console.log(test.remove('banana')); // Should print 'true'
  console.log(test.length()); // Should print '11'
  console.log(test.keys()); // Should print array of keys
  console.log(test.values()); // Should print array of values
  