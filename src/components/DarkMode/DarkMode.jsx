import { useState } from "react"
import lightMode from '../../assets/light-mode-button.png'
import darkMode from '../../assets/dark-mode-button.png'

export default function DarkMode() {

  let [theme , setTheme] = useState(localStorage.getItem("theme") || "light")
  let element = document.documentElement
  if(theme == "dark"){
    element.classList.add("dark")
    localStorage.setItem("theme" , "dark")
  }
  else{
    element.classList.remove("dark")
    localStorage.setItem("theme" , "light")
  }


  return <>
      <div className=" relative">
        <img src={lightMode}
          onClick={()=> setTheme(theme == "dark" ? "light" : "dark")}
          className={`w-12 cursor-pointer absolute right-0 ${theme == "dark" ? "z-10" : "-z-10"}`}
        alt="" />
        <img src={darkMode}
          onClick={()=> setTheme(theme == "light" ? "dark" : "light")}
          className={`w-12 cursor-pointer`}
        alt="" />
      </div>

  
  </>
}
