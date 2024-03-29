
//PUERTO
process.env.PORT = process.env.PORT || 3001;

//ENTORNO NODE
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//URL DB
let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/gimnasio'
} else {
    urlDB = process.env.URL_PROD
}
process.env.URLDB = urlDB;

//CADUCIDAD TOKEN
process.env.CADUCIDAD = 60*60*24*30

//SEED TOKEN
process.env.SEED = process.env.SEED || 'este-es-el-seed-dev'