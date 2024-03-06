const isItMe = (userId: string, authUser: string) => {
  return userId === authUser;
};

export default isItMe;
