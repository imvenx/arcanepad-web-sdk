import { ArcaneEventCallback } from "./Types"

export class ArcaneEventEmitter {
  eventHandlers: { [key: string]: ArcaneEventCallback[] } = {}

  on(name: string, callback: ArcaneEventCallback): void {
    if (!this.eventHandlers[name]) {
      this.eventHandlers[name] = []
    }
    this.eventHandlers[name].push(callback)
  }

  off(name: string, callback?: ArcaneEventCallback): void {

    if (!this.eventHandlers[name]) return

    if (!callback) {
      delete this.eventHandlers[name]
      return
    }

    this.eventHandlers[name] = this.eventHandlers[name].filter(cb => cb !== callback)
    if (this.eventHandlers[name].length === 0) delete this.eventHandlers[name]
  }

  offAll() {
    this.eventHandlers = {}
  }

  emit(name: string, ...args: any[]): void {
    if (!this.eventHandlers[name]) {
      return
    }
    for (const callback of this.eventHandlers[name]) {
      callback(...args)
    }
  }
}
