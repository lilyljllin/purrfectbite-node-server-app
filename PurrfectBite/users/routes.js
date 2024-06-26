import * as dao from "./dao.js";
// let currentUser = null;
export default function UserRoutes(app) {
  const createUser = async (req, res) => { 
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
   };
  const findAllUsers = async (req, res) => { 
    const { role, name, list } = req.query;
    if (role) {
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
    }
    if (name) {
        const users = await dao.findUsersByPartialName(name);
        res.json(users);
        return;
    }
    if (list) {
        const userIds = Array.isArray(list) ? list : [list]; // Ensure userIds is always an array
        const users = await dao.findUsersByListOfId(userIds);
        res.json(users);
        return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
    return;
  };
  const findUserById = async (req, res) => { 
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const updatedUser = await dao.updateUser(userId, req.body);
    if (updatedUser) {
    req.session["currentUser"] = updatedUser;
      res.json(updatedUser);
    } else {
        res.status(401).json({ message: "Failed to update user." });
    }
  };

  const signup = async (req, res) => { 
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    if (currentUser) {
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
    } else {
        res.status(400).json({ message: "Failed to signup, please try again"})
    }

  };
  const signin = async (req, res) => { 
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }

  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
   };

   const addFollowing = async (req, res) => {
    const { userId, followingId } = req.params;
    const updatedUser = await dao.addFollowing(userId, followingId);
    if (updatedUser) {
        req.session["currentUser"] = updatedUser;
          res.json(updatedUser);
        } else {
            res.status(401).json({ message: "Failed to update user." });
        }
  };
  
  const deleteFollowing = async (req, res) => {
    const { userId, followingId } = req.params;
    const updatedUser = await dao.deleteFollowing(userId, followingId);
    if (updatedUser) {
        req.session["currentUser"] = updatedUser;
          res.json(updatedUser);
        } else {
            res.status(401).json({ message: "Failed to update user." });
        }
  };
  const deleteUserFromFollowing = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.deleteUserFromFollowing(userId);
    res.json(status);
  }

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.put("/api/users/:userId/addFollowing/:followingId", addFollowing);
  app.put("/api/users/:userId/deleteFollowing/:followingId", deleteFollowing);
  app.put("/api/users/remove/:userId", deleteUserFromFollowing);
}
