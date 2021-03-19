import express from "express";

// import { currentUser } from "../middlewares/current-user";

import {currentUser} from "@ticket_sale_app/common";


const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
