import { Address, BigInt } from "@graphprotocol/graph-ts/index"
import { Dashboard, RecordJoin, User,  } from "../generated/schema";
import { ContractAddress, DashBoardStatistics, UserStatistics } from "./enum";

export function generateCombineKey(keys: string[]): string {
  return keys.join('-');
}

export function fetchOrCreateUser(address: Address, AddressPool: Address): User {
  let userId = address.toHex();
  let user = User.load(userId);
  if (!user) {
      user = new User(userId);
      user.address = address.toHexString();
      user.amountStake = BigInt.fromI32(0);
      user.amountStakePublic = BigInt.fromI32(0);
      user.amountStakeBitget = BigInt.fromI32(0);

      user.amountUnStake = BigInt.fromI32(0);
      user.amountUnStakePublic = BigInt.fromI32(0);
      user.amountUnStakeBitget = BigInt.fromI32(0);

      user.amountHarvest = BigInt.fromI32(0);
      user.amountHarvestPublic = BigInt.fromI32(0);
      user.amountHarvestBitget = BigInt.fromI32(0);

      user.totalTransaction = BigInt.fromI32(0);
      user.totalTransactionPublic = BigInt.fromI32(0);
      user.totalTransactionBitget = BigInt.fromI32(0);

      user.totalStake = BigInt.fromI32(0);
      user.totalStakePublic = BigInt.fromI32(0);
      user.totalStakeBitget = BigInt.fromI32(0);

      user.totalUnStake = BigInt.fromI32(0);
      user.totalUnStakePublic = BigInt.fromI32(0);
      user.totalUnStakeBitget = BigInt.fromI32(0);

      user.totalHarvest = BigInt.fromI32(0);
      user.totalHarvestPublic = BigInt.fromI32(0);
      user.totalHarvestBitget = BigInt.fromI32(0);
      

      user.amount = BigInt.fromI32(0)
      user.amountPublic = BigInt.fromI32(0)
      user.amountBitget = BigInt.fromI32(0)

      user.save();
      updateStatisticsDashboard(DashBoardStatistics.totalUser, BigInt.fromI32(1));
  }
  let idJoin = generateCombineKey([AddressPool.toHexString(),userId]);
  let recordJoin = RecordJoin.load(idJoin);
  if(!recordJoin){
    recordJoin = new RecordJoin(idJoin);
    recordJoin.save()
    if (isAddressInArray( AddressPool.toHexString().toLowerCase(), ContractAddress.publicPoolAddress)) {
      updateStatisticsDashboard(DashBoardStatistics.totalUserPublic, BigInt.fromI32(1));
    }
    if (isAddressInArray( AddressPool.toHexString().toLowerCase(), ContractAddress.bitgetPoolAddress)) {
      updateStatisticsDashboard(DashBoardStatistics.totalUserBitget, BigInt.fromI32(1));
    }
  }
  return user as User;
}

export function fetchOrCreateDashBoard(): Dashboard{
  const key = 'dashboard';
  let db = Dashboard.load(key);
  if(!db){
    db = new Dashboard(key);
    db.totalUser = BigInt.fromI32(0);
    db.totalUserPublic = BigInt.fromI32(0);
    db.totalUserBitget = BigInt.fromI32(0);
    //// ===========Transaction============
    db.totalTransaction = BigInt.fromI32(0)
    db.totalTxBitget = BigInt.fromI32(0)
    db.totalTxPublic = BigInt.fromI32(0)
    //// ===========Amount============
    db.amount = BigInt.fromI32(0)
    db.amountBitget = BigInt.fromI32(0)
    db.amountPublic = BigInt.fromI32(0)
    //// ===========Count STAKE============
    db.totalStake = BigInt.fromI32(0)
    db.totalStakePublic = BigInt.fromI32(0)
    db.totalStakeBitget = BigInt.fromI32(0)
    //// ===========Amount STAKE============
    db.amountStake = BigInt.fromI32(0)
    db.amountStakePublic = BigInt.fromI32(0)
    db.amountStakeBitget = BigInt.fromI32(0)
    //// ===========Count UNSTAKE============
    db.totalUnStake = BigInt.fromI32(0)
    db.totalUnStakePublic = BigInt.fromI32(0)
    db.totalUnStakeBitget = BigInt.fromI32(0)
    //// ===========Amount UNSTAKE============
    db.amountUnStake = BigInt.fromI32(0)
    db.amountUnStakePublic = BigInt.fromI32(0)
    db.amountUnStakeBitget = BigInt.fromI32(0)
    //// ===========Count HARVEST============
    db.totalHarvest = BigInt.fromI32(0)
    db.totalHarvestPublic = BigInt.fromI32(0)
    db.totalHarvestBitget = BigInt.fromI32(0)
    //// ===========Amount HARVEST============
    db.amountHarvest = BigInt.fromI32(0)
    db.amountHarvestPublic = BigInt.fromI32(0)
    db.amountHarvestBitget = BigInt.fromI32(0)
  }
  return db as Dashboard
}

