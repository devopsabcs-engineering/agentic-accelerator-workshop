// INTENTIONAL-FINOPS-ISSUE: Oversized SKU parameters as defaults
// Default values use premium tiers when basic tiers would suffice

@description('App Service Plan SKU name')
@allowed([
  'F1'
  'B1'
  'B2'
  'S1'
  'S2'
  'P1v3'
  'P2v3'
  'P3v3'
])
// INTENTIONAL-FINOPS-ISSUE: Default is Premium V3 instead of Basic
param appServiceSkuName string = 'P1v3'

@description('App Service Plan SKU tier')
param appServiceSkuTier string = 'PremiumV3'

@description('App Service Plan instance count')
@minValue(1)
@maxValue(10)
// INTENTIONAL-FINOPS-ISSUE: Default 3 instances for a sample app
param appServiceCapacity int = 3

@description('Storage account SKU')
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_RAGRS'
  'Premium_LRS'
])
// INTENTIONAL-FINOPS-ISSUE: GRS replication for non-critical sample data
param storageSkuName string = 'Standard_GRS'

@description('SQL Database SKU name')
@allowed([
  'Basic'
  'S0'
  'S1'
  'GP_Gen5_2'
  'GP_Gen5_4'
  'GP_Gen5_8'
  'BC_Gen5_2'
])
// INTENTIONAL-FINOPS-ISSUE: GP_Gen5_8 (8 vCores) for a sample app with minimal data
param sqlDatabaseSkuName string = 'GP_Gen5_8'

@description('SQL Database tier')
param sqlDatabaseTier string = 'GeneralPurpose'

@description('Estimated monthly cost (USD) - not enforced, documentation only')
// INTENTIONAL-FINOPS-ISSUE: No budget enforcement mechanism
// Estimated costs:
//   App Service P1v3 x3: ~$420/month
//   Storage GRS: ~$50/month
//   SQL GP_Gen5_8: ~$800/month
//   Total: ~$1,270/month
// A right-sized deployment would cost ~$30/month:
//   App Service B1 x1: ~$13/month
//   Storage LRS: ~$2/month
//   SQL Basic: ~$5/month
var estimatedMonthlyCostUsd = 1270
