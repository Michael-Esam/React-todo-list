import * as React from "react";
import './App.css';

// ✅ Import main Todo component
import Todo from "./Todo";

// ✅ Import Material UI components
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

// ✅ Import React hooks
import {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useReducer
} from "react";

// ✅ Import custom contexts
import { TodoContext } from "./cotexts/TodoContext";
import { useToast } from "./cotexts/ToastCotext"

import { useTranslation } from 'react-i18next';
import "../public/locales/ar/translation.json"


export default function TodoList() {
  const [input, setInput] = useState("")
  const [switchTasks,setSwitch]=useState("all")
  const [open, setOpen] = useState(false);
  const [Dtodo,setDtodo]=useState("")
  const [openEdit, setOpenEdit] = useState(false);
  const {showToast}=useToast()
  const {todos,todosDispatch}= useContext(TodoContext)
  const [lang , setLang] = useState("ar")
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    setSwitch(e.target.value);
  };
  
  if(localStorage.getItem("todos")){
    useEffect(()=>{
     todosDispatch({type:"get"})
  },[])}

  if(localStorage.getItem("lang")){
    useEffect(()=>{
    setLang(localStorage.getItem("lang"))
  },[])}


  const checked =useMemo(()=> todos.filter(t => t.checked ),[todos]);
  const nonChecked = useMemo (()=>todos.filter(t => !t.checked ),[todos]);
  let render = todos

  if(switchTasks === "checked"){
    render = checked
  }else if(switchTasks === "non-checked"){
    render = nonChecked
  }

  const todo = render.map((t)=>{
   return  <Todo  key={t.id} todo={t} showDelete={showDelete} showEdit={showEdit} handelDelete={handelDelete} lang={lang}/>
  })

  
  
  const [showScroll, setShowScroll] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setShowScroll(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowScroll(false), 1000); 
    };

    const div = scrollRef.current;
    if (div) div.addEventListener("scroll", handleScroll);

    return () => {
      if (div) div.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Delete dialog 
  function showDelete (todo){
    setOpen(true);
    setDtodo(todo)
  }
  function handelDelete (){
    todosDispatch({type:"delete",payload:Dtodo})
    handleClose()
    showToast(t("Deleted successfully"))
}
const handleClose = () => {
  setOpen(false);
};
  // end Delete dialog 


  // Edit dialog
  function handleSubmit (event){
    todosDispatch({type:"edit",payload:Dtodo})
    handleCloseEdit()
  showToast(t("Updated successfully"))
}
const handleCloseEdit = () => {
  setOpenEdit(false);
};

function showEdit (todo){
  setOpenEdit(true)
  setDtodo(todo)
}
// end Edit dialog

// change lang
function changeLang (){
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    i18n.changeLanguage(newLang); 
    localStorage.setItem("lang",newLang)
  }
  
  function handleAdd (){
    todosDispatch({type:"add",payload:{title:input}})
      setInput("")
      showToast(t("Added successfully"))
  }
  return (
    <>
         <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction:t("ltr")}}
      >
        <DialogTitle id="alert-dialog-title">
          {t("Are you sure you want to delete the task?")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("You can't undo after confirming deletion")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Cancel")}</Button>
          <Button onClick={handelDelete} autoFocus>
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>
     <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction:t("ltr")}}
      >
        <DialogTitle>{t("Edit Task")}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              value={Dtodo.title}
              label={t("Task Title")}
              fullWidth
              variant="standard"
              onChange={(e)=>{setDtodo({...Dtodo , title:e.target.value})}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={Dtodo.des}
              label={t("Details")}
              fullWidth
              variant="standard"
              onChange={(e)=>{setDtodo({...Dtodo , des:e.target.value})}}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>{t("Cancel")}</Button>
          <Button type="submit" form="subscription-form">
          {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="md" style={{ height: "fit-content" }}>
      <Button variant="text" sx={{color:"white", width:"100%", display:"flex",justifyContent:t("start")}} onClick={changeLang}>{t("Arabic")}</Button>
        <Card sx={{ minWidth: 305  , height:"90vh" ,position:"relative"}}>
          <CardContent>
            <Typography variant="h2" style={{fontWeight:"700"}}>{t("My Tasks")}</Typography>
            <Divider component="" />
            <ToggleButtonGroup
              color="primary"
              value={switchTasks}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              style={{marginTop:"30px",direction:"ltr"}}
              >
              <ToggleButton value="non-checked">{t("Pending")}</ToggleButton>
              <ToggleButton value="checked">{t("Done")}</ToggleButton>
              <ToggleButton value="all">{t("All")}</ToggleButton>
            </ToggleButtonGroup>
            <div className="myDiv"  ref={scrollRef}  style={{maxHeight:"48vh",overflow:"scroll",paddingTop:"5px", scrollbarColor: showScroll ? "#888 #f1f1f1" : "transparent transparent",}}>
            {todo}
            </div>
          </CardContent>
          <Grid container spacing={1} style={{padding:"15px", textAlign:"left" , position:"absolute",left:"5px",bottom:"0",paddinBottom:"5px",backgroundColor:"white",width:"100%" }}>
            <Grid size={8}>
            <TextField id="outlined-basic" label={t("Title")} variant="outlined" 
              sx={{
                width: "70%",
                direction: "ltr",
                "& .MuiOutlinedInput-root": {
                  width: "100%",
                  transition: "width .3s ease",
                  "&.Mui-focused": {
                    width: "140%", 
                  },
                },
              }}
              value={input}
              onChange={(e)=>{setInput(e.target.value)}}/>
            </Grid>
            <Grid size={4}>
              <Button className="todo-btn" variant="contained" size="large" style={{width:"100%",padding:"14px",transition:".3s"}} onClick={handleAdd} disabled={input === ""}>{t("add")}</Button>
            </Grid>
            </Grid>
        </Card>
      </Container>
    </>
  );
}
