export enum AEventName {

  None = "None",

  Left = "Left",
  Right = "Right",
  Up = "Up",
  Down = "Down",
  Enter = "Enter",
  Info = "Info",
  Extra = "Extra",
  Back = "Back",

  AssignDataInit = "AssignDataInit",

  SetDeviceType = "SetDeviceType",

  EnterDevMode = "EnterDevMode",

  EnterApp = "EnterApp",
  ExitApp = "ExitApp",

  RefreshGlobalState = "RefreshGlobalState",

  Initialize = "Initialize",

  ClientConnect = "ClientConnect",
  ClientDisconnect = "ClientDisconnect",

  IframePadConnect = "IframePadConnect",
  IframePadDisconnect = "IframePadDisconnect",

  StartGetQuaternion = "StartGetQuaternion",
  StopGetQuaternion = "StopGetQuaternion",
  GetQuaternion = "GetQuaternion",
  CalibrateQuaternion = "CalibrateQuaternion",

  StartGetPointer = "StartGetPointer",
  StopGetPointer = "StopGetPointer",
  GetPointer = "GetPointer",
  CalibratePointer = "CalibratePointer",

  StartGetRotationEuler = "StartGetRotationEuler",
  StopGetRotationEuler = "StopGetRotationEuler",
  GetRotationEuler = "GetRotationEuler",
  CalibrateRotationEuler = "CalibrateRotationEuler",

  SetScreenOrientationPortrait = "_SetScreenOrientationPortrait",
  SetScreenOrientationLandscape = "_SetScreenOrientationLandscape",

  Vibrate = "Vibrate",

  UpdateUser = "UpdateUser",

  OpenArcaneMenu = "OpenArcaneMenu",
  CloseArcaneMenu = "CloseArcaneMenu"
}
