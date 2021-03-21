import { SetPlatform, InitStaticData, SetModule } from "./actionsType";

export function setPlatform(elem: any) {
  return {
    type: SetPlatform,
    elem
  }
}

export function initStaticData(elem: any) {
  return {
    type: InitStaticData,
    elem
  }
}

export function setModule(elem: any) {
  return {
    type: SetModule,
    elem
  }
}