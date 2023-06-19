import AdminJS from "adminjs";
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import { database } from '../database'
import { adminJsResources } from "./resources";
import {locale} from './locale'
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";
import session from 'express-session'
import connectSession from 'connect-session-sequelize'
import { ADMINJS_COOKIE_PASSWORD } from "../config/enviroment";

const SequelizeStore = connectSession(session.Store)
const store = new SequelizeStore({db: database})
store.sync()

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS ({
    databases: [database],
    rootPath: '/admin',
    locale:  locale,
    resources: adminJsResources,
    branding: brandingOptions,
    dashboard: dashboardOptions
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs, 
  authenticationOptions, 
  null, 
  {
    resave: false, saveUninitialized: false, store: store, secret: ADMINJS_COOKIE_PASSWORD
  })

