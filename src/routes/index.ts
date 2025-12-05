import express from "express";
import routeOrganization from "./organization.route";
import routeResults from "./result.route";
import routeUsers from "./user.route";
import routeLogin from "./auth.route";
import routeSample from "./sample.route";

const route = express.Router();

route.use("/v1/lab/organization", routeOrganization);
route.use("/v1/lab/results", routeResults);
route.use("/v1/lab/users", routeUsers);
route.use("/v1/lab/login", routeLogin);
route.use("/v1/lab/sample", routeSample);
export default route;