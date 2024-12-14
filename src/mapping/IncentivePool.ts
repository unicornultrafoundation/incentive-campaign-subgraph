import { Stake,UnStake,Harvest} from '../../generated/IncentivePoolPublic/IncentivePool';
import { LegacyUnStake } from '../../generated/IncentivePoolPublic2/IncentivePool2';

import { Address, BigInt, log } from "@graphprotocol/graph-ts"
import {TransactionPool} from '../../generated/schema';
import {generateCombineKey, updateStatisticsDashboard, updateStatisticsUser, isAddressInArray } from "../utils";
import { ContractAddress, DashBoardStatistics, UserStatistics } from '../enum';

export function handleStake(event: Stake): void{
    log.info("================================ {}", [event.address.toHexString()]);
    let id = generateCombineKey([event.transaction.hash.toHexString(),'STAKE'])
    let tx = TransactionPool.load(id);
    if(!tx) {
        tx = new TransactionPool(id);
        tx.contract = event.address.toHexString();
        tx.from = event.address.toHexString();
        tx.to = event.params.user.toHexString();
        tx.txHash = event.transaction.hash.toHexString();
        tx.event = 'STAKE';
        tx.amount = event.params.amount;
        tx.timestamp = event.block.timestamp;
    }
    tx.save();
    // ==========User =============
    updateStatisticsUser(event.params.user,UserStatistics.amount,event.params.amount, event.address);
    updateStatisticsUser(event.params.user,UserStatistics.amountStake,event.params.amount, event.address);
    updateStatisticsUser(event.params.user,UserStatistics.totalStake,BigInt.fromI32(1), event.address);
    updateStatisticsUser(event.params.user,UserStatistics.totalTransaction,BigInt.fromI32(1), event.address);
    // ==========Dashboard =============
    updateStatisticsDashboard(DashBoardStatistics.totalTransaction,BigInt.fromI32(1));
    updateStatisticsDashboard(DashBoardStatistics.amount,event.params.amount);
    updateStatisticsDashboard(DashBoardStatistics.amountStake,event.params.amount);
    updateStatisticsDashboard(DashBoardStatistics.totalStake,BigInt.fromI32(1));
    if(isAddressInArray(event.address.toHexString().toLowerCase(), ContractAddress.publicPoolAddress)){
        // ==========User Public=============
        updateStatisticsUser(event.params.user,UserStatistics.amountPublic,event.params.amount, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.amountStakePublic,event.params.amount, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalStakePublic,BigInt.fromI32(1), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalTransactionPublic,BigInt.fromI32(1), event.address);
        // ==========Dashboard Public=============
        updateStatisticsDashboard(DashBoardStatistics.totalTxPublic,BigInt.fromI32(1));
        updateStatisticsDashboard(DashBoardStatistics.amountPublic, event.params.amount)
        updateStatisticsDashboard(DashBoardStatistics.amountStakePublic, event.params.amount)
        updateStatisticsDashboard(DashBoardStatistics.totalStakePublic,BigInt.fromI32(1));
    }
    if(isAddressInArray(event.address.toHexString().toLowerCase(), ContractAddress.bitgetPoolAddress)){
        // ==========User Bitget=============
        updateStatisticsUser(event.params.user,UserStatistics.amountBitget,event.params.amount, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.amountStakeBitget,event.params.amount, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalStakeBitget,BigInt.fromI32(1), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalTransactionBitget,BigInt.fromI32(1), event.address);
        // ==========Dashboard Bitget=============
        updateStatisticsDashboard(DashBoardStatistics.totalTxBitget,BigInt.fromI32(1));
        updateStatisticsDashboard(DashBoardStatistics.amountBitget, event.params.amount)
        updateStatisticsDashboard(DashBoardStatistics.amountStakeBitget, event.params.amount)
        updateStatisticsDashboard(DashBoardStatistics.totalStakeBitget,BigInt.fromI32(1));
    }
}


