// src/models/index.ts

import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'
import { Favorite } from './Favorite'
import { User } from './User'

Category.hasMany(Course, {as: 'courses'})

Course.belongsTo(Category)
Course.hasMany(Episode, {as: 'episodes'})
Course.belongsToMany(User, {through: Favorite})
Course.hasMany(Favorite, {as: 'favoriteUsers', foreignKey: 'course_id'})

Episode.belongsTo(Course)

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

User.belongsToMany(Course, {through: Favorite})
User.hasMany(Favorite, { as: 'favoriteCourses', foreignKey: 'user_id'})

export {
  Course,
  Category,
  Episode,
  Favorite,
  User
}