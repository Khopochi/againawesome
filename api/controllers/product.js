import Category from "../models/Category.js"
import Deepcategory from "../models/Deepcategory.js"
import Product from "../models/Product.js"
import Subcategory from "../models/Subcategory.js"


//ADD PRODUCT FUNCTION
export const addProduct = async (req,res) => {
    const newProduct = Product(req.body)
    try{
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    }catch(err){
        res.status(200).json({err})   
    }
}

//get all products
export const getAllProducts = async (req, res) => {
    try {
      // Fetch all products
      const allProducts = await Product.find();
  
      // Initialize a variable to increment for each product
      let nextId = 1;
  
      // Create a promise array to fetch category, subcategory, and deep category names for each product
      const productPromises = allProducts.map(async (product) => {
        const categoryId = product.categoryid;
        const subCategoryId = product.subcategoryid;
        const deepCategoryId = product.deepcategoryid;
  
        // Fetch the category name based on the categoryId
        const category = await Category.findById(categoryId);
  
        // Fetch the subcategory name based on the subCategoryId
        const subcategory = await Subcategory.findById(subCategoryId);
  
        // Fetch the deep category name based on the deepCategoryId
        const deepcategory = await Deepcategory.findById(deepCategoryId);
  
        // Create an object with the required fields, including the incremented ID
        const productWithNames = {
          id: nextId++, // Increment and then use the incremented value
          name: product.name,
          categoryName: category ? category.name : 'Category Not Found',
          subcategoryName: subcategory ? subcategory.name : 'Subcategory Not Found',
          deepcategoryName: deepcategory ? deepcategory.name : 'Deepcategory Not Found',
          ...product._doc,
        };
  
        return productWithNames;
      });
  
      // Resolve all promises and get the final array with category, subcategory, and deep category names
      const productsWithNames = await Promise.all(productPromises);
  
      // Send the modified JSON response with added id, categoryName, subcategoryName, and deepcategoryName fields
      res.status(200).json(productsWithNames);
    } catch (err) {
      // Handle errors and send an error response
      res.status(500).json({ error: 'Operation Failed', errorDetails: err.message });
    }
  };

//get products that match deepcategoryid
export const getProductsByDeepCategoryId = async (req, res) => {
  const deepcategoryid = req.params.id;

  try {
    // Find products with the specified deepCategoryId
    const products = await Product.find({ deepcategoryid });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//get single product
export const getProductById = async (req, res) => {
  const productId = req.params.id; 
  try {
    const product = await Product.findById(productId); 
    res.status(200).json(product);
  } catch (err) {
    res.status(200).json({ error: 'Internal Server Error' });
  }
};

//get all products for home page
export const getProducts = async (req,res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    res.status(200).json(products);
  }catch(err){
    // Handle errors and return an empty array
    res.status(200).json({ error: 'Internal Server Error' });
  }
};

  