export function handleUnStake(event: UnStake): void {
    let id = generateCombineKey([event.transaction.hash.toHexString(),'UNSTAKE'])
    let tx = TransactionPool.load(id);
    if(!tx) {
        tx = new TransactionPool(id);
        tx.contract = event.address.toHexString();
        tx.from = event.address.toHexString();
        tx.to = event.params.user.toHexString();
        tx.txHash = event.transaction.hash.toHexString();
        tx.event = 'UNSTAKE';
        tx.amount = event.params.amount;
        tx.timestamp = event.block.timestamp;
    }
    tx.save();
    // ==========User =============
    updateStatisticsUser(event.params.user,UserStatistics.amount,event.params.amount.neg(), event.address);
    updateStatisticsUser(event.params.user,UserStatistics.amountUnStake,event.params.amount, event.address);
    updateStatisticsUser(event.params.user,UserStatistics.totalUnStake,BigInt.fromI32(1), event.address);
    updateStatisticsUser(event.params.user,UserStatistics.totalTransaction,BigInt.fromI32(1), event.address);
    // ==========Dashboard =============
    updateStatisticsDashboard(DashBoardStatistics.totalTransaction,BigInt.fromI32(1));
    updateStatisticsDashboard(DashBoardStatistics.amountUnStake,event.params.amount);
    updateStatisticsDashboard(DashBoardStatistics.totalUnStake,BigInt.fromI32(1));
    if(isAddressInArray(event.address.toHexString().toLowerCase(), ContractAddress.publicPoolAddress)){
        // ==========User Public=============
        updateStatisticsUser(event.params.user,UserStatistics.amountPublic,event.params.amount.neg(), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.amountUnStakePublic,event.params.amount, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalUnStakePublic,BigInt.fromI32(1), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalTransactionPublic,BigInt.fromI32(1), event.address);
        // ==========Dashboard Public=============
        updateStatisticsDashboard(DashBoardStatistics.totalTxPublic,BigInt.fromI32(1));
        updateStatisticsDashboard(DashBoardStatistics.amountUnStakePublic, event.params.amount)
        updateStatisticsDashboard(DashBoardStatistics.totalUnStakePublic,BigInt.fromI32(1));
    }
    if(isAddressInArray(event.address.toHexString().toLowerCase(), ContractAddress.bitgetPoolAddress)){
        // ==========User Bitget=============
        updateStatisticsUser(event.params.user,UserStatistics.amountBitget,event.params.amount.neg(), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.amountUnStakeBitget,event.params.amount, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalUnStakeBitget,BigInt.fromI32(1), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalTransactionBitget,BigInt.fromI32(1), event.address);
        // ==========Dashboard Bitget=============
        updateStatisticsDashboard(DashBoardStatistics.totalTxBitget,BigInt.fromI32(1));
        updateStatisticsDashboard(DashBoardStatistics.amountUnStakeBitget, event.params.amount)
        updateStatisticsDashboard(DashBoardStatistics.totalUnStakeBitget,BigInt.fromI32(1));
    }
}

// Claim
export function handleHarvest(event: Harvest) : void{
    let id = generateCombineKey([event.transaction.hash.toHexString(),'HARVEST'])
    let tx = TransactionPool.load(id);
    if(!tx) {
        tx = new TransactionPool(id);
        tx.contract = event.address.toHexString();
        tx.from = event.address.toHexString();
        tx.to = event.params.user.toHexString();
        tx.txHash = event.transaction.hash.toHexString();
        tx.event = 'HARVEST';
        tx.amount = event.params.u2uRewards;
        tx.timestamp = event.block.timestamp;
    }
    tx.save();
    // ==========User =============
    updateStatisticsUser(event.params.user,UserStatistics.amountHarvest,event.params.u2uRewards, event.address);
    updateStatisticsUser(event.params.user,UserStatistics.totalHarvest,BigInt.fromI32(1), event.address);
    updateStatisticsUser(event.params.user,UserStatistics.totalTransaction,BigInt.fromI32(1), event.address);
    // ==========Dashboard =============
    updateStatisticsDashboard(DashBoardStatistics.totalTransaction,BigInt.fromI32(1));
    updateStatisticsDashboard(DashBoardStatistics.amountHarvest,event.params.u2uRewards);
    updateStatisticsDashboard(DashBoardStatistics.totalHarvest,BigInt.fromI32(1));
    if(isAddressInArray(event.address.toHexString().toLowerCase(), ContractAddress.publicPoolAddress)){
        // ==========User Public=============
        updateStatisticsUser(event.params.user,UserStatistics.amountHarvestPublic,event.params.u2uRewards, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalHarvestPublic,BigInt.fromI32(1), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalTransactionPublic,BigInt.fromI32(1), event.address);
        // ==========Dashboard Public=============
        updateStatisticsDashboard(DashBoardStatistics.totalTxPublic,BigInt.fromI32(1));
        updateStatisticsDashboard(DashBoardStatistics.amountHarvestPublic, event.params.u2uRewards)
        updateStatisticsDashboard(DashBoardStatistics.totalHarvestPublic,BigInt.fromI32(1));
    }
    if(isAddressInArray(event.address.toHexString().toLowerCase(), ContractAddress.bitgetPoolAddress)){
        // ==========User Bitget=============
        updateStatisticsUser(event.params.user,UserStatistics.amountHarvestBitget,event.params.u2uRewards, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalHarvestBitget,BigInt.fromI32(1), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalTransactionBitget,BigInt.fromI32(1), event.address);
        // ==========Dashboard Bitget=============
        updateStatisticsDashboard(DashBoardStatistics.totalTxBitget,BigInt.fromI32(1));
        updateStatisticsDashboard(DashBoardStatistics.amountHarvestBitget, event.params.u2uRewards)
        updateStatisticsDashboard(DashBoardStatistics.totalStakeBitget,BigInt.fromI32(1));
    }
}

