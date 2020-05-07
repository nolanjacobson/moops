import React from 'react'
import HomePageStyles from '../CSS/HomePage.css'
import { Link } from 'react-router-dom'
const Categories = ({ match, categoryIcons }) => {
  return (
    <>
      {' '}
      <section className="categoryNameFlex">
        <div className="categoryName">
          {match.params.category.charAt(0).toUpperCase() +
            match.params.category.slice(1)}
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
