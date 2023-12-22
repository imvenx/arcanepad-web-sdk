export enum AEventName {

  None = "_None",

  Left = "_Left",
  Right = "_Right",
  Up = "_Up",
  Down = "_Down",
  Enter = "_Enter",
  Info = "_Info",
  Extra = "_Extra",
  Back = "_Back",

  AssignDataInit = "_AssignDataInit",

  SetDeviceType = "_SetDeviceType",

  EnterDevMode = "_EnterDevMode",

  EnterApp = "_EnterApp",
  ExitApp = "_ExitApp",

  RefreshGlobalState = "_RefreshGlobalState",

  Initialize = "_Initialize",

  ClientConnect = "_ClientConnect",
  ClientDisconnect = "_ClientDisconnect",

  IframePadConnect = "_IframePadConnect",
  IframePadDisconnect = "_IframePadDisconnect",

  StartGetQuaternion = "_StartGetQuaternion",
  StopGetQuaternion = "_StopGetQuaternion",
  GetQuaternion = "_GetQuaternion",
  CalibrateQuaternion = "_CalibrateQuaternion",

  StartGetPointer = "_StartGetPointer",
  StopGetPointer = "_StopGetPointer",
  GetPointer = "_GetPointer",
  CalibratePointer = "_CalibratePointer",

  StartGetRotationEuler = "_StartGetRotationEuler",
  StopGetRotationEuler = "_StopGetRotationEuler",
  GetRotationEuler = "_GetRotationEuler",
  CalibrateRotationEuler = "_CalibrateRotationEuler",

  SetScreenOrientationPortrait = "_SetScreenOrientationPortrait",
  SetScreenOrientationLandscape = "_SetScreenOrientationLandscape",

  Vibrate = "_Vibrate",

  UpdateUser = "_UpdateUser",

  OpenArcaneMenu = "_OpenArcaneMenu",
  CloseArcaneMenu = "_CloseArcaneMenu"
}
