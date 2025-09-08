 <!-- /store/store.js-->
 - creates a Redux store with the chat slice
 - this will only be in memory when the app is opened. If i wanted it to a be session store, I would need to add a sessionStorage

 <!-- /store/chatSlice.js-->
- data only lives in memory
- so when you do a page refresh or reset it, a new chat will show
- createSlice is from the Redux Toolkit, a basic helper that bundles state, reducers and actions into one one 
    - handling the chat messagaes
    - input values
    - typing indicators
    - if the chat is open or not
    - bot response