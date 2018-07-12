import { Artifact } from '@marketprotocol/types';

const OrderLibArtifact = require('../build/contracts/OrderLib.json');
const MathLibArtifact = require('../build/contracts/MathLib.json');
const MarketTokenArtifact = require('../build/contracts/MarketToken.json');
const MarketContractRegistryArtifact = require('../build/contracts/MarketContractRegistry.json');
const MarketContractFactoryOraclize = require('../build/contracts/MarketContractFactoryOraclize.json');
const MarketCollateralPoolFactory = require('../build/contracts/MarketCollateralPoolFactory.json');

export const artifacts = {
  OrderLibArtifact: OrderLibArtifact as Artifact,
  MathLibArtifact: MathLibArtifact as Artifact,
  MarketTokenArtifact: MarketTokenArtifact as Artifact,
  MarketContractRegistryArtifact: MarketContractRegistryArtifact as Artifact,
  MarketContractFactoryOraclizeArtifact: MarketContractFactoryOraclize as Artifact,
  MarketCollateralPoolFactoryArtifact: MarketCollateralPoolFactory as Artifact
};
