import { Router } from "express";
const router = Router();

//autenticacion
router.post("/auth/register", (req, res) => {
    console.log("register", req.body);
});

export default router;
