const { updateProduct, getProductById, listProducts, createProduct, listTaxonomies, createTaxonomy } = require("./product");

exports.handler = async (event) => {
    console.log('event', JSON.stringify(event, null, 2));
  
    const { fieldName, arguments: args } = event;
  
    switch (fieldName) {
      case 'createProduct':
        return createProduct(args.input);
      case 'updateProduct':
        return updateProduct(args.input);
      case 'deleteProduct':
        return deleteProduct(args.productId);
      case 'getProductById':
        return getProductById(args.productId);
      case 'listProducts':
        return listProducts();
      case 'listTaxonomies':
        return listTaxonomies();
      case 'createTaxonomy':
        return createTaxonomy(args.input);
      default:
        throw new Error('Unknown field, unable to resolve');
    }
  };