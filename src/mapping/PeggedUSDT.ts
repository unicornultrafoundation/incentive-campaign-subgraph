// import { Transfer } from '';
import {DEAD, ZERO} from "../const";
import {generateCombineKey } from "../utils";
import { log } from "@graphprotocol/graph-ts";
import {  Transfer } from "../../generated/PeggedUSDT/PeggedUSDT";
import { Transaction } from "../../generated/schema";

import { BigInt } from "@graphprotocol/graph-ts"
import { ContractAddress } from '../enum';

export function handleTransfer(event: Transfer): void {
    if(!ContractAddress.listPool.includes(event.params.from.toHexString())){
        return;
    }
    const id = generateCombineKey([event.address.toHexString(), event.params.to.toHexString(), event.block.timestamp.toString()]);
    let tx = Transaction.load(id);
    if(!tx){
        tx = new Transaction(id);
        tx.amount = event.params.value;
        tx.contract = event.address.toHexString();
        tx.from = event.params.from.toHexString();
        tx.to = event.params.to.toHexString();
        tx.timestamp = event.block.timestamp;
        tx.txHash = event.transaction.hash.toHexString();
    }
    tx.save();
}