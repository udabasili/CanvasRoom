import { Router } from 'express';

const router = Router();



export default (app: Router) => {
    app.use('/test', router);

    router.get('', (req, res) => {
        res.json({ status: 'Hello From Express' });
    });

}