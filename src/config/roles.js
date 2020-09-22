const roles = ['read', 'user', 'admin', 'partner', 'root']

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'getUser', 'manageUsers']);
roleRights.set(roles[2], ['getUsers', 'getUser', 'manageUsers']);


module.exports = {
  roles,
  roleRights,
};
