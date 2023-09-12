
import { Arcane } from "../Arcane";
import { ArcaneBaseEvent } from "./ArcaneEvents";

export class AttackEvent extends ArcaneBaseEvent {
  damage: number
  constructor(damage: number) {
    super(CustomEventNames.Attack)
    this.damage = damage
  }
}

export class MoveLeft extends ArcaneBaseEvent {

  constructor() {
    super("MoveLeft" + Arcane.msg.clientId)
  }
}

export enum CustomEventNames {
  Attack = "Attack"
}
