import { Arcane } from "../Arcane"
import { ArcaneBaseEvent } from "../models/ArcaneEvents"
import { ArcaneInitParams, InitIframeQueryParams } from "../models/Models"
import { ArcaneClientInitData } from "../models/Types"
import { getQueryParams } from "../utils/utils"
import { WebSocketServiceBase } from "./WebSocekBaseService"

export class WebSocketService extends WebSocketServiceBase {

  constructor(arcaneInitParams: ArcaneInitParams) {

    const clientInitData = getClientInitData(arcaneInitParams)
    let url = ''
    if (clientInitData.clientType == 'external') url = buildExternalUrl(arcaneInitParams)
    else if (clientInitData.clientType == 'iframe') url = buildIframeUrl(arcaneInitParams)

    super(url, clientInitData)
  }

  emitToViews(e: ArcaneBaseEvent) {
    this.emit(e, Arcane.iframeViewsIds)
  }

  emitToPads(e: ArcaneBaseEvent) {
    this.emit(e, Arcane.iframePadsIds)
  }

}

function buildIframeUrl({ port }: ArcaneInitParams) {
  let host = window.location.hostname
  let protocol = 'wss://'
  return protocol + host + ':' + port
}

function buildExternalUrl({ reverseProxyPort, arcaneCode }: ArcaneInitParams) {
  // let host = '192.168.' + arcaneCode
  let protocol = 'ws://'
  return protocol + '127.0.0.1' + ':' + reverseProxyPort
}

function getClientInitData({ deviceType }: ArcaneInitParams) {
  const queryParams: InitIframeQueryParams = getQueryParams()

  // if (!queryParams) {
  //   console.error('Missing query params on websocket constructor')
  // }

  // if (!queryParams.deviceId || queryParams.deviceId === "undefined") {
  //   console.error('Missing deviceId on query params on websocket constructor')
  // }

  if (!queryParams?.deviceId) {
    const clientInitData: ArcaneClientInitData = {
      clientType: 'external',
      deviceType: deviceType,
    }
    return clientInitData
  }

  const clientInitData: ArcaneClientInitData = {
    clientType: 'iframe',
    deviceId: queryParams.deviceId,
  }
  return clientInitData
}



