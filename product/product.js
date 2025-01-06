const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();


const updateProduct = async (product) => {
    const { productId, ...updates } = product;
    updates.updatedAt = new Date().toISOString();

    const updateParams = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: { productId },
    UpdateExpression: 'set #name = :name, description = :desc, price = :price, category = :cat, stock = :stock, updatedAt = :updatedAt',
    ExpressionAttributeNames: {
        '#name': 'Name',
        '#desc': 'Description',
        '#price': 'Price',
        '#category': 'Category',
        '#stock': 'Stock'
      },
    ExpressionAttributeValues: {
        ':name': updates.name,
        ':desc': updates.description,
        ':price': updates.price,
        ':cat': updates.category,
        ':stock': updates.stock,
        ':updatedAt': updates.updatedAt
    },
    ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDB.update(updateParams).promise();
    return result.Attributes;
};

const deleteProduct = async (productId) => {
    const deleteParams = {
        TableName: process.env.PRODUCTS_TABLE,
        Key: { productId }
    };
    await dynamoDB.delete(deleteParams).promise();
    return { productId };
};

const getProductById = async (productId) => {
    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Key: { productId }
    };
  
    const result = await dynamoDB.get(params).promise();
    return result.Item;
  };

  const listProducts = async () => {
    const params = {
      TableName: PRODUCTS_TABLE
    };
  
    const result = await dynamoDB.scan(params).promise();
    return result.Items;
  };

  const createProduct = async (product) => {
    product.createdAt = new Date().toISOString();
    product.updatedAt = new Date().toISOString();

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Item: product
    };
  
    const result = await dynamoDB.put(params).promise();
    return result.Attributes;
  };

  const createTaxonomy = async (taxonomy) => {
    const params = {
      TableName: process.env.TAXONOMY_TABLE,
      Item: taxonomy
    };
  
    const result = await dynamoDB.put(params).promise();
    return result.Attributes;
  };

  const listTaxonomies = async () => {
    const params = {
      TableName: process.env.TAXONOMY_TABLE
    };
  
    const result = await dynamoDB.scan(params).promise();
    return result.Items;
  };


  module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    listProducts,
    listTaxonomies,
    createTaxonomy
  };
  