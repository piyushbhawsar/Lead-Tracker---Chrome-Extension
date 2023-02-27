// "www.awesomelead.com", "www.awesomelead.com", "www.greatlead.com"
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

deleteBtn.addEventListener("dblclick" , function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click" , function() {
    myLeads.push(inputEl.value) 
    inputEl.value = ""
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))
    render(myLeads) ;
})

//tabs actually stored like this objects{key,value pair} in arr when you fetch it from chrome Api
// const tabs = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ]

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true , currentWindow: true} , function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads" , JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i=0 ; i<leads.length ; i++) {
     // listItems +=  "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `  
            <li>
                <a target='_blank' href='${leads[i]}'> 
                    ${leads[i]} 
                </a>
            </li>
        `
    }
    //render once -> DOM Manipulation comes with a Cost :
    ulEl.innerHTML = listItems
} 