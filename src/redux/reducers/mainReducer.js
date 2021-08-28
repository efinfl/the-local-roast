const initialState = {
    test: "Hello World"
}

const mainReducer = ((state = initialState, action)=>{
    switch (action.type) {
        case "test":
            console.log(action.payload)
            break
        default: return initialState
    }
})

export default mainReducer