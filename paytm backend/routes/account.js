const { Router } = require("express");

const { Account } = require("../db");
const { userAuthMiddleware } = require("../middleware/user");
const router = Router();

router.post("/transfer", userAuthMiddleware, (req, res) => {
  const session = mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid request",
    });
  }

  await Account.updateOne({ userId: to }, { $inc: amount }).session(session);
  await Account.updateOne({ userId: req.userId }, { $inc: -amount }).session(
    session
  );

  session.commitTransaction();

  res.send({
    msg: "Transaction complete",
  });
});

router.get("/balance", userAuthMiddleware, (req, res) => {
  const userId = req.userId;

  const account = Account.findOne({ userId });
  if (!account) {
    return res.status(400).json({
      msg: "No account found",
    });
  }
  return res.json({
    balance: account.balance,
  });
});
module.exports = router;
