import express from 'express';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize(process.env.MYSQL_URL);

const HomeMateri = sequelize.define('home_materi', {
    // Model attributes are defined here
    bab: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sub_bab: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    deskripsi: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'home_materi',
    timestamps: false
    });

const Ourteam = sequelize.define('ourteam', {
    // Model attributes are defined here
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    posisi: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
}, {
    tableName: 'ourteam',
    timestamps: false
    });

const SoalSatu = sequelize.define('soal_satu', {
    // Model attributes are defined here
    jawaban: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'soal_satu',
    timestamps: false
    });

const SoalDua = sequelize.define('soal_dua', {
    // Model attributes are defined here
    jawaban: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'soal_dua',
    timestamps: false
    });

    const SoalTiga = sequelize.define('soal_tiga', {
        // Model attributes are defined here
        jawaban: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'soal_tiga',
        timestamps: false
        });

const jalankanServer = async() => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
        app.get('/home', async(req, res) => {
            //res.send('Hello World!')

            let home_materi = await HomeMateri.findAll();
            res.json(home_materi);
        })

        app.get('/ourteam', async(req, res) => {
            //res.send('Hello World!')

            let ourteam = await Ourteam.findAll();
            res.json(ourteam);
        })
        
        app.post('/soal-satu', async(req, res) => {
            let data = req.body;
            let a = await SoalSatu.create({
                jawaban: data.jawaban,
            })
            res.json(a)
        });

        app.get('/jawaban-soal-satu', async(req, res) => {
            //res.send('Hello World!')

            let soal_satu = await SoalSatu.findAll();
            res.json(soal_satu);
        })

        app.post('/soal-dua', async(req, res) => {
            let data = req.body;
            let a = await SoalDua.create({
                jawaban: data.jawaban,
            })
            res.json(a)
        });

        app.get('/jawaban-soal-dua', async(req, res) => {
            //res.send('Hello World!')

            let soal_dua = await SoalDua.findAll();
            res.json(soal_dua);
        })

        app.post('/soal-tiga', async(req, res) => {
            let data = req.body;
            let a = await SoalTiga.create({
                jawaban: data.jawaban,
            })
            res.json(a)
        });

        app.get('/jawaban-soal-tiga', async(req, res) => {
            //res.send('Hello World!')

            let soal_tiga = await SoalTiga.findAll();
            res.json(soal_tiga);
        })
          
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });
    } catch (error) {
        console.error(error);
    }
};

jalankanServer();
