import UserService, {
  ICreateUserInput,
  IGetUserTokenInput,
} from "../../services/user";

export const queries = {
  getUserToken: async (_: any, payload: IGetUserTokenInput) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },
  getCurrentLoggedInUser: async (_: any, __: any, context: any) => {
    if (context && context.user) {
      return await UserService.getUserById(context.user.id);
    }
    return null;
  },
};

export const mutations = {
  createUser: async (_: any, payload: ICreateUserInput) => {
    const user = await UserService.createUser(payload);
    return user.id;
  },
};

export const resolvers = {
  queries,
  mutations,
};
