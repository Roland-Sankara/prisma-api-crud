const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {category: true}
    });

    // just testing categories
    const categories = await prisma.category.findMany({
      include: {products: true}
    })

    res.json({products, categories})
  } catch (error) {
    next(error)
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    })
    res.json(product);

  } catch (error) {
    next(error)
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: +req.params.id
      },
      include: {category:true}
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});

router.patch('/products/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      where:{
        id: +req.params.id
      },
      data: req.body,
      include: {
        category: true
      }
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.delete({
      where:{
        id: +req.params.id
      }
    })
    res.json(product);

  } catch (error) {
    next(error)
  }
});

module.exports = router;
