import db from "../model/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs"; //ใช้ในการเข้ารหัสรหัสผ่าน
import jwt from "jsonwebtoken"; //ใช้ในการแลกเปลี่ยนข้อมูลระหว่างเซิร์ฟเวอร์และไคลเอนต์

import { Op } from "sequelize"; //ใช้ในการจัดการกับการค้นหาข้อมูลในฐานข้อมูล

const authController = {};

authController.register = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    res
      .status(400)
      .send({ message: "Username, Name, Email or Password can not be empty!" });
    return;
  }
  // Select * from user where username = username
  await User.findOne({ where: { username } }).then((user) => {
    if (user) {
      res.status(400).send({ message: "Username already exists!" });
      return;
    }

    const newUser = {
      username,
      name,
      email,
      password,
    };
    User.create(newUser)
      .then((user) => {
        // send roles in reqiest body [ADMIN]
        if (req.body.roles) {
          // Select * from role where name = role1 OR name = role2
          Role.findAll({
            where: {
              name: { [Op.or]: req.body.roles },
            },
          }).then((roles) => {
            if (roles.length === 0) {
              res.status(400).send({ message: "Role not found!" });
              return;
            }
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || "Something error while create the user",
        });
      });
  });
};

export default authController;