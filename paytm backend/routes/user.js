const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const router = Router();
const { JWT_SECRET } = require("../config");

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});
router.post("/signup", (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.json({
      msg: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.json({
      msg: "Email already taken",
    });
  }

  const dbUser = await User.create(body);

  const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);

  return res.json({
    msg: "User created successfully",
    token,
  });
});

module.exports = router;
