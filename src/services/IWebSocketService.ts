import { AEventName } from "../models/AEventName"
import { ArcaneBaseEvent } from "../models/ArcaneEvents"

export interface IWebSocketService {
  emit: (event: ArcaneBaseEvent, to: string[]) => void
  on: (name: AEventName, callback: (data: any) => void) => void
  off: (name: AEventName, callback?: (data: any) => void) => void
  close: () => void
  clientId?: string
  deviceId?: string
}

