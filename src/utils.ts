import { BigInt } from "@graphprotocol/graph-ts/index"

  export function generateCombineKey(keys: string[]): string {
    return keys.join('-');
  }