export function handlerLegacyUnStake(event: LegacyUnStake) : void {
    let id = generateCombineKey([event.transaction.hash.toHexString(),'UNSTAKELEGACY'])
    let tx = TransactionPool.load(id);
    if(!tx) {
        tx = new TransactionPool(id);
        tx.contract = event.address.toHexString();
        tx.from = event.address.toHexString();
        tx.to = event.params.user.toHexString();
        tx.txHash = event.transaction.hash.toHexString();
        tx.event = 'UNSTAKELEGACY';
        tx.amount = event.params.amount;
        tx.timestamp = event.block.timestamp;
    }
    tx.save();
    // ==========User =============
    updateStatisticsUser(event.params.user,UserStatistics.amount,event.params.amount.neg(), event.address);
    updateStatisticsUser(event.params.user,UserStatistics.amountUnStake,event.params.amount, event.address);
    updateStatisticsUser(event.params.user,UserStatistics.totalUnStake,BigInt.fromI32(1), event.address);
    updateStatisticsUser(event.params.user,UserStatistics.totalTransaction,BigInt.fromI32(1), event.address);
    // ==========Dashboard =============
    updateStatisticsDashboard(DashBoardStatistics.totalTransaction,BigInt.fromI32(1));
    updateStatisticsDashboard(DashBoardStatistics.amountUnStake,event.params.amount);
    updateStatisticsDashboard(DashBoardStatistics.totalUnStake,BigInt.fromI32(1));
    if(isAddressInArray(event.address.toHexString().toLowerCase(), ContractAddress.publicPoolAddress)){
        // ==========User Public=============
        updateStatisticsUser(event.params.user,UserStatistics.amountPublic,event.params.amount.neg(), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.amountUnStakePublic,event.params.amount, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalUnStakePublic,BigInt.fromI32(1), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalTransactionPublic,BigInt.fromI32(1), event.address);
        // ==========Dashboard Public=============
        updateStatisticsDashboard(DashBoardStatistics.totalTxPublic,BigInt.fromI32(1));
        updateStatisticsDashboard(DashBoardStatistics.amountUnStakePublic, event.params.amount)
        updateStatisticsDashboard(DashBoardStatistics.totalUnStakePublic,BigInt.fromI32(1));
    }
    // if(event.address.toHexString().toLowerCase() == ContractAddress.bitgetPoolAddress.toLowerCase()){
    if(isAddressInArray(event.address.toHexString().toLowerCase(), ContractAddress.bitgetPoolAddress)){
        // ==========User Bitget=============
        updateStatisticsUser(event.params.user,UserStatistics.amountBitget,event.params.amount.neg(), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.amountUnStakeBitget,event.params.amount, event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalUnStakeBitget,BigInt.fromI32(1), event.address);
        updateStatisticsUser(event.params.user,UserStatistics.totalTransactionBitget,BigInt.fromI32(1), event.address);
        // ==========Dashboard Bitget=============
        updateStatisticsDashboard(DashBoardStatistics.totalTxBitget,BigInt.fromI32(1));
        updateStatisticsDashboard(DashBoardStatistics.amountUnStakeBitget, event.params.amount)
        updateStatisticsDashboard(DashBoardStatistics.totalUnStakeBitget,BigInt.fromI32(1));
    }
}