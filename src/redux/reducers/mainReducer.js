const initialState = {
    tbd: ""
}

const mainReducer = ((state = initialState, action)=>{
    switch (action.type) {
        case "tbd":
            console.log(action.payload)
        default: console.log("no action")
    }
})

export default mainReducer