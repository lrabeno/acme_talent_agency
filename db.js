const Sequelize = require('sequelize');
const { STRING } = Sequelize;


const db = new Sequelize(
    process.env.DATABASE_URL || 'acme_talent_agency',
     'postgres',
     'Ny1knicks23',{
    host: 'localhost',
    dialect: 'postgres'
  });

const Client = db.define('client', {
    name: {
        type: STRING
    }
})

const Skill = db.define('skill', {
    name: {
        type: STRING
    }
})

const ClientSkills = db.define('clientskills', {})

Client.belongsToMany(Skill, { through: 'clientskills' });
Skill.belongsToMany(Client, { through: 'clientskills' });

const data = {
    clients: ['Danny', 'Johnny', 'Miguel', 'Samantha', 'Tori'],
    skills: ['The infamous crane kick',
             'Punching real good',
             'A badass with a sword',
             'Throwing Stars',
             'Crazy with them nunchuks',
             'A scary death grip'
]
}
const syncAndSeed = async() => {
    await db.sync({force: true});
    const [danny, johnny, miguel, samantha, tori] = await Promise.all(
       data.clients.map((client) => {
           return Client.create( { name: client })
       }) 
    )

    const [crane, punch, sword, stars, nunchuk, deathGrip] = await Promise.all(
        data.skills.map((skill) => {
            return Skill.create( { name: skill })
        })  
    )

    await Promise.all([
        ClientSkills.create({ clientId: danny.id, skillId: crane.id}),
        ClientSkills.create({ clientId: danny.id, skillId: punch.id}),
        ClientSkills.create({ clientId: johnny.id, skillId: sword.id}),
        ClientSkills.create({ clientId: miguel.id, skillId: stars.id}),
        ClientSkills.create({ clientId: samantha.id, skillId: nunchuk.id}),
        ClientSkills.create({ clientId: tori.id, skillId: deathGrip.id}),
    ])
}

module.exports = {
    syncAndSeed,
    db,
    Client,
    Skill,
    ClientSkills
}