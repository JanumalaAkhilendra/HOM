export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Trie implementation for efficient search
export class Trie {
  private root: Map<string, any>;

  constructor() {
    this.root = new Map();
  }

  insert(word: string): void {
    let node = this.root;
    const lowerWord = word.toLowerCase();
    
    for (const char of lowerWord) {
      if (!node.has(char)) {
        node.set(char, new Map());
      }
      node = node.get(char);
    }
    node.set('isEnd', true);
  }

  search(prefix: string): boolean {
    const node = this.traverse(prefix.toLowerCase());
    return node !== null && node.has('isEnd');
  }

  startsWith(prefix: string): boolean {
    return this.traverse(prefix.toLowerCase()) !== null;
  }

  private traverse(prefix: string): Map<string, any> | null {
    let node = this.root;
    
    for (const char of prefix) {
      if (!node.has(char)) {
        return null;
      }
      node = node.get(char);
    }
    return node;
  }
}