const AuthConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "",
    expiresIn: "30d",
  },
};

export default AuthConfig;
