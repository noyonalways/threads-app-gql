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
