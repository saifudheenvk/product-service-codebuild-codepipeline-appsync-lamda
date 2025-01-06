const { updateProduct, getProductById, listProducts, createProduct, listTaxonomies, createTaxonomy, deleteProduct } = require("./product");

exports.handler = async (event) => {
  
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