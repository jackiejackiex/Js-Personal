const mqDark = window.matchMedia("(prefers-color-scheme: dark)")
const darkModeToggle = document.querySelector("a.dark-mode-toggle")
const bodyT = document.querySelector("body")

darkModeToggle.addEventListener('click', ()=>{
    bodyT.classList.toggle("light-mode")

    if(bodyT.classList.contains("light-mode")){
        darkModeToggle.innerHTML = "Dark Mode"
    } else {
        darkModeToggle.innerHTML = "Light Mode"
    }
})


const updateDarkMode = () => {
    if(mqDark.matches){
        bodyT.classList.add("dark-mode")
        darkModeToggle.innerHTML = "Light Mode"
    } else {
        bodyT.classList.remove("dark-mode")
        darkModeToggle.innerHTML = "Dark Mode"
    }
}

updateDarkMode()

mqDark.addListener(()=>{
    updateDarkMode()
})



const spinTimeline = gsap.timeline({
     repeat: -1
 })

spinTimeline
    .to("img", {
        rotationY: 360,
        rotationX:360,
        transformOrigin: "50% 50%",
        duration: 20,
        stagger: 1
    })


