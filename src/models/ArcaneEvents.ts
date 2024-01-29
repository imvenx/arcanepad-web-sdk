import { AEventName } from "./AEventName"
import { GlobalState, ArcaneClientType } from "./Types"
import { ArcaneUser } from "./Models"

export class ArcaneBaseEvent {
  readonly name: string
  constructor(name: string) {
    this.name = name
  }
}

export class ArcaneMessageTo {
  to: string[]
  e: ArcaneBaseEvent
  constructor(e: ArcaneBaseEvent, to: string[],) {
    this.to = to
    this.e = e
  }
}

export class ArcaneMessageFrom {
  from: string
  e: ArcaneBaseEvent
  constructor(e: ArcaneBaseEvent, from: string,) {
    this.from = from
    this.e = e
  }
}

//#region Custom Messages

export class InitializeEvent extends ArcaneBaseEvent {
  assignedClientId: string
  assignedDeviceId: string
  globalState: GlobalState
  constructor(assignedClientId: string, assignedDeviceId: string, globalState: GlobalState) {
    super(AEventName.Initialize)
    this.assignedClientId = assignedClientId
    this.assignedDeviceId = assignedDeviceId
    this.globalState = globalState

  }
}

export class UpdateUserEvent extends ArcaneBaseEvent {
  user: ArcaneUser
  constructor(user: ArcaneUser) {
    super(AEventName.UpdateUser)
    this.user = user
  }
}

export class OpenArcaneMenuEvent extends ArcaneBaseEvent { constructor() { super(AEventName.OpenArcaneMenu) } }
export class CloseArcaneMenuEvent extends ArcaneBaseEvent { constructor() { super(AEventName.CloseArcaneMenu) } }

export class PauseAppEvent extends ArcaneBaseEvent { constructor() { super(AEventName.PauseApp) } }
export class ResumeAppEvent extends ArcaneBaseEvent { constructor() { super(AEventName.ResumeApp) } }

export class RefreshGlobalStateEvent extends ArcaneBaseEvent {
  constructor(refreshedGlobalState: GlobalState) {
    super(AEventName.RefreshGlobalState)
    this.refreshedGlobalState = refreshedGlobalState
  }
  refreshedGlobalState: GlobalState
}

export class ClientConnectEvent extends ArcaneBaseEvent {
  clientId: string
  clientType: ArcaneClientType
  constructor(clientId: string, clientType: ArcaneClientType) {
    super(AEventName.ClientConnect)
    this.clientId = clientId
    this.clientType = clientType
  }
}

export class ClientDisconnectEvent extends ArcaneBaseEvent {
  clientId: string
  clientType: ArcaneClientType
  constructor(clientId: string, clientType: ArcaneClientType) {
    super(AEventName.ClientDisconnect)
    this.clientId = clientId
    this.clientType = clientType
  }
}

export class IframePadConnectEvent extends ArcaneBaseEvent {
  deviceId: string
  internalId: string
  iframeId: string
  user: ArcaneUser
  constructor(clientId: string, internalClientId: string, deviceId: string, user: ArcaneUser) {
    super(AEventName.IframePadConnect)
    this.iframeId = clientId
    this.internalId = internalClientId
    this.deviceId = deviceId
    this.user = user
  }
}

export class IframePadDisconnectEvent extends ArcaneBaseEvent {
  iframeId: string
  deviceId: string
  constructor(iframeId: string, deviceId: string) {
    super(AEventName.IframePadDisconnect)
    this.iframeId = iframeId
    this.deviceId = deviceId
  }
}

export class StartGetQuaternionEvent extends ArcaneBaseEvent {
  constructor() {
    super(AEventName.StartGetQuaternion)
  }
}

export class StopGetQuaternionEvent extends ArcaneBaseEvent {
  constructor() {
    super(AEventName.StopGetQuaternion)
  }
}

export class GetQuaternionEvent extends ArcaneBaseEvent {
  w: number
  x: number
  y: number
  z: number
  constructor(w: number, x: number, y: number, z: number) {
    super(AEventName.GetQuaternion)
    this.w = w
    this.x = x
    this.y = y
    this.z = z
  }
}

export class CalibrateQuaternionEvent extends ArcaneBaseEvent {
  constructor() {
    super(AEventName.CalibrateQuaternion)
  }
}


export class StartGetPointerEvent extends ArcaneBaseEvent {
  constructor() {
    super(AEventName.StartGetPointer)
  }
}

export class StopGetPointerEvent extends ArcaneBaseEvent {
  constructor() {
    super(AEventName.StopGetPointer)
  }
}

export class GetPointerEvent extends ArcaneBaseEvent {
  x: number
  y: number
  constructor(x: number, y: number) {
    super(AEventName.GetPointer)
    this.x = x
    this.y = y
  }
}

export class CalibratePointerEvent extends ArcaneBaseEvent {
  /** If is not top left it means is bottom right */
  isTopLeft: boolean
  constructor(isTopLeft: boolean) {
    super(AEventName.CalibratePointer)
    this.isTopLeft = isTopLeft
  }
}

export class StartGetRotationEulerEvent extends ArcaneBaseEvent {
  constructor() {
    super(AEventName.StartGetRotationEuler)
  }
}

export class StopGetRotationEulerEvent extends ArcaneBaseEvent {
  constructor() {
    super(AEventName.StopGetRotationEuler)
  }
}

export class GetRotationEulerEvent extends ArcaneBaseEvent {
  azimuth: number
  pitch: number
  roll: number
  constructor(azimuth: number, pitch: number, roll: number) {
    super(AEventName.GetRotationEuler)
    this.azimuth = azimuth
    this.pitch = pitch
    this.roll = roll
  }
}


export class StartGetLinearAccelerationEvent extends ArcaneBaseEvent {
  constructor() {
    super(AEventName.StartGetLinearAcceleration)
  }
}

export class StopGetLinearAccelerationEvent extends ArcaneBaseEvent {
  constructor() {
    super(AEventName.StopGetLinearAcceleration)
  }
}

export class GetLinearAccelerationEvent extends ArcaneBaseEvent {
  azimuth: number
  pitch: number
  roll: number
  constructor(azimuth: number, pitch: number, roll: number) {
    super(AEventName.GetLinearAcceleration)
    this.azimuth = azimuth
    this.pitch = pitch
    this.roll = roll
  }
}


export class SetScreenOrientationPortraitEvent extends ArcaneBaseEvent { constructor() { super(AEventName.SetScreenOrientationPortrait) } }
export class SetScreenOrientationLandscapeEvent extends ArcaneBaseEvent { constructor() { super(AEventName.SetScreenOrientationLandscape) } }

export class VibrateEvent extends ArcaneBaseEvent {
  milliseconds: number
  constructor(miliseconds: number) {
    super(AEventName.Vibrate)
    this.milliseconds = miliseconds
  }
}

//#endregion
