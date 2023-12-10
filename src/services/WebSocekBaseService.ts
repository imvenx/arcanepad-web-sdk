import { AEventName } from "../models/AEventName";
import { InitializeEvent, ArcaneMessageFrom, ArcaneBaseEvent, ArcaneMessageTo } from "../models/ArcaneEvents";
import { ArcaneClientInitData } from "../models/Types";
import { IWebSocketService } from "./IWebSocketService";

type EventCallback = (eventData: any, from: string) => void;
type EventHandlerMap = { [eventName: string]: EventCallback[] }

export class WebSocketServiceBase implements IWebSocketService {

  private ws: WebSocket
  private eventHandlers: EventHandlerMap = {}
  public clientId?: string
  public deviceId?: string
  private reconnectionDelayMiliseconds = 1000
  private clientInitData: ArcaneClientInitData

  private url = ''

  constructor(url: string, clientInitData: ArcaneClientInitData) {

    this.url = url
    this.clientInitData = clientInitData

    this.ws = this.initializeWs(this.clientInitData)

    this.on(AEventName.Initialize, this.onInitialize)
  }

  private onOpen() {
    console.log("WebSocket connection opened.")
  }

  private onError(error: Event) {
    console.error("WebSocket Error:", error)
  }

  private onClose(event: CloseEvent) {
    if (event.wasClean) {
      console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`)
    } else {
      console.error('WebSocket connection died')
      setTimeout(() => {
        this.reconnect()
      }, this.reconnectionDelayMiliseconds)
    }
  }

  private onMessage(_event: MessageEvent) {
    try {
      const event: ArcaneMessageFrom = JSON.parse(_event.data)

      if (event.e.name != AEventName.RefreshGlobalState && event.e.name != AEventName.GetQuaternion) {
        console.log("Received event: ", event)
      }

      if (this.eventHandlers[event.e.name]) {
        for (const callback of this.eventHandlers[event.e.name]) {
          callback(event.e, event.from)
        }
      }
    } catch (e) {
      console.error('Error on onMessage', e, _event)
    }
  }

  emit(event: ArcaneBaseEvent, to: string[]): void {
    const msg = new ArcaneMessageTo(event, to)
    console.log('sending message:', msg)
    this.ws.send(JSON.stringify(msg))
  }

  on(name: string, callback: EventCallback): void {

    if (!this.eventHandlers[name]) this.eventHandlers[name] = []

    // const callbackExists = this.eventHandlers[name]?.some(cb => JSON.stringify(cb) === JSON.stringify(callback));
    // if (callbackExists) return

    this.eventHandlers[name].push(callback)
  }

  off(name: string, callback?: EventCallback): void {

    if (!this.eventHandlers[name]) return

    if (!callback) {
      delete this.eventHandlers[name]
      return
    }

    this.eventHandlers[name] = this.eventHandlers[name].filter(cb => cb !== callback)
    if (this.eventHandlers[name].length === 0) delete this.eventHandlers[name]

  }

  close(): void {
    this.ws.close()
  }

  private reconnect() {
    console.log('Attempting to reconnect...')

    this.ws = this.initializeWs(this.clientInitData)
  }

  private initializeWs(clientInitData: ArcaneClientInitData) {

    console.log(this.url + `?clientInitData=${JSON.stringify(clientInitData)}`)
    const ws = new WebSocket(this.url + `?clientInitData=${JSON.stringify(clientInitData)}`)

    ws.onopen = this.onOpen.bind(this)
    ws.onerror = this.onError.bind(this)
    ws.onclose = this.onClose.bind(this)
    ws.onmessage = this.onMessage.bind(this)

    return ws
  }

  onInitialize = (e: InitializeEvent) => {
    if (!e.assignedClientId) return console.error("Missing client id on initialize")
    if (!e.assignedDeviceId) return console.error("Missing device id on initialize")
    this.clientId = e.assignedClientId
    this.deviceId = e.assignedDeviceId
    console.log("Client initialized with clientId: ", this.clientId, "and deviceId: ", this.deviceId)
  }
}



