import { ArcaneBaseEvent } from "./ArcaneEvents"
import { AEventName } from "./AEventName"

export abstract class PadEvent extends ArcaneBaseEvent { constructor(name: AEventName) { super(name) } }

export class LeftEvent extends PadEvent { constructor() { super(AEventName.Left) } }

export class RightEvent extends PadEvent { constructor() { super(AEventName.Right) } }

export class UpEvent extends PadEvent { constructor() { super(AEventName.Up) } }

export class DownEvent extends PadEvent { constructor() { super(AEventName.Down) } }

export class EnterEvent extends PadEvent { constructor() { super(AEventName.Enter) } }

export class InfoEvent extends PadEvent { constructor() { super(AEventName.Info) } }

export class ExtraEvent extends PadEvent { constructor() { super(AEventName.Extra) } }

export class BackEvent extends PadEvent { constructor() { super(AEventName.Back) } }
