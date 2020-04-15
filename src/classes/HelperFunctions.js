function getParams(modelName) {
  let itCounts;
  let isPurchase;
  
  switch(modelName) {
    case 'PurchaseInvoice':
      itCounts = true; break;
    case 'SaleInvoice':
      itCounts = true; break;
    case 'CounterInvoice':
      itCounts = true; break;
    default: 
      itCounts = false;
  }

  switch(modelName) {
    case 'PurchaseInvoice':
      isPurchase = true; break;
    case 'PurchaseOrder':
      isPurchase = true; break;
    default: 
      isPurchase = false;
  }

  return {itCounts, isPurchase}
}

module.exports = {
  getParams
}