export function updateStatisticsUser(Address: Address, type: UserStatistics, amount: BigInt, AddressPool: Address): void {
  let user = fetchOrCreateUser(Address, AddressPool);

  if (type == UserStatistics.amount) {
    user.amount = user.amount.plus(amount);
  }
  if (type == UserStatistics.amountPublic) {
    user.amountPublic = user.amountPublic.plus(amount);
  }
  if (type == UserStatistics.amountBitget) {
    user.amountBitget = user.amountBitget.plus(amount);
  }
  if (type == UserStatistics.amountStake) {
    user.amountStake = user.amountStake.plus(amount);
  }
  if (type == UserStatistics.amountStakePublic) {
    user.amountStakePublic = user.amountStakePublic.plus(amount);
  }
  if (type == UserStatistics.amountStakeBitget) {
    user.amountStakeBitget = user.amountStakeBitget.plus(amount);
  }
  if (type == UserStatistics.amountUnStake) {
    user.amountUnStake = user.amountUnStake.plus(amount);
  }
  if (type == UserStatistics.amountUnStakePublic) {
    user.amountUnStakePublic = user.amountUnStakePublic.plus(amount);
  }
  if (type == UserStatistics.amountUnStakeBitget) {
    user.amountUnStakeBitget = user.amountUnStakeBitget.plus(amount);
  }
  if (type == UserStatistics.amountHarvest) {
    user.amountHarvest = user.amountHarvest.plus(amount);
  }
  if (type == UserStatistics.amountHarvestPublic) {
    user.amountHarvestPublic = user.amountHarvestPublic.plus(amount);
  }
  if (type == UserStatistics.amountHarvestBitget) {
    user.amountHarvestBitget = user.amountHarvestBitget.plus(amount);
  }
  if (type == UserStatistics.totalTransaction) {
    user.totalTransaction = user.totalTransaction.plus(amount);
  }
  if (type == UserStatistics.totalTransactionPublic) {
    user.totalTransactionPublic = user.totalTransactionPublic.plus(amount);
  }
  if (type == UserStatistics.totalTransactionBitget) {
    user.totalTransactionBitget = user.totalTransactionBitget.plus(amount);
  }
  if (type == UserStatistics.totalStake) {
    user.totalStake = user.totalStake.plus(amount);
  }
  if (type == UserStatistics.totalStakePublic) {
    user.totalStakePublic = user.totalStakePublic.plus(amount);
  }
  if (type == UserStatistics.totalStakeBitget) {
    user.totalStakeBitget = user.totalStakeBitget.plus(amount);
  }
  if (type == UserStatistics.totalUnStake) {
    user.totalUnStake = user.totalUnStake.plus(amount);
  }
  if (type == UserStatistics.totalUnStakePublic) {
    user.totalUnStakePublic = user.totalUnStakePublic.plus(amount);
  }
  if (type == UserStatistics.totalUnStakeBitget) {
    user.totalUnStakeBitget = user.totalUnStakeBitget.plus(amount);
  }
  if (type == UserStatistics.totalHarvest) {
    user.totalHarvest = user.totalHarvest.plus(amount);
  }
  if (type == UserStatistics.totalHarvestPublic) {
    user.totalHarvestPublic = user.totalHarvestPublic.plus(amount);
  }
  if (type == UserStatistics.totalHarvestBitget) {
    user.totalHarvestBitget = user.totalHarvestBitget.plus(amount);
  }
  user.save();
}


