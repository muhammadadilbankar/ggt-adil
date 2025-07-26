// Submission validation middleware
export const validateSubmission = (req, res, next) => {
  const { name, uid, branch, title, pdfLink } = req.body;
  //console.log("validateSubmissions")
  // Validate required fields
  if (!name || !uid || !branch || !title || !pdfLink) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate UID format (assuming it should be alphanumeric)
  if (!/^[A-Za-z0-9]+$/.test(uid)) {
    return res.status(400).json({ message: 'UID must be alphanumeric' });
  }

  // Validate PDF link format
  if (!pdfLink.startsWith('http')) {
    return res.status(400).json({ message: 'Invalid PDF link format' });
  }

  next();
};

// Order validation middleware
export const validateOrder = (req, res, next) => {
  const { user, products, totalAmount, shippingAddress } = req.body;

  // Validate user information
  if (!user || !user.name || !user.email || !user.phone) {
    return res.status(400).json({ message: 'User information is incomplete' });
  }

  // Validate products array
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Products array is required and cannot be empty' });
  }

  // Validate each product in the order
  for (const item of products) {
    if (!item.product || !item.quantity || !item.price) {
      return res.status(400).json({ message: 'Each product must have product ID, quantity, and price' });
    }
    if (item.quantity <= 0) {
      return res.status(400).json({ message: 'Product quantity must be greater than 0' });
    }
    if (item.price <= 0) {
      return res.status(400).json({ message: 'Product price must be greater than 0' });
    }
  }

  // Validate total amount
  if (!totalAmount || totalAmount <= 0) {
    return res.status(400).json({ message: 'Total amount is required and must be greater than 0' });
  }

  // Validate shipping address
  if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || 
      !shippingAddress.state || !shippingAddress.zipCode) {
    return res.status(400).json({ message: 'Complete shipping address is required' });
  }

  next();
}; 