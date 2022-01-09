const config = {
  env: process.env.NODE_ENV === "production" ? "production" : "development",
  port: process.env.PORT || 3031,
  jwtSecret: "lrfp8sQdoLG6eT",
  jwtExpires: "30d",
  cookieName: "todayku",
  cookieNameMb: "confirmNum",
  cookieMaxAge: 60 * 60 * 24 * 30 * 1000,
};

export default config;
