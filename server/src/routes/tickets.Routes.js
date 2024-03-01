const express = require("express");
const router = express.Router();

const {
  CreateTicket,
  GetAllTickets,
  FindTicket,
  UpdateTicket,
  DeleteTicket,
} = require("../controllers/tickets.controllers.js");
const { TicketMiddleware } = require("../middlewares/tickets.middlewares.js");
router.post("/create", CreateTicket);
router.get("/", GetAllTickets);
router.get("/:id", FindTicket);
router.put("/:id", TicketMiddleware, UpdateTicket);
router.delete("/:id", TicketMiddleware, DeleteTicket);

module.exports = router;
