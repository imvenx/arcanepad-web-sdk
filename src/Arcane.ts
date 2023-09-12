import { AEventName } from "./models/AEventName"
import { InitializeEvent, RefreshGlobalStateEvent } from "./models/ArcaneEvents"
import { ArcaneDevice, InitialState, GlobalState } from "./models/models"
import { ArcanePad } from "./services/ArcanePad"
import { WebSocketService } from "./services/WebSocketService"

export class Arcane {
  static msg: WebSocketService
  static devices: ArcaneDevice[] = []
  static pads: ArcanePad[] = []
  static pad: ArcanePad | undefined

  static internalPadsIds: string[] = []
  static internalViewsIds: string[] = []
  static iframePadsIds: string[] = []
  static iframeViewsIds: string[] = []

  private static _arcaneClientInitialized = (() => {
    let resolveFn: (value: InitialState) => void;
    const promise = new Promise<InitialState>((resolve) => {
      resolveFn = resolve;
    });
    return { resolve: resolveFn!, promise };
  })();

  static arcaneClientInitialized(): Promise<InitialState> {
    return this._arcaneClientInitialized.promise;
  }

  static init() {

    this.msg = new WebSocketService('wss://' + location.hostname + ':3005')

    this.msg.on(AEventName.Initialize, (e: InitializeEvent) => this.initialize(e))
    this.msg.on(AEventName.RefreshGlobalState, (e: RefreshGlobalStateEvent) => this.refreshGlobalState(e.refreshedGlobalState))
  }

  static close() {
    this.msg.close()
  }

  private static initialize(e: InitializeEvent) {

    this.refreshGlobalState(e.globalState)

    this.pad = this.pads.find(p => p.deviceId === this.msg.deviceId)

    const initialState = new InitialState(this.pads)
    this._arcaneClientInitialized.resolve(initialState)

    this.msg.off(AEventName.Initialize, this.initialize)

    // console.log("**** Client initialized ****")
  }

  private static refreshGlobalState(refreshedGlobalState: GlobalState) {
    this.devices = refreshedGlobalState.devices ?? []
    this.internalPadsIds = this.devices.filter(d => d.deviceType === 'pad').flatMap(vd => vd.clients.filter(c => c.clientType === 'internal').map(c => c.id))
    this.internalViewsIds = this.devices.filter(d => d.deviceType === 'view').flatMap(vd => vd.clients.filter(c => c.clientType === 'internal').map(c => c.id))
    this.iframePadsIds = this.devices.filter(d => d.deviceType === 'pad').flatMap(vd => vd.clients.filter(c => c.clientType !== 'internal').map(c => c.id))
    this.iframeViewsIds = this.devices.filter(d => d.deviceType === 'view').flatMap(vd => vd.clients.filter(c => c.clientType !== 'internal').map(c => c.id))

    this.pads = this.getPads(refreshedGlobalState.devices)
  }

  private static getPads(devices: ArcaneDevice[]): ArcanePad[] {
    const pads: ArcanePad[] = []

    const padDevices = devices.filter(device => device.deviceType === 'pad' && device.clients.some(c => c.clientType === 'iframe'))

    padDevices.forEach(padDevice => {
      const iframeId = padDevice.clients.find(c => c.clientType === 'iframe')?.id
      const internalId = padDevice.clients.find(c => c.clientType === 'internal')?.id

      if (!iframeId) {
        console.error('Tried to set pad but iframeId was not found', padDevice)
        return
      }

      if (!internalId) {
        console.error('Tried to set pad but internalId was not found', padDevice)
        return
      }

      pads.push(new ArcanePad({ deviceId: padDevice.id, internalId: internalId, iframeId: iframeId, isConnected: true, user: padDevice.user }))
    })

    return pads
  }
}
