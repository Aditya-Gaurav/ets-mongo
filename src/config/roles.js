const roles = ['read', 'user', 'admin', 'partner', 'root', 'l1ops']

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
