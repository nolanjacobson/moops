import React from 'react'
import HomePageStyles from '../CSS/HomePage.css'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from '../utils/Functions'
const Categories = ({ match, categoryIcons }) => {
  return (
    <>
      {' '}
      <section className="categoryNameFlex">
        <div className="categoryName">
          {capitalizeFirstLetter(match.params.category)}
        </div>
        <hr className="moopsGradient"></hr>
      </section>
      <nav className="categoryIconNav">
        <ul className="categoryIconNavUl">
          {Object.values(categoryIcons).map((icon, index) => {
            {
              return (
                <Link to={Object.keys(categoryIcons)[index]}>
                  <li className="categoryIconNavLi">{icon}</li>
                </Link>
              )
            }
          })}
        </ul>
      </nav>
    </>
  )
}
export default Categories