export function updateStatisticsDashboard(type: DashBoardStatistics, amount: BigInt): void {
  let dashboard = fetchOrCreateDashBoard();

  if (type == DashBoardStatistics.totalUser) {
    dashboard.totalUser = dashboard.totalUser.plus(amount);
  }
  if (type == DashBoardStatistics.totalUserPublic) {
    dashboard.totalUserPublic = dashboard.totalUserPublic.plus(amount);
  }
  if (type == DashBoardStatistics.totalUserBitget) {
    dashboard.totalUserBitget = dashboard.totalUserBitget.plus(amount);
  }
  if (type == DashBoardStatistics.totalTransaction) {
    dashboard.totalTransaction = dashboard.totalTransaction.plus(amount);
  }
  if (type == DashBoardStatistics.totalTxBitget) {
    dashboard.totalTxBitget = dashboard.totalTxBitget.plus(amount);
  }
  if (type == DashBoardStatistics.totalTxPublic) {
    dashboard.totalTxPublic = dashboard.totalTxPublic.plus(amount);
  }
  if (type == DashBoardStatistics.amount) {
    dashboard.amount = dashboard.amount.plus(amount);
  }
  if (type == DashBoardStatistics.amountBitget) {
    dashboard.amountBitget = dashboard.amountBitget.plus(amount);
  }
  if (type == DashBoardStatistics.amountPublic) {
    dashboard.amountPublic = dashboard.amountPublic.plus(amount);
  }
  if (type == DashBoardStatistics.totalStake) {
    dashboard.totalStake = dashboard.totalStake.plus(amount);
  }
  if (type == DashBoardStatistics.totalStakePublic) {
    dashboard.totalStakePublic = dashboard.totalStakePublic.plus(amount);
  }
  if (type == DashBoardStatistics.totalStakeBitget) {
    dashboard.totalStakeBitget = dashboard.totalStakeBitget.plus(amount);
  }
  if (type == DashBoardStatistics.totalUnStake) {
    dashboard.totalUnStake = dashboard.totalUnStake.plus(amount);
  }
  if (type == DashBoardStatistics.totalUnStakePublic) {
    dashboard.totalUnStakePublic = dashboard.totalUnStakePublic.plus(amount);
  }
  if (type == DashBoardStatistics.totalUnStakeBitget) {
    dashboard.totalUnStakeBitget = dashboard.totalUnStakeBitget.plus(amount);
  }
  if (type == DashBoardStatistics.totalHarvest) {
    dashboard.totalHarvest = dashboard.totalHarvest.plus(amount);
  }
  if (type == DashBoardStatistics.totalHarvestPublic) {
    dashboard.totalHarvestPublic = dashboard.totalHarvestPublic.plus(amount);
  }
  if (type == DashBoardStatistics.totalHarvestBitget) {
    dashboard.totalHarvestBitget = dashboard.totalHarvestBitget.plus(amount);
  }
  if (type == DashBoardStatistics.amountStake) {
    dashboard.amountStake = dashboard.amountStake.plus(amount);
  }
  if (type == DashBoardStatistics.amountStakePublic) {
    dashboard.amountStakePublic = dashboard.amountStakePublic.plus(amount);
  }
  if (type == DashBoardStatistics.amountStakeBitget) {
    dashboard.amountStakeBitget = dashboard.amountStakeBitget.plus(amount);
  }
  if (type == DashBoardStatistics.amountUnStake) {
    dashboard.amountUnStake = dashboard.amountUnStake.plus(amount);
  }
  if (type == DashBoardStatistics.amountUnStakePublic) {
    dashboard.amountUnStakePublic = dashboard.amountUnStakePublic.plus(amount);
  }
  if (type == DashBoardStatistics.amountUnStakeBitget) {
    dashboard.amountUnStakeBitget = dashboard.amountUnStakeBitget.plus(amount);
  }
  if (type == DashBoardStatistics.amountHarvest) {
    dashboard.amountHarvest = dashboard.amountHarvest.plus(amount);
  }
  if (type == DashBoardStatistics.amountHarvestPublic) {
    dashboard.amountHarvestPublic = dashboard.amountHarvestPublic.plus(amount);
  }
  if (type == DashBoardStatistics.amountHarvestBitget) {
    dashboard.amountHarvestBitget = dashboard.amountHarvestBitget.plus(amount);
  }

  dashboard.save();
}


export function isAddressInArray(address: string, addressArray: Array<string>): boolean {
  const normalizedAddress = address.toLowerCase();
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].toLowerCase() == normalizedAddress) {
      return true;
    }
  }
  return false;
}
