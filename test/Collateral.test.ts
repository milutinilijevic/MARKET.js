import { BigNumber } from 'bignumber.js';
import Web3 from 'web3';

// Types
import { ERC20, MarketContract, MARKETProtocolConfig } from '@marketprotocol/types';

import { Market } from '../src';
import { constants } from '../src/constants';

import {
  depositCollateralAsync,
  getUserAccountBalanceAsync,
  settleAndCloseAsync,
  withdrawCollateralAsync
} from '../src/lib/Collateral';

/**
 * Collateral
 */
describe('Collateral', () => {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
  let maker: string;
  let contractAddresses: string[];
  let marketContractAddress: string;
  let deployedMarketContract: MarketContract;
  let collateralPoolAddress: string;
  let collateralTokenAddress: string;
  let market: Market;

  beforeAll(async () => {
    maker = web3.eth.accounts[0];
    const config: MARKETProtocolConfig = {
      networkId: constants.NETWORK_ID_TRUFFLE
    };
    market = new Market(web3.currentProvider, config);
    contractAddresses = await market.marketContractRegistry.getAddressWhiteList;
    marketContractAddress = contractAddresses[0];
    deployedMarketContract = await MarketContract.createAndValidate(web3, marketContractAddress);
    collateralPoolAddress = await deployedMarketContract.MARKET_COLLATERAL_POOL_ADDRESS;
    collateralTokenAddress = await deployedMarketContract.COLLATERAL_TOKEN_ADDRESS;

    const tokenBalance: BigNumber = await market.erc20TokenContractWrapper.getBalanceAsync(
      collateralTokenAddress,
      maker
    );

    await market.erc20TokenContractWrapper.setAllowanceAsync(
      collateralTokenAddress,
      collateralPoolAddress,
      tokenBalance,
      { from: maker }
    );
  });

  it('Balance after depositCollateralAsync call is correct', async () => {
    const depositAmount: BigNumber = new BigNumber(10);
    const oldBalance: BigNumber = await market.erc20TokenContractWrapper.getBalanceAsync(
      collateralTokenAddress,
      collateralPoolAddress
    );

    await market.depositCollateralAsync(collateralPoolAddress, depositAmount, {
      from: maker
    });

    const newBalance: BigNumber = await market.erc20TokenContractWrapper.getBalanceAsync(
      collateralTokenAddress,
      collateralPoolAddress
    );

    expect(newBalance.minus(oldBalance)).toEqual(depositAmount);
  });

  it('getUserAccountBalanceAsync returns correct user balance', async () => {
    const oldUserBalance: BigNumber = await getUserAccountBalanceAsync(
      web3.currentProvider,
      collateralPoolAddress,
      maker
    );

    const depositAmount: BigNumber = new BigNumber(100);
    await market.depositCollateralAsync(collateralPoolAddress, depositAmount, {
      from: maker
    });
    const newUserBalance: BigNumber = await getUserAccountBalanceAsync(
      web3.currentProvider,
      collateralPoolAddress,
      maker
    );
    expect(newUserBalance.minus(oldUserBalance)).toEqual(depositAmount);
  });

  it('withdrawCollateralAsync should withdraw correct amount', async () => {
    const withdrawAmount: BigNumber = new BigNumber(10);
    const depositAmount: BigNumber = new BigNumber(100);
    await market.depositCollateralAsync(collateralPoolAddress, depositAmount, {
      from: maker
    });

    const oldBalance: BigNumber = await market.erc20TokenContractWrapper.getBalanceAsync(
      collateralTokenAddress,
      maker
    );

    await withdrawCollateralAsync(web3.currentProvider, collateralPoolAddress, withdrawAmount, {
      from: maker
    });
    const newBalance: BigNumber = await market.erc20TokenContractWrapper.getBalanceAsync(
      collateralTokenAddress,
      maker
    );

    expect(oldBalance.plus(withdrawAmount)).toEqual(newBalance);
  });

  it('Settle and Close should fail', async () => {
    try {
      await settleAndCloseAsync(web3.currentProvider, collateralPoolAddress, { from: maker });
    } catch (e) {
      expect(e.toString()).toMatch('revert');
    }
  });
});
