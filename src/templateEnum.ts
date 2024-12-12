export namespace ContractAddress {
    export const ZERO = "0x0000000000000000000000000000000000000000"
    export const listPool = ["{{pool1.address}}","{{pool2.address}}"]
    export const publicPoolAddress = ["{{incentivepoolpublic.address}}","{{incentivepoolpublic2.address}}"]
    export const bitgetPoolAddress = ["{{incentivepoolbitget.address}}"]

}

export enum UserStatistics{
    amount, 
    amountPublic, 
    amountBitget, 
  
    amountStake, 
    amountStakePublic, 
    amountStakeBitget, 
  
    amountUnStake, 
    amountUnStakePublic, 
    amountUnStakeBitget, 
  
    amountHarvest, 
    amountHarvestPublic, 
    amountHarvestBitget, 
  
    totalTransaction, 
    totalTransactionPublic, 
    totalTransactionBitget, 
  
    totalStake, 
    totalStakePublic, 
    totalStakeBitget, 

    totalUnStake, 
    totalUnStakePublic, 
    totalUnStakeBitget, 
  
    totalHarvest, 
    totalHarvestPublic, 
    totalHarvestBitget, 
}

export enum DashBoardStatistics{
    totalUser,
    totalUserPublic,
    totalUserBitget,
  
    totalTransaction,
    totalTxBitget,
    totalTxPublic,
  
    amount,
    amountBitget,
    amountPublic,
    
    totalStake,
    totalStakePublic,
    totalStakeBitget,
  
    totalUnStake,
    totalUnStakePublic,
    totalUnStakeBitget,
  
    totalHarvest,
    totalHarvestPublic,
    totalHarvestBitget,
  
    amountStake,
    amountStakePublic,
    amountStakeBitget,
  
    amountUnStake,
    amountUnStakePublic,
    amountUnStakeBitget,
  
    amountHarvest,
    amountHarvestPublic,
    amountHarvestBitget,
}