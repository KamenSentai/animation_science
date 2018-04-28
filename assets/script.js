/*-------------------------*\

***** letIABLES

\*-------------------------*/

const formulas    = document.querySelectorAll('.formulas .formula')
const playButton  = document.querySelector('.buttons a.button')
const linksButton = document.querySelectorAll('.buttons a.link')
const opening     = document.querySelector('#opening')
const intro       = document.querySelectorAll('.subtitles .bottom p')

/*-------------------------*\

***** SETUP

\*-------------------------*/

const numberFormula = 50
const numbersList = new Array()
const verticalList = new Array()

// Dill a tempory list
for (let i = 1; i <= numberFormula; i++) { numbersList.push(i) }
for (let i = 0; i < numberFormula; i++) { verticalList.push((numbersList[i] - 1) * window.innerHeight * 0.75 / numberFormula) }
const indexList = numbersList

const shuffleArray = (array) =>
{
    for (let i = array.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

const setDatas = () =>
{
    for (let i = 0; i < numbersList.length; i++)
    {
        formulas[i].setAttribute('data-index', 'index-' + indexList[i])
        formulas[i].style.bottom = verticalList[i] + 'px'
    }
}

// Shuffle the list of numbers and fill in the index list
shuffleArray(indexList)
// Add order appearance and vertical position to each element
setDatas()

const playSound = (sound) =>
{
    sound.play()
}

/*-------------------------*\

***** RUN ANIMATIONS

\*-------------------------*/

playButton.addEventListener('click', (event) =>
{
    event.preventDefault()
    for (let i = 0; i < intro.length; i++)
    {
        intro[i].classList.add('intro-subtitles')
    }
    setTimeout(() =>
    {
        for (let i = 0; i < formulas.length; i++)
        {
            // Add animation keyframe
            formulas[i].classList.add('animated')
        }
    }, 5000)
    // Add diagonal animations
    playButton.classList.add('diagonal')
    linksButton[0].classList.add('diagonal')
    linksButton[1].classList.add('diagonal')
    // Play the opening music
    opening.play()
    // Shuffle the appearance order and the vertical position
    shuffleArray(indexList)
    shuffleArray(verticalList)
    setTimeout(() =>
    {
        for (let i = 0; i < formulas.length; i++)
        {
            formulas[i].classList.remove('animated')
        }
        playButton.classList.remove('diagonal')
        linksButton[0].classList.remove('diagonal')
        linksButton[1].classList.remove('diagonal')
        for (let i = 0; i < intro.length; i++)
        {
            intro[i].classList.remove('intro-subtitles')
        }
        setDatas()
    }, 80000)
})