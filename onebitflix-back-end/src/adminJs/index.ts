import AdminJS from "adminjs";
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import { database } from '../database'
import { adminJsResources } from "./resources";
import {locale} from './locale'
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";

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
    resave: false, saveUninitialized: false
  })

