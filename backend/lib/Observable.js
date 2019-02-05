export class Observable {
    observers = []
    subscribe = f => { this.observers.push(f) }
    notify = data => { this.observers.forEach(subscriber => subscriber(data)) }
    unsubscribe = f => { this.observers = this.observers.filter(subscriber => subscriber !== f ) }
}