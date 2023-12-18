import { ArcanePad } from "../services/ArcanePad"
import { AOrientation, ArcaneDeviceType } from "./Types"

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
  padOrientation: AOrientation
  hideMouse?: boolean

  constructor({
    deviceType = 'view',
    port = '3685',
    reverseProxyPort = '3689',
    arcaneCode = '',
    padOrientation = 'Landscape',
    hideMouse = true,
  }: {
    deviceType?: ArcaneDeviceType,
    port?: string,
    reverseProxyPort?: string,
    arcaneCode?: string,
    padOrientation?: AOrientation,
    hideMouse?: boolean,
  } = {}) {
    this.deviceType = deviceType
    this.port = port
    this.reverseProxyPort = reverseProxyPort
    this.arcaneCode = arcaneCode
    this.padOrientation = padOrientation
    this.hideMouse = hideMouse
  }
}
