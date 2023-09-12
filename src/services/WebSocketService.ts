import { Arcane } from "../Arcane"
import { ArcaneBaseEvent } from "../models/ArcaneEvents"
import { InitIframeQueryParams, ArcaneClientInitData } from "../models/models"
import { getQueryParams } from "../utils/utils"
import { WebSocketServiceBase } from "./WebSocekBaseService"

export class WebSocketService extends WebSocketServiceBase {

  constructor(url: string) {

    const clientInitData = getClientInitData()
    super(url, clientInitData)
  }

  emitToViews(e: ArcaneBaseEvent) {
    this.emit(e, Arcane.iframeViewsIds)
  }

  emitToPads(e: ArcaneBaseEvent) {
    this.emit(e, Arcane.iframePadsIds)
  }

}

function getClientInitData() {
  const queryParams: InitIframeQueryParams = getQueryParams()

  if (!queryParams) {
    console.error('Missing query params on websocket constructor')
  }

  if (!queryParams.deviceId || queryParams.deviceId === "undefined") {
    console.error('Missing deviceId on query params on websocket constructor')
  }

  const clientInitData: ArcaneClientInitData = {
    clientType: 'iframe',
    deviceId: queryParams.deviceId,
  }

  return clientInitData
}



