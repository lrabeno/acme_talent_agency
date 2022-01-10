const express = require('express');
const { syncAndSeed, db, Client, Skill, ClientSkills} = require('./db')
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/clients', async (req, res, next) => {
    try {
        const clients = await Client.findAll({
            include: ClientSkills
        })
        res.send(clients)
    } catch (error) {
        next(error)
    }
})

app.get('/clients/:id', async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id)
        res.send(client)
    } catch (error) {
        next(error)
    }
})

app.get('/skills', async (req, res, next) => {
    try {
        const skills = await Skill.findAll({
            include: ClientSkills
        })
        res.send(skills)
    } catch (error) {
        next(error)
    }
})

app.get('/skills/:id', async (req, res, next) => {
    try {
        const skill = await Skill.findByPk(req.params.id)
        res.send(skill)
    } catch (error) {
        next(error)
    }
})

app.get('/clientSkills', async (req, res, next) => {
    try {
        const clientSkill = await ClientSkills.findAll({
            include: [{
                model: Client
            },
            {
                model: Skill
            }]
        })
        res.send(clientSkill)
    } catch (error) {
        next(error)
    }
})

app.get('/clients/:clientId/:skillId', async (req, res, next) => {
    try {
        const clientSkill = await ClientSkills.findOne({
            where: {
                clientId: req.params.clientId,
                skillId: req.params.skillId
            }
        })
        res.send(clientSkill)
    } catch (error) {
        next(error)
    }
})

app.delete('/client/:clientId/:skillId', async (req, res, next) => {
    try {
        const clientSkill = await ClientSkills.findOne({
            where: {
                clientId: req.params.clientId,
                skillId: req.params.skillId
            }
        })
        if (!clientSkill) {
            res.sendStatus(404)
        } else {
            await clientSkill.destroy()
            // const clients = await Client.findAll({
            //     include: Skill
            // })
            // res.send(clients)
            res.sendStatus(204)
        }
    } catch (error) {
        console.log(error)
    }
})

const init = async () => {
    try {
      await syncAndSeed()
      await db.authenticate()
      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch(error) {
        console.log(error)
    }
  }
  
  init();