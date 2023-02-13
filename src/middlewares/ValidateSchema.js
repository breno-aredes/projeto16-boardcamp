export function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abroutEarly: false });

    if (error) {
      const err = error.details.map((err) => err.message);
      return res.status(400).send(err);
    }
    next();
  };
}
