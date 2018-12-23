/*
module.exports = {
    //autentificación
    jwtSecret: 'long-live-the-ionic-academy'
}
*/
export interface IConfig {
    jwtSecret: string;
}

const config: IConfig = {
    jwtSecret: 'long-live-the-ionic-academy'
};

export { config };


