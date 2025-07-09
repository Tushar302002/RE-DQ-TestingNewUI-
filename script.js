const viewBtns = document.querySelectorAll(".view-btn")
const resetBtn = document.querySelector(".reset-btn")
const hotspotPanel = document.querySelector(".hotspot-panel")
const hotspotList = document.querySelector('.hotspot-list');
const hotspotListItem = document.querySelectorAll(".hotspot-listItem")
const rightPanel = document.querySelector(".right-panel")
const leftPanel = document.querySelector(".left-panel")
const closeIcon = document.querySelector(".closeIcon")
const disclaimer = document.querySelector(".disclaimer")
const runningMessage = document.querySelector(".running-message")
const container = document.querySelector(".container")
const loadingText = document.querySelector(".loading-text")
const loadingImage = document.querySelector(".loading-image")
const selectHotspot = document.querySelector('.select-hotspot'); // not for laptop device 
import { loadModel } from "./scene.js"

viewBtns.forEach((viewBtn, index) => {
    if (index == 3) return;
    viewBtn.addEventListener('click', () => {
        leftPanel.classList.add('flexStart') // not for laptop device
        hotspotListItem.forEach((hotspot) => {
            hotspot.classList.remove('active')
            hotspot.classList.remove('show-all'); // not for laptop device
        })
        rightPanel.classList.add("hidden")
        disclaimer.classList.add("hidden")
        selectHotspot.classList.remove("hidden") // not for laptop device

        hotspotPanel.classList.remove('hidden')
        resetBtn.classList.remove('hidden')
    })
});

resetBtn.addEventListener('click', () => {
    resetBtn.classList.add("hidden")
    hotspotPanel.classList.add("hidden")
    rightPanel.classList.add("hidden")
    disclaimer.classList.add("hidden")
    leftPanel.classList.remove('flexStart') // not for laptop device
    hotspotListItem.forEach((hotspot) => {
        hotspot.classList.remove('active');
        hotspot.classList.remove('show-all'); // not for laptop device
    })
})

hotspotListItem.forEach((hotspot) => {
    hotspot.addEventListener('click', () => {
        hotspotListItem.forEach((hotspot) => {
            hotspot.classList.remove('active')
            hotspot.classList.toggle('show-all');// not for laptop device
            selectHotspot.classList.add("hidden") // not for laptop device
        })
        hotspot.classList.add('active')
        rightPanel.classList.remove("hidden")
        disclaimer.classList.remove("hidden")


        // Move clicked hotspot just after .select-hotspot (not for laptop device)
        if (window.innerWidth <= 1024) {
            hotspotList.insertBefore(hotspot, selectHotspot.nextSibling);
        }
    })
})

closeIcon.addEventListener('click', () => {
    hotspotListItem.forEach((hotspot) => {
        hotspot.classList.remove('active')
    })
    rightPanel.classList.add("hidden")
    disclaimer.classList.add("hidden")
})

async function init() {
    resetBtn.classList.add("hidden")
    hotspotPanel.classList.add("hidden")
    rightPanel.classList.add("hidden")
    disclaimer.classList.add("hidden");
    await loadModel();
    container.classList.add("bgColor");
    leftPanel.classList.add("zIndex");
    rightPanel.classList.add("zIndex");
    disclaimer.classList.add("zIndex");
    runningMessage.classList.add("zIndex")
    loadingText.classList.add("hidden");
    loadingImage.classList.add("afterLoading")
}
init()



// not for laptop device 
selectHotspot.addEventListener('click', () => {
    hotspotListItem.forEach((hotspot) => {
        hotspot.classList.toggle('show-all');
    })
});

document.addEventListener('click', (e) => {
    if (window.innerWidth > 1024) return;
    if (!hotspotPanel.contains(e.target)) {
        hotspotListItem.forEach((hotspot) => {
            hotspot.classList.remove('show-all');
        })
    }
});
