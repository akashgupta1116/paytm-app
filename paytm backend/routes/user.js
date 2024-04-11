const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const router = Router();
const { JWT_SECRET } = require("../config");
const { userAuthMiddleware } = require("../middleware/user");
const { User, Account } = require("../db");

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});
const updateScehma = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});
router.post("/signup", async (req, res) => {
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

  if (user?._id) {
    return res.json({
      msg: "Email already taken",
    });
  }

  const dbUser = await User.create(body);
  await Account.create({
    userId: dbUser._id,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);
  return res.json({
    msg: "User created successfully",
    token,
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      msg: "Incorrect inputs",
    });
  }
  const user = await User.findOne({
    body,
  });

  if (!user?._id) {
    return res.status(411).json({
      msg: "Email does not found",
    });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  return res.json({
    msg: "Logged in successfully",
    token,
  });
});
router.put("/", userAuthMiddleware, async (req, res) => {
  const body = req.body;
  const userId = req.userId;
  const { success } = updateScehma.safeParse(body);

  if (!success) {
    return res.status(411).json({
      msg: "Error while updating information",
    });
  }
  await User.updateOne(body, { _id: userId });

  return res.json({
    msg: "Updated successfully",
  });
});

router.get("/bulk", userAuthMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => {
      return {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        _id: user._id,
      };
    }),
  });
});

module.exports = router;
