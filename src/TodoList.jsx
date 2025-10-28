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


export default function TodoList() {
  const [input, setInput] = useState("")
  const [switchTasks,setSwitch]=useState("all")
  const [open, setOpen] = useState(false);
  const [Dtodo,setDtodo]=useState("")
  const [openEdit, setOpenEdit] = useState(false);
  const {showToast}=useToast()
  const {todos,todosDispatch}= useContext(TodoContext)

  const handleChange = (e) => {
    setSwitch(e.target.value);
  };
  
  if(localStorage.getItem("todos")){
    useEffect(()=>{
     todosDispatch({type:"get"})
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
   return  <Todo key={t.id} todo={t} showDelete={showDelete} showEdit={showEdit} handelDelete={handelDelete}/>
  })

  function handleAdd (){
    todosDispatch({type:"add",payload:{title:input}})
      setInput("")
      showToast("تمت الاضافة بنجاح")
  }


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
    showToast("تم الحذف بنجاح")
}
const handleClose = () => {
  setOpen(false);
};
  // end Delete dialog 


  // Edit dialog
  function handleSubmit (event){
    todosDispatch({type:"edit",payload:Dtodo})
    handleCloseEdit()
  showToast("تم التحديث بنجاح")
}
const handleCloseEdit = () => {
  setOpenEdit(false);
};

function showEdit (todo){
  setOpenEdit(true)
  setDtodo(todo)
}
  // end Edit dialog
  
  return (
    <>
         <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction:"rtl"}}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من حذف المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع بعد تأكيد الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>الغاء</Button>
          <Button onClick={handelDelete} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
     <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction:"rtl"}}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              value={Dtodo.title}
              label="عنوان المهمة"
              fullWidth
              variant="standard"
              onChange={(e)=>{setDtodo({...Dtodo , title:e.target.value})}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={Dtodo.des}
              label="تفاصيل"
              fullWidth
              variant="standard"
              onChange={(e)=>{setDtodo({...Dtodo , des:e.target.value})}}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>الغاء</Button>
          <Button type="submit" form="subscription-form">
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="md" style={{ height: "fit-content" }}>
        <Card sx={{ minWidth: 305  , height:"90vh" ,position:"relative"}}>
          <CardContent>
            <Typography variant="h2" style={{fontWeight:"700"}}>مهامي</Typography>
            <Divider component="" />
            <ToggleButtonGroup
              color="primary"
              value={switchTasks}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              style={{marginTop:"30px",direction:"ltr"}}
              >
              <ToggleButton value="non-checked">غير المنجز</ToggleButton>
              <ToggleButton value="checked">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            <div className="myDiv"  ref={scrollRef}  style={{maxHeight:"48vh",overflow:"scroll",paddingTop:"5px", scrollbarColor: showScroll ? "#888 #f1f1f1" : "transparent transparent",}}>
            {todo}
            </div>
          </CardContent>
          <Grid container spacing={1} style={{padding:"15px", textAlign:"left" , position:"absolute",left:"5px",bottom:"0",paddinBottom:"5px",backgroundColor:"white",width:"100%" }}>
            <Grid size={8}>
            <TextField id="outlined-basic" label="المهمة" variant="outlined" 
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
              <Button className="todo-btn" variant="contained" size="large" style={{width:"100%",padding:"14px",transition:".3s"}} onClick={handleAdd} disabled={input === ""}>اضافة</Button>
            </Grid>
            </Grid>
        </Card>
      </Container>
    </>
  );
}
