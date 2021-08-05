function nextMassValue(mass: Array<any>, index: number) {
  let idx = index + 1
  return mass.length === idx ? 0 : idx

}

function prevMassValue(mass: Array<any>, index: number) {
  let idx = index - 1
  return idx < 0 ? mass.length : idx
}

