import { Arcane } from "../Arcane"
import { AEventName } from "../models/AEventName"
import { ArcaneEventEmitter } from "../models/ArcaneEventEmitter"
import { GetQuaternionEvent, GetRotationEulerEvent, GetPointerEvent, IframePadConnectEvent, IframePadDisconnectEvent, OpenArcaneMenuEvent, CloseArcaneMenuEvent, ArcaneBaseEvent, StartGetQuaternionEvent, StopGetQuaternionEvent, CalibrateQuaternionEvent, StartGetRotationEulerEvent, StopGetRotationEulerEvent, StartGetPointerEvent, StopGetPointerEvent, VibrateEvent, SetScreenOrientationPortraitEvent, SetScreenOrientationLandscapeEvent, CalibratePointerEvent } from "../models/ArcaneEvents"
import { ArcaneUser } from "../models/Models"
import { WebSocketService } from "./WebSocketService"

export class ArcanePad {
  user?: ArcaneUser
  deviceId: string
  internalId: string
  internalIdList: string[]
  iframeId: string
  iframeIdList: string[]
  isConnected: boolean
  msg: WebSocketService

  private events: ArcaneEventEmitter
  constructor({ deviceId, internalId, iframeId, isConnected, user }:
    { deviceId: string; internalId: string; iframeId: string; isConnected: boolean, user?: ArcaneUser }) {
    if (user) this.user = user
    this.deviceId = deviceId
    this.internalId = internalId
    this.internalIdList = [internalId]
    this.iframeId = iframeId
    this.iframeIdList = [iframeId]
    this.isConnected = isConnected

    this.msg = Arcane.msg

    this.events = new ArcaneEventEmitter()

    this.msg.on(AEventName.GetQuaternion, (event: GetQuaternionEvent, clientId: string) => {
      this.proxyEvent(AEventName.GetQuaternion, event, clientId)
    })

    this.msg.on(AEventName.GetRotationEuler, (event: GetRotationEulerEvent, clientId: string) => {
      this.proxyEvent(AEventName.GetRotationEuler, event, clientId)
    })

    this.msg.on(AEventName.GetPointer, (event: GetPointerEvent, clientId: string) => {
      this.proxyEvent(AEventName.GetPointer, event, clientId)
    })

    this.msg.on(AEventName.IframePadConnect, (event: IframePadConnectEvent) => {
      this.isConnected = true
      this.proxyEvent(AEventName.IframePadConnect, event, event.iframeId)
    })

    this.msg.on(AEventName.IframePadDisconnect, (event: IframePadDisconnectEvent) => {
      this.isConnected = false
      this.proxyEvent(AEventName.IframePadDisconnect, event, event.iframeId)
    })

    this.msg.on(AEventName.OpenArcaneMenu, (event: OpenArcaneMenuEvent, fromId: string) => {
      this.proxyEvent(AEventName.OpenArcaneMenu, event, fromId)
    })

    this.msg.on(AEventName.CloseArcaneMenu, (event: CloseArcaneMenuEvent, fromId: string) => {
      this.proxyEvent(AEventName.CloseArcaneMenu, event, fromId)
    })

  }

  private proxyEvent(eventName: string, event: ArcaneBaseEvent, padId: string) {
    const fullEventName = `${eventName}_${padId}`
    this.events.emit(fullEventName, event)
  }

  startGetQuaternion() {
    this.msg.emit(new StartGetQuaternionEvent(), this.internalIdList)
  }

  stopGetQuaternion(offAllListeners: boolean = false) {
    this.msg.emit(new StopGetQuaternionEvent(), this.internalIdList)
    if (offAllListeners) this.events.off(AEventName.GetQuaternion + '_' + this.internalId)
  }

  onGetQuaternion(callback: (e: GetQuaternionEvent) => void) {
    this.events.on(AEventName.GetQuaternion + '_' + this.internalId, callback)
  }

  calibrateQuaternion() {
    this.msg.emit(new CalibrateQuaternionEvent(), this.internalIdList)
  }

  startGetRotationEuler() {
    this.msg.emit(new StartGetRotationEulerEvent(), this.internalIdList)
  }

  stopGetRotationEuler(offAllListeners: boolean = false) {
    this.msg.emit(new StopGetRotationEulerEvent(), this.internalIdList)
    if (offAllListeners) this.events.off(AEventName.GetRotationEuler + '_' + this.internalId)
  }

  onGetRotationEuler(callback: (e: GetRotationEulerEvent) => void) {
    this.events.on(AEventName.GetRotationEuler + '_' + this.internalId, callback)
  }

  startGetPointer() {
    this.msg.emit(new StartGetPointerEvent(), this.internalIdList)
  }

  stopGetPointer(offAllListeners: boolean = false) {
    this.msg.emit(new StopGetPointerEvent(), this.internalIdList)
    if (offAllListeners) this.events.off(AEventName.GetPointer + '_' + this.internalId)
  }

  onGetPointer(callback: (e: GetPointerEvent) => void) {
    this.events.on(AEventName.GetPointer + '_' + this.internalId, callback)
  }

  calibratePointer(isTopLeft: boolean) {
    this.msg.emit(new CalibratePointerEvent(isTopLeft), this.internalIdList)
  }

  setScreenOrientationPortrait() {
    this.msg.emit(new SetScreenOrientationPortraitEvent(), this.internalIdList)
  }

  setScreenOrientationLandscape() {
    this.msg.emit(new SetScreenOrientationLandscapeEvent(), this.internalIdList)
  }

  vibrate(miliseconds: number) {
    this.msg.emit(new VibrateEvent(miliseconds), this.internalIdList)
  }

  onConnect(callback: (e: IframePadConnectEvent) => void) {
    this.events.on(AEventName.IframePadConnect + '_' + this.iframeId, callback)
  }

  onDisconnect(callback: (e: IframePadDisconnectEvent) => void) {
    this.events.on(AEventName.IframePadDisconnect + '_' + this.iframeId, callback)
  }

  onOpenArcaneMenu(callback: (e: OpenArcaneMenuEvent) => void) {
    this.events.on(AEventName.OpenArcaneMenu + '_' + this.internalId, callback)
  }

  onCloseArcaneMenu(callback: (e: CloseArcaneMenuEvent) => void) {
    this.events.on(AEventName.CloseArcaneMenu + '_' + this.internalId, callback)
  }

  // on(padId: string, eventName: string, callback: (e: ArcaneBaseEvent) => void) {
  //   this.events.on(eventName + '_' + padId, callback)
  // }

  emit(e: ArcaneBaseEvent) {
    this.msg.emit(e, this.iframeIdList)
  }

  on<T extends ArcaneBaseEvent>(eventName: string, callback: (e: T) => void) {
    const fullEventName = `${eventName}_${this.iframeId}`
    this.events.on(fullEventName, callback)

    const proxyCallback = (event: T, clientId: string) => {
      if (clientId === this.iframeId) {
        this.proxyEvent(eventName, event, this.iframeId)
      }
    }

    this.msg.on(eventName, proxyCallback)
  }

  off(padId: string, eventName: string, callback?: (e: ArcaneBaseEvent) => void) {
    const fullEventName = `${eventName}_${padId}`
    this.events.off(fullEventName, callback)
  }

  dispose() {
    this.events.offAll()
  }

}
