export const addContact = (user) => {
  return {
    type: "addContact",
    payload: user,
  };
};

export const deleteUser = (userToDelateId) => {
  return {
    type: "deleteUser",
    payload: userToDelateId,
  };
};

export const updateUser = (updatedUser) => {
  return {
    type: "updateUser",
    payload: updatedUser,
  };
};


