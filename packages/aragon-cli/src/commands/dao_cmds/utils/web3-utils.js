// Check address equality without checksums
export function addressesEqual(first, second) {
  first = first && first.toLowerCase()
  second = second && second.toLowerCase()
  return first === second
}

export function etherToWei(ether) {
  return ether * 10e17
}
