const { salesSchema } = require('../utils/joiSchemas');

const validateNewSales = (req, res, next) => {
  const { error } = salesSchema.validate(req.body);
  
  if (error) {
    const { message, type } = error.details[0];

    const status = type === 'any.required' ? 400 : 422;

    return res.status(status).json({ message });
  }
  
  next();
};

module.exports = { validateNewSales };