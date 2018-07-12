import { MARKETProtocolConfig } from './types';

export const constants = {
  MAX_DIGITS_IN_UNSIGNED_256_INT: 78,
  NETWORK_ID_RINKEBY: 4,
  NETWORK_ID_TRUFFLE: 4447,
  PROVIDER_URL_TRUFFLE: 'http://localhost:9545',
  PROVIDER_URL_RINKEBY: 'https://rinkeby.infura.io/cbHh1p8RT4Q6E97F4gVi',
  NULL_ADDRESS: '0x0000000000000000000000000000000000000000'
};

/**
 * networkId: The id of the underlying ethereum network your provider is connected to.
 * (1-mainnet, 3-ropsten, 4-rinkeby, 42-kovan, 50-testrpc)
 * gasPrice: Gas price to use with every transaction
 * marketContractRegistryAddress: The address of the MARKET Protocol registry to use
 * marketContractFactoryAddress: The address of the MARKET Protocol factory to use
 * marketCollateralPoolFactoryAddress: The address of a
 * MARKET Protocol collateral pool factory to use.
 * mktTokenAddress: The address of the MARKET Protocol token (MKT) to use
 */
export const configTruffle: MARKETProtocolConfig = {
  networkId: constants.NETWORK_ID_TRUFFLE
};

export const configRinkeby: MARKETProtocolConfig = {
  networkId: constants.NETWORK_ID_RINKEBY,
  marketContractRegistryAddress: '0x4bc60737323fd065d99c726ca2c0fad0d1077a60',
  marketContractFactoryAddress: '0x9d904712cf622d3bfeacb5282a51a0ad1418f9a3',
  marketCollateralPoolFactoryAddress: '0x011176b12c962b3d65049b0b8358d8e9132223f1',
  marketTokenAddress: '0xffa7d6c01f8b40eb26a5ffbde9d6b5daeebb980e'
};
