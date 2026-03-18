// INTENTIONAL-FINOPS-ISSUE: Missing required tags on all resources
// All resources should have ProjectName, Environment, and CostCenter tags
// INTENTIONAL-VULNERABILITY: Multiple security misconfigurations

@description('Azure region for all resources')
param location string = resourceGroup().location

@description('Application name prefix')
param appName string = 'devsecops-sample'

// INTENTIONAL-VULNERABILITY: SQL admin password as plaintext parameter
// Should use Azure Key Vault reference: @secure() with Key Vault
@description('SQL Server administrator password')
param sqlAdminPassword string = 'P@ssw0rd123!'

param skuName string = 'P1v3'
param storageSku string = 'Standard_GRS'
param sqlSkuName string = 'GP_Gen5_8'

// INTENTIONAL-FINOPS-ISSUE: Oversized App Service Plan - Premium V3 for a sample app
// A Basic (B1) or Free (F1) tier would suffice for this workload
resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: '${appName}-plan'
  location: location
  sku: {
    // INTENTIONAL-FINOPS-ISSUE: Oversized SKU - P1v3 costs ~$140/month vs B1 at ~$13/month
    name: skuName
    tier: 'PremiumV3'
    capacity: 3
  }
  properties: {
    reserved: true
  }
  // INTENTIONAL-FINOPS-ISSUE: No tags defined
}

// INTENTIONAL-VULNERABILITY: App Service with insecure configuration
resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: '${appName}-web'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      // INTENTIONAL-VULNERABILITY: No HTTPS enforcement
      // httpsOnly should be true
      linuxFxVersion: 'NODE|18-lts'
      minTlsVersion: '1.0' // INTENTIONAL-VULNERABILITY: TLS 1.0 allowed - should be 1.2
    }
    httpsOnly: false // INTENTIONAL-VULNERABILITY: HTTP traffic allowed
  }
  // INTENTIONAL-FINOPS-ISSUE: No tags defined
}

// INTENTIONAL-VULNERABILITY: Storage account with public access
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: '${replace(appName, '-', '')}stor'
  location: location
  sku: {
    // INTENTIONAL-FINOPS-ISSUE: GRS replication for a sample app - LRS would suffice
    name: storageSku
  }
  kind: 'StorageV2'
  properties: {
    // INTENTIONAL-VULNERABILITY: Public blob access enabled
    allowBlobPublicAccess: true
    // INTENTIONAL-VULNERABILITY: Shared key access enabled
    allowSharedKeyAccess: true
    // INTENTIONAL-VULNERABILITY: No encryption scope defined
    minimumTlsVersion: 'TLS1_0' // INTENTIONAL-VULNERABILITY: TLS 1.0 allowed
    supportsHttpsTrafficOnly: false // INTENTIONAL-VULNERABILITY: HTTP allowed
  }
  // INTENTIONAL-FINOPS-ISSUE: No tags defined
}

// INTENTIONAL-VULNERABILITY: SQL Server with weak security posture
resource sqlServer 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: '${appName}-sql'
  location: location
  properties: {
    administratorLogin: 'sqladmin'
    // INTENTIONAL-VULNERABILITY: Plaintext password from parameter
    administratorLoginPassword: sqlAdminPassword
    // INTENTIONAL-VULNERABILITY: No Azure AD authentication configured
    minimalTlsVersion: '1.0' // INTENTIONAL-VULNERABILITY: TLS 1.0
    publicNetworkAccess: 'Enabled' // INTENTIONAL-VULNERABILITY: Public access enabled
  }
  // INTENTIONAL-FINOPS-ISSUE: No tags defined
}

// INTENTIONAL-FINOPS-ISSUE: Oversized SQL Database
resource sqlDatabase 'Microsoft.Sql/servers/databases@2023-05-01-preview' = {
  parent: sqlServer
  name: '${appName}-db'
  location: location
  sku: {
    // INTENTIONAL-FINOPS-ISSUE: General Purpose 8 vCores for a sample app
    // Basic tier ($5/month) would be sufficient
    name: sqlSkuName
    tier: 'GeneralPurpose'
  }
  // INTENTIONAL-FINOPS-ISSUE: No tags defined
}

// INTENTIONAL-VULNERABILITY: Firewall rule allowing all Azure IPs (overly permissive)
resource sqlFirewallRule 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  parent: sqlServer
  name: 'AllowAllAzureIps'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '255.255.255.255' // INTENTIONAL-VULNERABILITY: Allows ALL IPs, not just Azure
  }
}

// INTENTIONAL-FINOPS-ISSUE: No budget resource defined
// A budget should be created to monitor and alert on spending
// resource budget 'Microsoft.Consumption/budgets@2023-05-01' = { ... }
