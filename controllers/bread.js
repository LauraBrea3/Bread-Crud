const router = require('express').Router()

const Bread = require('../models/bread')

router.get('/', async (req,res) => {
    const bread = await Bread.find()
    res.render('index', {
        breads: bread
    })
})

router.get('/new', (req,res) => {
    res.render('new')
})

router.get('/:id', async (req,res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('show', {
        bread
    })
})


router.post('/', async (req,res) => {
    if (!req.body.image) {
         req.body.image = undefined
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    }else {
        req.body.hasGluten = false
    }
    await Bread.create(req.body)
    res.redirect('/breads')
})

router.get('/:arrayIndex/edit', (req,res) => {
    const { arrayIndex } = req.params
    const index = Number(arrayIndex)
    res.render('edit', {
        bread: Bread[index],
        index
    })
})

router.put('/:arrayIndex', (req,res) => {
    const { arrayIndex } = req.params
    if (!req.body.image) {
        req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
   }
   if (req.body.hasGluten === 'on') {
       req.body.hasGluten = true
   } else {
       req.body.hasGluten = false
   }
   Bread[arrayIndex] = req.body
   res.redirect(`/breads/${arrayIndex}`)
})

router.delete('/:arrayIndex', (req,res) => {
    const { arrayIndex } = req.params
    Bread.splice(arrayIndex, 1)
    res.status(303).redirect('/breads')
})

module.exports = router