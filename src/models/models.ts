import { ArcanePad } from "../services/ArcanePad"

export type ArcaneCustomEvent = {
  name: string
  val?: any | undefined
  fromId: string
  toIds?: string[]
}

export type ArcaneClientInitData = {
  clientType: ArcaneClientType
  deviceType?: ArcaneDeviceType
  deviceId?: string
}

export type AssignedDataInitEvent = {
  event: 'init'
  assignedClientId: string,
  assignedDeviceId: string,
}

export type ArcaneDevice = {
  id: string
  clients: ArcaneClient[]
  deviceType: ArcaneDeviceType
  user: ArcaneUser
}


export interface ArcaneClient {
  id: string
  clientType: ArcaneClientType
}

export type GlobalState = {
  devices: ArcaneDevice[]
}


export type ArcaneClientType = 'internal' | 'iframe' | 'external'

export type DeviceSensorType = 'rotationVector' | 'linearAcceleration'

export type ArcaneDeviceType = 'pad' | 'view' | 'none'

export interface InitIframeQueryParams {
  deviceId: string,
}

export class InitialState {
  pads: ArcanePad[]
  constructor(pads: ArcanePad[]) {
    this.pads = pads
  }
}

export class ArcaneUser {
  id: string
  name: string
  color: string
  constructor(id: string, name: string, color: string) {
    this.id = id
    this.name = name
    this.color = color
  }
}

export class ArcaneInitParams {
  deviceType: ArcaneDeviceType
  port: string
  reverseProxyPort: string
  arcaneCode?: string
  constructor({ deviceType, port, reverseProxyPort, arcaneCode }:
    { deviceType?: ArcaneDeviceType, port?: string, reverseProxyPort?: string, arcaneCode?: string } =
    { deviceType: 'view', port: ' 3005', reverseProxyPort: '3009', arcaneCode: '' }) {
    this.deviceType = deviceType ?? 'view'
    this.port = port ?? '3005'
    this.reverseProxyPort = reverseProxyPort ?? '3009'
    this.arcaneCode = arcaneCode ?? ''
  }
}
