
type Callback = (...args: any[]) => any;

/**
 * Server-side Hook System for Next_CMS.
 */
class HookSystem {
  private actions: Map<string, Callback[]> = new Map();
  private filters: Map<string, Callback[]> = new Map();

  addAction(name: string, callback: Callback) {
    if (!this.actions.has(name)) this.actions.set(name, []);
    this.actions.get(name)!.push(callback);
  }

  doAction(name: string, ...args: any[]) {
    const callbacks = this.actions.get(name) || [];
    callbacks.forEach((callback) => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in server action hook "${name}":`, error);
      }
    });
  }

  addFilter(name: string, callback: Callback) {
    if (!this.filters.has(name)) this.filters.set(name, []);
    this.filters.get(name)!.push(callback);
  }

  applyFilters(name: string, value: any, ...args: any[]) {
    const callbacks = this.filters.get(name) || [];
    return callbacks.reduce((acc, callback) => {
      try {
        return callback(acc, ...args);
      } catch (error) {
        console.error(`Error in server filter hook "${name}":`, error);
        return acc;
      }
    }, value);
  }
}

export const hooks = new HookSystem();
export default hooks;
