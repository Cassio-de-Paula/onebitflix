// src/models/index.ts

import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'

Category.hasMany(Course)

Course.belongsTo(Category)

Course.hasMany(Episode)

Episode.belongsTo(Course)

export {
  Course,
  Category,
  Episode
}